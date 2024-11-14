package handler

import (
	"net/http"
	"strings"

	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/codefire-team/edu-bff/internal/auth0"
	"github.com/codefire-team/edu-bff/model"
	"github.com/codefire-team/edu-bff/router/middleware"
	"github.com/codefire-team/edu-bff/utils"
	"github.com/labstack/echo/v4"
)

// GetUserInfo godoc
// @Summary Get user info
// @Description Get user of the current logged user
// @Tags user
// @Accept  json
// @Produce  json
// @Security ApiKeyAuth
// @Success 200 {object} model.User
// @Failure 404 {object} map[string]string
// @Router /accounts/me [get]
func (h *Handler) GetUserInfo(c echo.Context) error {
	id := auth0UserIdFromToken(c)

	user, err := h.userStore.GetByIdAuthId(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if user == nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "user not found"})
	}

	return c.JSON(http.StatusOK, user)
}

// AuthenticateUser godoc
// @Summary Authenticate user
// @Description Authenticate user with Auth0
// @Tags user
// @Accept  json
// @Produce  json
// @Security ApiKeyAuth
// @Success 200 {object} model.User
// @Failure 404 {object} map[string]string
// @Router /accounts/authenticate [post]
func (h *Handler) AuthenticateUser(c echo.Context) error {
	id := auth0UserIdFromToken(c)

	token := strings.Split(c.Request().Header.Get("Authorization"), "Bearer ")[1]

	userInfo, err := auth0.GetAuth0UserInfo(token)

	println(userInfo.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	user := &model.User{
		AuthProviderId: id,
		Email:          userInfo.Email,
	}

	u, err := h.userStore.UpsertByAuth0Id(user)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	return c.JSON(http.StatusOK, u)

}

func auth0UserIdFromToken(c echo.Context) string {
	user, ok := c.Get("user").(*validator.ValidatedClaims)

	claims, _ := user.CustomClaims.(*middleware.CustomClaims)

	if !ok {
		return ""
	}
	return claims.Sub
}
