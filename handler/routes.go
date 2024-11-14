package handler

import (
	"github.com/codefire-team/edu-bff/router/middleware"
	"github.com/labstack/echo/v4"
)

func (h *Handler) Register(v1 *echo.Group) {
	jwtMiddleware := middleware.EnsureValidToken()

	accounts := v1.Group("/accounts", jwtMiddleware)

	accounts.POST("/authenticate", h.AuthenticateUser)
	accounts.GET("/me", h.GetUserInfo)
}
