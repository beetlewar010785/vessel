package shared

import (
	"fmt"
	"vessel.com/internal/domain/auth"
)

func ToJsonRole(role auth.Role) (string, error) {
	switch role {
	case auth.RoleTechManager:
		return "techManager", nil
	case auth.RoleCaptain:
		return "captain", nil
	case auth.RoleChiefEngineer:
		return "chiefEngineer", nil
	default:
		return "", fmt.Errorf("failed to convert role to JWT role: %d", role)
	}
}

func ToDomainRole(jsonRole string) (auth.Role, error) {
	switch jsonRole {
	case "techManager":
		return auth.RoleTechManager, nil
	case "captain":
		return auth.RoleCaptain, nil
	case "chiefEngineer":
		return auth.RoleChiefEngineer, nil
	default:
		return 0, fmt.Errorf("failed to parse JWT role: %s", jsonRole)
	}
}
