package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/MarceloPetrucio/go-scalar-api-reference"
	"github.com/codefire-team/edu-bff/db"
	_ "github.com/codefire-team/edu-bff/docs"
	"github.com/codefire-team/edu-bff/handler"
	"github.com/codefire-team/edu-bff/router"
	"github.com/codefire-team/edu-bff/store"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// @title Edu BFF API
// @version 1.0
// @description Edu BFF
// @title Edu.AI BFF

// @host 127.0.0.1:8080
// @BasePath /api

// @schemes http https
// @produce	application/json
// @consumes application/json

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	if os.Getenv("ENV") != "server" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	r := router.New()

	r.GET("/swagger/*", echoSwagger.WrapHandler)

	r.GET("/reference", func(e echo.Context) error {
		htmlContent, _ := scalar.ApiReferenceHTML(&scalar.Options{
			SpecURL: "./docs/swagger.json",
			CustomOptions: scalar.CustomOptions{
				PageTitle: "Edu BFF API Reference",
			},
			Authentication: "BearerToken",
		})
		return e.HTML(http.StatusOK, htmlContent)
	})

	d := db.New()

	v1 := r.Group("/api")

	userStore := store.NewUserStore(d)
	h := handler.NewHandler(userStore)

	h.Register(v1)

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	r.Logger.Fatal(r.Start(fmt.Sprintf(":%s", port)))
}
