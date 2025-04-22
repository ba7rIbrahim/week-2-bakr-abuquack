package main

import (
	"database/sql"
	"fmt"
	"log"
	_ "mattn/go-sqlite3"
	"net/http"
)

func main() {
	db, err := sql.Open("sqlite3", "./database.db")

	if err != nil {
		log.Fatal(err)
	}

	setupStmt := `
	CREATE TABLE IF NOT EXISTS kv (
		key STRING,
		value int
	);

	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password TEXT UNIQUE NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE products (
		id INTEGER PRIMARY KEY NOT NULL,
		name TEXT NOT NULL,
		price INTEGER NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE orders (
		id INTEGER PRIMARY KEY NOT NULL,
		user_id INTEGER NOT NULL REFERENCES users(id),
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE sessions (
		id INTEGER PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id),
		expires INTEGERNOT NULL,
		created_at INTEGER DEFAULT (strftime('%s', 'now')),
		updated_at INTEGER DEFAULT (strftime('%s', 'now'))
	);
	`

	log.Println("Initiating database...")
	_, err = db.Exec(setupStmt)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Hello world")

	http.HandleFunc("/counter", func(w http.ResponseWriter, r *http.Request) {
	})

	http.HandleFunc("/auth", func(w http.ResponseWriter, r *http.Request) {})
	http.HandleFunc("/auth", func(w http.ResponseWriter, r *http.Request) {})
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {})

	log.Fatal(http.ListenAndServe(":8000", nil))
}
