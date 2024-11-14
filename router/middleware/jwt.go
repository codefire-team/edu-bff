package middleware

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/labstack/echo/v4"
)

// CustomClaims contains custom data we want from the token.
type CustomClaims struct {
	Scope string `json:"scope"`
	Sub   string `json:"sub"`
}

// Validate does nothing for this example, but we need
// it to satisfy validator.CustomClaims interface.
func (c CustomClaims) Validate(ctx context.Context) error {
	return nil
}

// EnsureValidToken is a middleware that will check the validity of our JWT for Echo.
func EnsureValidToken() echo.MiddlewareFunc {
	issuerURL, err := url.Parse("https://" + os.Getenv("AUTH0_DOMAIN") + "/")
	if err != nil {
		log.Fatalf("Failed to parse the issuer url: %v", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{os.Getenv("AUTH0_AUDIENCE")},
		validator.WithCustomClaims(
			func() validator.CustomClaims {
				return &CustomClaims{
					Scope: "scope",
					Sub:   "sub",
				}
			},
		),
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		log.Fatalf("Failed to set up the jwt validator: %v", err)
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Authorization header is required"})
			}

			if len(authHeader) < 7 || authHeader[:7] != "Bearer " {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Authorization header must start with Bearer"})
			}
			token, err := jwtValidator.ValidateToken(c.Request().Context(), authHeader[7:])
			if err != nil {
				log.Printf("Encountered error while validating JWT: %v", err)
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Failed to validate JWT."})
			}

			// Store token claims in context for future use
			c.Set("user", token)
			return next(c)
		}
	}
}
