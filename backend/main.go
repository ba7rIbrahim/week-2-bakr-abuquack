package main

import (
	"log"
	"net/http"

	database "github.com/ba7rIbrahim/week-2-bakr-abuquack/db"
	"github.com/ba7rIbrahim/week-2-bakr-abuquack/handlers"
)

func main() {
	mux := http.NewServeMux()
	log.Println("Attempting to open database...")
	db, err := database.InitDb()

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Setting up routes...")

	authHandler := handlers.NewAuthHandler(db)
	authHandler.RegisterRoutes(mux)

	log.Fatal(http.ListenAndServe(":8080", mux))
}
