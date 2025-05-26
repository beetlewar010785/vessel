package auth

type JWT string

type UserJWTGenerator interface {
	Generate(userID UserID, role Role) (JWT, error)
}

type UserClaims struct {
	UserID UserID
	Role   Role
}

func NewUserClaims(
	userID UserID,
	role Role,
) UserClaims {
	return UserClaims{
		userID,
		role,
	}
}

type UserClaimsParser interface {
	Parse(JWT) (UserClaims, error)
}
