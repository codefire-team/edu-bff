package handler

import "github.com/codefire-team/edu-bff/user"

type Handler struct {
	userStore user.Store
}

func NewHandler(us user.Store) *Handler {
	return &Handler{
		userStore: us,
	}
}
