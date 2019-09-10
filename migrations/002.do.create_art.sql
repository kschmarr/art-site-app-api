CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE art (
    artid uuid DEFAULT uuid_generate_v1 (),
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    height TEXT,
    width TEXT,
    availability TEXT DEFAULT 'available',
    image TEXT
);