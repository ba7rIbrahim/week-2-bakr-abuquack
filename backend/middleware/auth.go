package middleware

import (
	"context"
	"database/sql"
	"log"
	"net/http"

	"github.com/ba7rIbrahim/week-2-bakr-abuquack/models"
	"github.com/ba7rIbrahim/week-2-bakr-abuquack/types"
)

func AuthMiddleware(db *sql.DB) func(next http.HandlerFunc) http.HandlerFunc {
	// ChatGPT claims it's the standard when creating middlewares that needs database connection etc... (unless you're gonna create multiple middlewares that rely on the same shared state, you don't need ahh struct Middleware type thing
	return func(next http.HandlerFunc) http.HandlerFunc {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cookie, err := r.Cookie("session")
			if err != nil {
				http.Error(w, "Not authorized", http.StatusUnauthorized)
				return
			}

			result := db.QueryRowContext(r.Context(), "SELECT users.id, users.email, sessions.expires_at FROM sessions JOIN users ON sessions.user_id = users.id WHERE token = ?", cookie.Value)

			var user models.User
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

			ctx := context.WithValue(r.Context(), types.UserKey, &user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
