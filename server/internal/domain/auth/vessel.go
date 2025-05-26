package auth

import "github.com/google/uuid"

type VesselID uuid.UUID

func (r VesselID) String() string {
	return uuid.UUID(r).String()
}

type Vessel struct {
	ID   VesselID
	Name string
}

func NewVessel(
	ID VesselID,
	name string,
) *Vessel {
	return &Vessel{
		ID,
		name,
	}
}

type VesselRepository interface {
	Get(id VesselID) (*Vessel, error)
}
