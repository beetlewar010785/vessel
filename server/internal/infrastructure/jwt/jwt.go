package jwt

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"time"
	"vessel.com/internal/domain/auth"
	"vessel.com/internal/infrastructure/shared"
)

type UserJWTGeneratorImpl struct {
	jwtSecret []byte
}

func NewUserJWTGeneratorImpl(jwtSecret []byte) *UserJWTGeneratorImpl {
	return &UserJWTGeneratorImpl{
		jwtSecret,
	}
}

type CustomClaims struct {
	Role string `json:"role"`
	jwt.RegisteredClaims
}

func (r *UserJWTGeneratorImpl) Generate(userID auth.UserID, role auth.Role) (auth.JWT, error) {
	jsonRole, err := shared.ToJsonRole(role)
	if err != nil {
		return "", err
	}

	claims := CustomClaims{
		Role: jsonRole,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   userID.String(),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(r.jwtSecret)
	if err != nil {
		return "", fmt.Errorf("failed to sign JWT: %w", err)
	}

	return auth.JWT(signedToken), nil
}

func (r *UserJWTGeneratorImpl) Parse(token auth.JWT) (auth.UserClaims, error) {
	jwtToken, err := jwt.ParseWithClaims(string(token), &CustomClaims{}, func(t *jwt.Token) (interface{}, error) {
		return r.jwtSecret, nil
	})
	if err != nil {
		return auth.UserClaims{}, err
	}

	claims, ok := jwtToken.Claims.(*CustomClaims)
	if !ok || !jwtToken.Valid {
		return auth.UserClaims{}, errors.New("invalid token")
	}

	role, err := shared.ToDomainRole(claims.Role)
	if err != nil {
		return auth.UserClaims{}, fmt.Errorf("invalid role: %w", err)
	}

	return auth.NewUserClaims(
			auth.UserIDFromString(claims.Subject),
			role),
		nil
}
