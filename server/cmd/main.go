package main

import (
	"database/sql"
	"github.com/go-chi/cors"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"vessel.com/internal/infrastructure/jwt"
	"vessel.com/internal/infrastructure/postgres"
	"vessel.com/internal/infrastructure/rest"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	const pgConnection = "postgres://vessel_user:vessel_pass@localhost:5432/vessel_db?sslmode=disable"
	const jwtSecret = "secret"

	db, err := sql.Open("postgres", pgConnection)
	if err != nil {
		log.Fatalf("failed to open db: %v", err)
	}

	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("failed to close db: %v", err)
		}
	}(db)

	vesselRepository := postgres.NewPGVesselRepository(db)
	userRepository := postgres.NewPGUserRepository(db)
	jwtGenerator := jwt.NewUserJWTGeneratorImpl([]byte(jwtSecret))

	authMiddleware := rest.NewAuthMiddleware(jwtGenerator)
	loginHandler := rest.NewLoginHandler(userRepository, jwtGenerator)
	getProfileHandler := rest.NewGetProfileHandler(userRepository, vesselRepository)

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Post("/login", loginHandler.ServeHTTP)
	r.Group(func(r chi.Router) {
		r.Use(authMiddleware.Handle)
		r.Get("/profile", getProfileHandler.ServeHTTP)
	})

	log.Println("🚀 Starting server on :8080")
	err = http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
