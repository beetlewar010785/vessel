package auth

import "github.com/google/uuid"

type Role int

const (
	RoleTechManager Role = iota
	RoleCaptain
	RoleChiefEngineer
)

type UserID uuid.UUID

func UserIDFromString(s string) UserID {
	return (UserID)(uuid.MustParse(s))
}

func (r UserID) String() string {
	return uuid.UUID(r).String()
}

type User struct {
	ID           UserID
	Login        string
	PasswordHash string
	Role         Role
	VesselID     *VesselID
	Name         string
	Surname      string
}

func NewUser(
	ID UserID,
	login string,
	passwordHash string,
	role Role,
	vesselID *VesselID,
	name string,
	surname string,
) *User {
	return &User{
		ID,
		login,
		passwordHash,
		role,
		vesselID,
		name,
		surname,
	}
}

type UserRepository interface {
	GetByLogin(login string) (*User, error)
	Get(id UserID) (*User, error)
}
