package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	AuthProviderId string             `bson:"auth_provider_id" json:"authProviderId"`
	Username       *string            `bson:"username" json:"username"`
	Email          string             `bson:"email" json:"email" unique:"true" validate:"required"`
	Bio            *string            `bson:"bio" json:"bio"`
	Image          *string            `bson:"image" json:"image"`
	CreatedAt      time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt      time.Time          `bson:"updated_at" json:"updatedAt"`
}
