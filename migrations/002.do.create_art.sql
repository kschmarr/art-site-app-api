CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE art (
    artid uuid DEFAULT uuid_generate_v1 (),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    height INTEGER NOT NULL,
    width INTEGER NOT NULL,
    image TEXT NOT NULL
);