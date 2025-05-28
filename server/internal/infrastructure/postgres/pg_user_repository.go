package postgres

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"vessel.com/internal/domain/auth"
)

type PGUserRepository struct {
	db *sql.DB
}

func NewPGUserRepository(db *sql.DB) *PGUserRepository {
	return &PGUserRepository{
		db: db,
	}
}

func (r *PGUserRepository) GetByEmail(email string) (*auth.User, error) {
	const query = `
SELECT id, email, password_hash, role, vessel_id, name, surname
FROM users WHERE email = $1`

	row := r.db.QueryRow(query, email)
	return r.queryUser(row)
}

func (r *PGUserRepository) Get(id auth.UserID) (*auth.User, error) {
	const query = `
SELECT id, email, password_hash, role, vessel_id, name, surname
FROM users WHERE id = $1`

	row := r.db.QueryRow(query, id.String())
	return r.queryUser(row)
}

func (r *PGUserRepository) queryUser(row *sql.Row) (*auth.User, error) {
	var (
		id           uuid.UUID
		email        string
		passwordHash string
		role         string
		vesselID     sql.NullString
		name         string
		surname      string
	)

	err := row.Scan(&id, &email, &passwordHash, &role, &vesselID, &name, &surname)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}

	var vesselPtr *auth.VesselID
	if vesselID.Valid {
		vID, err := uuid.Parse(vesselID.String)
		if err != nil {
			return nil, err
		}
		v := auth.VesselID(vID)
		vesselPtr = &v
	}

	domainRole, err := r.ToDomainRole(role)
	if err != nil {
		return nil, fmt.Errorf("failed to convert role: %w", err)
	}

	return auth.NewUser(
		auth.UserID(id),
		email,
		passwordHash,
		domainRole,
		vesselPtr,
		name,
		surname,
	), nil
}

func (r *PGUserRepository) ToDomainRole(sqlRole string) (auth.Role, error) {
	switch sqlRole {
	case "TechManager":
		return auth.RoleTechManager, nil
	case "Captain":
		return auth.RoleCaptain, nil
	case "ChiefEngineer":
		return auth.RoleChiefEngineer, nil
	default:
		return 0, fmt.Errorf("unknown role: %s", sqlRole)
	}
}
