CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	auth_id TEXT,
	name VARCHAR,
	email VARCHAR,
	picture TEXT
)