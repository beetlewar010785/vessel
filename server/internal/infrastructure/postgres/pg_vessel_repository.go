package postgres

import (
	"database/sql"
	"errors"
	"fmt"
	"vessel.com/internal/domain/auth"
)

type PGVesselRepository struct {
	db *sql.DB
}

func NewPGVesselRepository(db *sql.DB) *PGVesselRepository {
	return &PGVesselRepository{db}
}

func (r *PGVesselRepository) Get(id auth.VesselID) (*auth.Vessel, error) {
	var (
		name string
	)

	query := `SELECT name FROM vessels WHERE id = $1`

	err := r.db.QueryRow(query, id.String()).Scan(&name)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, fmt.Errorf("vessel not found")
		}
		return nil, err
	}

	return auth.NewVessel(
		id,
		name,
	), nil
}
