2025 Apr 22th

### 🧱 **1. Project Bootstrap**
- [x] Init Go module
- [x] Setup basic `main.go` with HTTP server
- [ ] Add router multiplexer (use `http.ServeMux` or `chi`)
- [x] Setup SQLite connection using `github.com/mattn/go-sqlite3`
- [?] Create tables: `users`, `products`, `orders`, `order_items`, `sessions`

---

### 🔐 **2. Auth & Sessions**
- [ ] Hash password with `bcrypt`
- [ ] `POST /signup` — create user
- [ ] `POST /login` — check password, generate session ID
- [ ] `POST /logout` — delete session
- [ ] Store sessions in DB: `id`, `user_id`, `created_at`, `expires_at`
- [ ] Middleware: `requireAuth(r *http.Request) (userID int, err error)`
- [ ] Set session cookie with `HttpOnly`, `Secure`, `SameSite`
