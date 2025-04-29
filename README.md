📚 Bookstore API – Project Description
🧩 Overview:
The Bookstore API is a RESTful backend service designed to manage books and authors in a structured and efficient manner. Built with TypeScript for type safety and Express.js as the web framework, it leverages Prisma ORM to interface with a PostgreSQL (or MySQL) database. This API supports full CRUD operations, search, filtering, pagination, and relationship-based querying.

---

## 🔗 Live URL

[https://bookstore-api-phi.vercel.app/](https://bookstore-api-phi.vercel.app/)

## 🔗 Postman documentation

[https://documenter.getpostman.com/view/40219022/2sB2j3AWvL](https://documenter.getpostman.com/view/40219022/2sB2j3AWvL)

---

🛠️ Technology Stack
🔧 Backend Runtime & Language
Node.js – JavaScript runtime for building the server

TypeScript – Strongly typed superset of JavaScript for safer development

🌐 Web Framework
Express.js – Lightweight and flexible Node.js web framework

🗄️ Database & ORM
PostgreSQL – Relational database management system

Prisma ORM – Type-safe and auto-generated query builder for PostgreSQL

🔐 Authentication & Security
jsonwebtoken – Handling JWT-based authentication

bcrypt – Password hashing

cors – Cross-Origin Resource Sharing for secure API requests

dotenv – Load environment variables securely from .env file

📬 Email
nodemailer – For sending emails (e.g., password reset, verification)

📦 Validation & Parsing
zod – Schema validation and parsing

🔧 Development Tools
ts-node-dev – Run TypeScript directly with automatic restarts

tsx – Fast TypeScript runtime and dev tool

eslint + prettier – Linting and code formatting

@types/ packages – Type definitions for TypeScript compatibility

📦 Notable NPM Packages

Category	Packages
Core	express, typescript, ts-node-dev, dotenv
Database	@prisma/client, prisma, PostgreSQL (driver implicit via Prisma)
Auth & Security	bcrypt, jsonwebtoken, cors
Validation	zod
Mailing	nodemailer
Type Definitions	@types/* packages for node, express, cors, jsonwebtoken, etc.
Tooling	eslint, prettier, tsx, typescript-eslint


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
