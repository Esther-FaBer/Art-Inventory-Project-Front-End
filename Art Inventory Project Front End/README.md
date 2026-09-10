# ArtDB — Art Inventory Management System

A full-stack art inventory management web application inspired by [Artlogic](https://artlogic.net). Built to manage artworks, artists, contacts, exhibitions, and sales pipelines for a commercial art gallery context.

---

## Live Demo

- **Frontend:** [coming soon]
- **Backend API:** [coming soon]

---

## Screenshots

> 

---

## About the Project

ArtDB was built as a portfolio project combining my professional background in art logistics with full-stack software development. The platform reflects real workflows used in commercial galleries — tracking stock status, managing collector relationships, and monitoring the sales pipeline.

### Key features

- **Artworks** — searchable, filterable grid with image support, status tracking (available, sold, reserved, on loan), and a slide-in detail panel
- **Artists** — list view with biography and works in inventory
- **Contacts** — full CRM with add, edit, delete, search, filter by type, and sortable columns
- **Sales pipeline** — Kanban board grouping artworks by status
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
git clone <backend-repo-url>
cd art-inventory-project

# Frontend
git clone <frontend-repo-url>
cd art-inventory-project-front-end
```

### 2. Set up the backend

```bash
cd art-inventory-project
npm install
```

Create a `.env.development` file in the root: