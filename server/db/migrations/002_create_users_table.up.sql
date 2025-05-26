CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    vessel_id UUID REFERENCES vessels(id),
    role TEXT NOT NULL CHECK (role IN ('TechManager', 'Captain', 'ChiefEngineer')),
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
