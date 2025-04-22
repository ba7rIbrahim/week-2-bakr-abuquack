Bet—here’s the **frontend task checklist in flow-of-dev order**, so you code in a natural, efficient build-up:

---

### :bricks: **1. Project Bootstrapping**
- [ ] Init Vite + React + Tailwind
- [ ] Setup React Router
- [ ] Setup React Query client
- [ ] Setup Zustand stores: `user`, `cart`

---

### :closed_lock_with_key: **2. Auth Flow**
- [ ] Build `/signup` and `/login` pages
- [ ] Hook up forms to `/signup` and `/login` (with `credentials: 'include'`)
- [ ] Zustand: store user session data
- [ ] Auth persistence on page refresh (call `/me` or similar)
- [ ] Add logout button + handler

---

### :shopping_bags: **3. Product Catalog**
- [ ] Build `/shop` route and product grid layout
- [ ] Fetch product list from `/products`
- [ ] Hook up “Add to Cart” button using Zustand
- [ ] Display cart badge in navbar (total items)

---

### :shopping_cart: **4. Cart Page**
- [ ] Build `/cart` page layout
- [ ] List cart items from Zustand
- [ ] Quantity increment/decrement
- [ ] Remove item from cart
- [ ] Calculate subtotal
- [ ] Checkout button → route to `/checkout`

---

### :credit_card: **5. Checkout**
- [ ] Build `/checkout` form (fake shipping info)
- [ ] On submit: send cart to `/cart/checkout`
- [ ] Show order success confirmation

---

### :office_worker: **6. Admin Panel**
- [ ] Add `/admin` route with auth guard
- [ ] Build product form (name, desc, price, image)
- [ ] Submit to `/admin/products`
- [ ] Fetch + list all products
- [ ] Add edit + delete buttons for each

---

### :art: **7. Polish & Final Touches**
- [ ] Global error/loading handling
- [ ] Toasts (success, error)
- [ ] Mobile responsive tweaks
- [ ] 404 page
- [ ] Smoke test all flows

---

Built this way, every feature builds on what came before—no wasted cycles.