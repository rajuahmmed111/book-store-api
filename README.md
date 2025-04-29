📚 Bookstore API – Project Description
🧩 Overview:
The Bookstore API is a RESTful backend service designed to manage books and authors in a structured and efficient manner. Built with TypeScript for type safety and Express.js as the web framework, it leverages Prisma ORM to interface with a PostgreSQL (or MySQL) database. This API supports full CRUD operations, search, filtering, pagination, and relationship-based querying.

---

## 🔗 Live URL

[https://assignment-sql-8.vercel.app/](https://assignment-sql-8.vercel.app/)

## 🔗 Postman documentation

[https://documenter.getpostman.com/view/40219022/2sB2izDtWk](https://documenter.getpostman.com/view/40219022/2sB2izDtWk)

---

## 🛠️ Technology Stack & Packages

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **TypeScript** – Type-safe JavaScript
- **PostgreSQL** – Relational database
- **Prisma ORM** – Database management
- **UUID** – For unique entity identifiers
- **dotenv** – Environment configuration
- **cors**, – Middleware for security and logging

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rajuahmmed111/book-store-api.git
cd Bookstore-API
npm install
DATABASE_URL="postgresql://postgres:post@1234@localhost:5432/Book-Store?schema=public"
PORT=5000
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

📡 API Endpoints
📘 Books

Method Endpoint Description
GET /books Get all books (+ search/pagination)
GET /books/:id Get book by ID
GET /books?author=6 Get books by author ID
POST /books Create new book
PUT /books/:id Update a book
DELETE /books/:id Delete a book
✍️ Authors

Method Endpoint Description
GET /authors Get all authors
GET /authors/:id Get author by ID
POST /authors Create new author
PUT /authors/:id Update author
DELETE /authors/:id Delete author
🔍 Query Support
GET /books?searchTerm=war — Search by book title or description

GET /books?author=1 — Filter books by author

GET /books?page=2&limit=10 — Pagination

✅ Features
Type-safe development using TypeScript

Full CRUD for Authors & Books

Query filtering & search

Pagination

Validation with proper messages

Scalable folder structure

Prisma ORM with raw SQL fallback support

🐞 Known Issues/Bugs
Book availability is not yet restricted to ensure atomic transactions (can cause race conditions under heavy traffic).
