openapi: 3.1.0
info:
  title: Bros E-Commerce API
  version: "0.1.0"
  description: Level 0 API for MVP

servers:
  - url: http://localhost:3000/api
    description: Local Dev

paths:
  /signup:
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AuthRequest'
      responses:
        "201":
          description: User created
        "400":
          $ref: '#/components/responses/BadRequest'

  /login:
    post:
      summary: Login and create session
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AuthRequest'
      responses:
        "200":
          description: Logged in, session cookie set
        "401":
          $ref: '#/components/responses/Unauthorized'

  /logout:
    post:
      summary: Logout and destroy session
      responses:
        "204":
          description: Logged out

  /products:
    get:
      summary: Get all products
      responses:
        "200":
          description: List of products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'

  /admin/products:
    post:
      summary: Add new product (admin only)
      security:
        - sessionCookie: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductInput'
      responses:
        "201":
          description: Product created

  /admin/products/{id}:
    put:
      summary: Update product (admin only)
      security:
        - sessionCookie: []
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductInput'
      responses:
        "200":
          description: Product updated

    delete:
      summary: Delete product (admin only)
      security:
        - sessionCookie: []
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        "204":
          description: Product deleted

  /cart/checkout:
    post:
      summary: Submit cart as order (requires login)
      security:
        - sessionCookie: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/CartItem'
      responses:
        "201":
          description: Order created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderCreated'

components:
  securitySchemes:
    sessionCookie:
      type: apiKey
      in: cookie
      name: session_id

  responses:
    BadRequest:
      description: Invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

  schemas:
    AuthRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password

    Product:
      type: object
      properties:
        id: { type: integer }
        name: { type: string }
        description: { type: string }
        price: { type: number }
        image_url: { type: string }

    ProductInput:
      type: object
      required: [name, price]
      properties:
        name: { type: string }
        description: { type: string }
        price: { type: number }
        image_url: { type: string }

    CartItem:
      type: object
      required: [product_id, quantity]
      properties:
        product_id: { type: integer }
        quantity: { type: integer, minimum: 1 }

    OrderCreated:
      type: object
      properties:
        order_id: { type: integer }

    Error:
      type: object
      properties:
        error: { type: string }