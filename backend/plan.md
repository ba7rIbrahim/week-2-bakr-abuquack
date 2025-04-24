2025 Apr 22th

### 🧱 **1. Project Bootstrap**
- [x] Init Go module
- [x] Setup basic `main.go` with HTTP server
- [x] Add router multiplexer (use `http.ServeMux` or `chi`) // Chose net/http, gotta understand the basics and appreciate difficulty first :)
- [x] Setup SQLite connection using `github.com/mattn/go-sqlite3`
- [?] Create tables: `users`, `products`, `orders`, `order_items`, `sessions`

---

### 🔐 **2. Auth & Sessions**
- [ ] Hash password with `bcrypt`
- [x] `POST /signup` — create user
- [x] `POST /login` — check password, generate session ID
- [x] `POST /logout` — delete session
- [x] Store sessions in DB: `id`, `user_id`, `created_at`, `expires_at`
- [x] Middleware: `requireAuth(r *http.Request) (userID int, err error)` // Changed slightly
- [x] Set session cookie with `HttpOnly`, `Secure`, `SameSite`
