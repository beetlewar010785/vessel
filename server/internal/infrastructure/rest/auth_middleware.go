package rest

import (
	"context"
	"log"
	"net/http"
	"strings"
	"vessel.com/internal/domain/auth"
)

type AuthMiddleware struct {
	claimsParser auth.UserClaimsParser
}

func NewAuthMiddleware(
	claimsParser auth.UserClaimsParser) *AuthMiddleware {
	return &AuthMiddleware{
		claimsParser,
	}
}

func (r *AuthMiddleware) Handle(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		authHeader := req.Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			log.Printf("Invalid Authorization header: %s", authHeader)
			http.Error(w, "missing token", http.StatusUnauthorized)
			return
		}

		token := auth.JWT(strings.TrimPrefix(authHeader, "Bearer "))
		claims, err := r.claimsParser.Parse(token)
		if err != nil {
			log.Printf("Error parsing token: %s", err.Error())
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(req.Context(), UserClaimsContextKey, claims)
		log.Printf("User claims: %+v", claims)
		next.ServeHTTP(w, req.WithContext(ctx))
	})
}
