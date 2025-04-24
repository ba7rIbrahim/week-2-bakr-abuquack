package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func generateToken(length int) string {
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		panic(err)
	}

	return hex.EncodeToString(bytes)[:length]
}

type User struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
}

type contextKey string

const userKey = contextKey("user")

func GetUser(r *http.Request) *User {
	if user, ok := r.Context().Value(userKey).(*User); ok {
		return user
	}
	return nil
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")
		if err != nil {
			http.Error(w, "Not authorized", http.StatusUnauthorized)
			return
		}

		result := db.QueryRowContext(r.Context(), "SELECT users.id, users.email, sessions.expires_at FROM sessions JOIN users ON sessions.user_id = users.id WHERE token = ?", cookie.Value)

		var user User
		var expiresAt int

		err = result.Scan(&user.ID, &user.Email, &expiresAt)
		if err != nil {
			if err == sql.ErrNoRows {
				log.Println(err)
				http.Error(w, "No such session", http.StatusNotFound)
			} else {
				log.Println(err)
				http.Error(w, "Internal server error", http.StatusInternalServerError)
			}
			return
		}

		ctx := context.WithValue(r.Context(), userKey, &user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
func main() {
	mux := http.NewServeMux()
	log.Println("Attempting to open database...")
	var err error
	db, err = sql.Open("sqlite3", "./database.db")

	if err != nil {
		log.Fatal(err)
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

	log.Println("Initiating database...")
	_, err = db.Exec(setupStmt)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Hello world")

	log.Println("Setting up routes...")

	mux.HandleFunc("/api/signup", func(w http.ResponseWriter, r *http.Request) {
		var request AuthRequest

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid AuthRequest schema! Please specifiy username and password", http.StatusBadRequest)
			return
		}

		// Check if email exists already in the database
		var count int
		row := db.QueryRow("SELECT COUNT(*) FROM users WHERE email=?", request.Email)

		if err := row.Scan(&count); err != nil {
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		if count != 0 {
			http.Error(w, "Email is taken! try to login with your email.", http.StatusConflict)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)

		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		result, err := db.Exec("INSERT INTO users (email, password) VALUES (?, ?)", request.Email, hashedPassword)

		if err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		insertId, err := result.LastInsertId()

		if err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Create a new session for user
		token := generateToken(16)

		expires_at := time.Now().Add(1 * time.Hour)

		if _, err := db.Exec("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)", insertId, token, expires_at.UnixMilli()); err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// FINALLY, set cookie
		http.SetCookie(w, &http.Cookie{
			Name:     "session",
			Value:    token,
			Expires:  expires_at,
			HttpOnly: true,
			Secure:   false,
			SameSite: http.SameSiteLaxMode,
		})

		fmt.Fprintf(w, "Great Success!")
	})

	mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		var request AuthRequest

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid AuthRequest schema! Please specifiy username and password", http.StatusBadRequest)
			return
		}

		// Check if email exists already in the database
		var id int
		var email string
		var password string
		row := db.QueryRow("SELECT id, email, password FROM users WHERE email=?", request.Email)

		if err := row.Scan(&id, &email, &password); err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "No such email!", http.StatusNotFound)
			}
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		err := bcrypt.CompareHashAndPassword([]byte(password), []byte(request.Password))

		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		token := generateToken(16)

		expires_at := time.Now().Add(1 * time.Hour)

		if _, err := db.Exec("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)", id, token, expires_at.UnixMilli()); err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// FINALLY, set cookie
		http.SetCookie(w, &http.Cookie{
			Name:    "session",
			Value:   token,
			Expires: expires_at,
		})

		fmt.Fprintf(w, "Great Success!")
	})

	mux.HandleFunc("/api/me", authMiddleware(func(w http.ResponseWriter, r *http.Request) {
		user := GetUser(r)
		jsonBytes, err := json.Marshal(map[string]any{
			"id":    user.ID,
			"email": user.Email,
		})

		if err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		fmt.Fprint(w, string(jsonBytes))
		return
	}))

	log.Fatal(http.ListenAndServe(":8080", mux))
}
