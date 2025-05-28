-- Ensure pgcrypto is enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert vessel
INSERT INTO vessels (id, name)
VALUES ('11111111-1111-1111-1111-111111111111', 'Vessel One')
    ON CONFLICT DO NOTHING;

-- Insert users
INSERT INTO users (id, email, password_hash, role, vessel_id, name, surname)
VALUES
    (
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'tech@gmail.com',
        crypt('1', gen_salt('bf')),
        'TechManager',
        NULL,
        'John',
        'Smith'
    ),
    (
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'captain@gmail.com',
        crypt('2', gen_salt('bf')),
        'Captain',
        '11111111-1111-1111-1111-111111111111',
        'Jack',
        'Jones'
    ),
    (
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        'chief@gmail.com',
        crypt('3', gen_salt('bf')),
        'ChiefEngineer',
        '11111111-1111-1111-1111-111111111111',
         'Russell',
         'Crowe'
    )
    ON CONFLICT DO NOTHING;
