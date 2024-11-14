package user

import "github.com/codefire-team/edu-bff/model"

type Store interface {
	GetByEmail(string) (*model.User, error)
	UpsertByAuth0Id(*model.User) (*model.User, error)
	GetByIdAuthId(string) (*model.User, error)
}
