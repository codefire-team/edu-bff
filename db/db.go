package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func New() *mongo.Database {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoUri := os.Getenv("MONGO_URI")
	mongoDatabase := os.Getenv("MONGO_DATABASE")

	clientOptions := options.Client().ApplyURI(mongoUri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("storage err: ", err)
		return nil
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("ping err: ", err)
		return nil
	}

	fmt.Println("Connected to MongoDB!")
	return client.Database(mongoDatabase)
}

// Connect to test database
func TestDB() (*mongo.Database, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("storage err: ", err)
		return nil, err
	}

	return client.Database("realworld_test"), nil
}

// Drop test database
func DropTestDB() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := client.Database("realworld_test").Drop(ctx)
	if err != nil {
		return err
	}
	fmt.Println("Dropped test database")
	return nil
}

// AutoMigrate: placeholder for MongoDB collections setup
func AutoMigrate(db *mongo.Database) {
	// MongoDB creates collections automatically on first document insertion,
	// so this might involve creating indexes or ensuring collections exist as needed.
	fmt.Println("Auto-migrate placeholder: MongoDB creates collections automatically.")
}
