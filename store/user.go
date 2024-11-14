package store

import (
	"context"
	"time"

	"github.com/codefire-team/edu-bff/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserStore struct {
	db *mongo.Database
}

func NewUserStore(db *mongo.Database) *UserStore {
	return &UserStore{db: db}
}

func (us *UserStore) GetByIdAuthId(id string) (*model.User, error) {
	var m model.User

	ctx := context.Background()

	err := us.db.Collection("users").FindOne(ctx, bson.M{"auth_provider_id": id}).Decode(&m)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &m, err
}

func (us *UserStore) GetByEmail(email string) (*model.User, error) {
	var m model.User
	ctx := context.Background()
	err := us.db.Collection("users").FindOne(ctx, bson.M{"email": email}).Decode(&m)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &m, err
}

func (us *UserStore) UpsertByAuth0Id(user *model.User) (*model.User, error) {
	var m model.User

	ctx := context.Background()
	err := us.db.Collection("users").FindOne(ctx, bson.M{"auth_provider_id": user.AuthProviderId}).Decode(&m)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			now := primitive.DateTime(time.Now().UnixNano() / int64(time.Millisecond))
			user.CreatedAt = now.Time()
			user.UpdatedAt = now.Time()
			_, err = us.db.Collection("users").InsertOne(ctx, user)
			return user, err
		}
		return nil, err
	}

	m.Email = user.Email
	m.UpdatedAt = primitive.DateTime(time.Now().UnixNano() / int64(time.Millisecond)).Time()

	_, err = us.db.Collection("users").UpdateOne(ctx, bson.M{"auth_provider_id": user.AuthProviderId}, bson.M{"$set": m})

	return &m, err
}
