# ArtDB — Art Inventory Management System

A full-stack art inventory management web application inspired by [Artlogic](https://artlogic.net). Built to manage artworks, artists, contacts, exhibitions, and sales pipelines for a commercial art gallery context.

---

## Live Demo

- **Frontend:** [coming soon]
- **Backend API:** [coming soon]

---

## About the Project

ArtDB was built as a portfolio project combining my professional background in art logistics with full-stack software development. The platform reflects real workflows used in commercial galleries — tracking stock status, managing collector relationships, and monitoring the sales pipeline.

### Key features

- **Artworks** — searchable, filterable grid with image support, status tracking (available, sold, reserved, on loan), and a slide-in detail panel
- **Artists** — list view with biography and works in inventory
- **Contacts** — full CRM with add, edit, delete, search, filter by type, and sortable columns
- **Sales pipeline** — Coming soon
- **Home page** — live inventory stats, new stock, and recently sold works
- **Toast notifications** — global feedback system for all user actions
- **Dark mode ready** — CSS custom properties across the full app

---

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite
- React Router DOM
- Axios
- Plain CSS with custom properties (no CSS framework)

### Backend
- Node.js / Express
- PostgreSQL
- pg / pg-format
- dotenv
- Nodemon

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### 1. Clone the repositories

```bash
# Backend
git clone <https://github.com/Esther-FaBer/Art-Inventory-Project>
cd art-inventory-project

# Frontend
git clone <https://github.com/Esther-FaBer/Art-Inventory-Project-Front-End>
cd art-inventory-project-front-end
```

### 2. Set up the backend

```bash
cd art-inventory-project
npm install
```

Create a `.env.development` file in the root:

Create the database and seed it:

```bash
psql -c "CREATE DATABASE inventory_dev;"
npm run seed-dev
```

Start the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:9090/api`

### 3. Set up the frontend

```bash
cd "Art Inventory Project Front End"
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artworks` | Get all artworks |
| GET | `/api/artworks/:id` | Get artwork by ID |
| POST | `/api/artworks` | Create artwork |
| PUT | `/api/artworks/:id` | Update artwork |
| DELETE | `/api/artworks/:id` | Delete artwork |
| GET | `/api/artists` | Get all artists |
| GET | `/api/artists/:id` | Get artist by ID |
| GET | `/api/artists/:id/artworks` | Get artist's artworks |
| GET | `/api/contacts` | Get all contacts |
| POST | `/api/contacts` | Create contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |
| GET | `/api/galleries` | Get all galleries |
| GET | `/api/exhibitions` | Get all exhibitions |

---

Frontend
├── src/
│ ├── components/ # Page and UI components
│ ├── context/ # React context (Toast)
│ ├── routes/ # AppRouter
│ └── types/ # TypeScript types