package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func InitDb() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./database.db")

	if err != nil {
		return nil, err
	}

	setupStmt := `CREATE TABLE IF NOT EXISTS kv (
		key STRING,
		value INTEGER
	);

	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE IF NOT EXISTS products (
		id INTEGER PRIMARY KEY NOT NULL,
		name TEXT NOT NULL,
		price INTEGER NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE IF NOT EXISTS orders (
		id INTEGER PRIMARY KEY NOT NULL,
		user_id INTEGER NOT NULL REFERENCES users(id),
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE IF NOT EXISTS sessions (
	token      TEXT    PRIMARY KEY,
		user_id	   INTEGER NOT NULL REFERENCES users(id),
		expires_at INTEGER NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);
	`

	_, err = db.Exec(setupStmt)
	if err != nil {
		return nil, err
	}

	return db, nil
}
