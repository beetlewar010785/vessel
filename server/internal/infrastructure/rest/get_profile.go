package rest

import (
	"encoding/json"
	"log"
	"net/http"
	"vessel.com/internal/domain/auth"
	"vessel.com/internal/infrastructure/shared"
)

type GetProfileHandler struct {
	userRepository   auth.UserRepository
	vesselRepository auth.VesselRepository
}

func NewGetProfileHandler(
	userRepository auth.UserRepository,
	vesselRepository auth.VesselRepository,
) *GetProfileHandler {
	return &GetProfileHandler{
		userRepository,
		vesselRepository,
	}
}

func (r *GetProfileHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	claims, ok := req.Context().Value(UserClaimsContextKey).(auth.UserClaims)
	if !ok {
		log.Printf("User claims not found in request context")
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	user, err := r.userRepository.Get(claims.UserID)
	if err != nil {
		log.Printf("Error getting user: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	var vesselName *string
	if user.VesselID != nil {
		vessel, err := r.vesselRepository.Get(*user.VesselID)
		if err != nil {
			log.Printf("Error getting vessel: %v", err)
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		vesselName = &vessel.Name
	}

	jsonRole, err := shared.ToJsonRole(claims.Role)
	if err != nil {
		log.Printf("Error converting role to json: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"email":   user.Email,
		"name":    user.Name,
		"surname": user.Surname,
		"role":    jsonRole,
	}

	if vesselName != nil {
		response["vessel"] = *vesselName
	}

	_ = json.NewEncoder(w).Encode(response)
	log.Printf("User claims: %+v", claims)
}
