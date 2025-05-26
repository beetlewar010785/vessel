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

	"github.com/caarlos0/env/v11"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	var cfg config
	err := env.Parse(&cfg)
	if err != nil {
		log.Fatalf("failed to parse config: %s", err)
	}

	db, err := sql.Open("postgres", cfg.PGConnectionString)
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
	jwtGenerator := jwt.NewUserJWTGeneratorImpl([]byte(cfg.JWTSecret))

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

type config struct {
	PGConnectionString string `env:"PG_CONNECTION_STRING,notEmpty"`
	JWTSecret          string `env:"JWT_SECRET,notEmpty"`
}
