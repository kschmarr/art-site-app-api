CREATE TABLE users (
    userid INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username TEXT NOT NULL,
    token TEXT NOT NULL,
    bio TEXT
);