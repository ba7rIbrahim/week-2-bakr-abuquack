package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ba7rIbrahim/week-2-bakr-abuquack/middleware"
	"github.com/ba7rIbrahim/week-2-bakr-abuquack/utils"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	DB *sql.DB
}

func NewAuthHandler(db *sql.DB) AuthHandler {
	return AuthHandler{
		DB: db,
	}
}

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var request AuthRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid AuthRequest schema! Please specifiy username and password", http.StatusBadRequest)
		return
	}

	// Check if email exists already in the database
	var id int
	var email string
	var password string
	row := h.DB.QueryRow("SELECT id, email, password FROM users WHERE email=?", request.Email)

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

	token := utils.GenerateToken(16)

	expires_at := time.Now().Add(1 * time.Hour)

	if _, err := h.DB.Exec("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)", id, token, expires_at.UnixMilli()); err != nil {
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
}

func (h *AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	var request AuthRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid AuthRequest schema! Please specifiy username and password", http.StatusBadRequest)
		return
	}

	// Check if email exists already in the database
	var count int
	row := h.DB.QueryRow("SELECT COUNT(*) FROM users WHERE email=?", request.Email)

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

	result, err := h.DB.Exec("INSERT INTO users (email, password) VALUES (?, ?)", request.Email, hashedPassword)

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
	token := utils.GenerateToken(16)

	expires_at := time.Now().Add(1 * time.Hour)

	if _, err := h.DB.Exec("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)", insertId, token, expires_at.UnixMilli()); err != nil {
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

}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	user := utils.GetUser(r)
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
}

func (h *AuthHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/signup", h.Signup)
	mux.HandleFunc("/api/login", h.Login)
	mux.HandleFunc("/api/me", middleware.AuthMiddleware(h.DB)(h.Me))
}
