package rest

import (
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"vessel.com/internal/domain/auth"
)

type LoginRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type LoginHandler struct {
	userRepository auth.UserRepository
	jwtGenerator   auth.UserJWTGenerator
}

func NewLoginHandler(
	userRepository auth.UserRepository,
	jwtGenerator auth.UserJWTGenerator) *LoginHandler {
	return &LoginHandler{
		userRepository,
		jwtGenerator,
	}
}

func (r *LoginHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	var loginRequest LoginRequest
	if err := json.NewDecoder(req.Body).Decode(&loginRequest); err != nil {
		log.Printf("Error parsing body: %s", err)
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	user, err := r.userRepository.GetByLogin(loginRequest.Login)
	if err != nil {
		log.Printf("Error getting user: %s", err)
		http.Error(w, "user not found", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(loginRequest.Password)); err != nil {
		log.Printf("Error comparing password: %s", err)
		http.Error(w, "invalid password", http.StatusUnauthorized)
		return
	}

	jwt, err := r.jwtGenerator.Generate(user.ID, user.Role)
	if err != nil {
		log.Printf("Error generating JWT: %s", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	_ = json.NewEncoder(w).Encode(map[string]string{
		"token": string(jwt),
	})
}
