# User Management App (React + TypeScript + Vite + MUI + Redux)

## Features

* Fetch users from JSONPlaceholder and display them in a table (name, email, company)
* Client-side search (by name or email)
* Sorting (name / email / company, asc/desc)
* User details page (routing) showing extra info (phone, website, address)
* Local CRUD (Redux):

  * **Add user** (with validation) — inserts the new user at the **top** of the list
  * **Edit user** (updates local state)
  * **Delete user** (local removal)

## Tech Stack

* React + TypeScript (Vite)
* Material UI (MUI)
* Redux Toolkit + React Redux
* React Router

## Getting Started

### Prerequisites

* Node.js (recommended: latest LTS)

### Install

```bash
npm install
```

### Run (dev)

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Notes / Behavior

* Initial user data is fetched from:

  * [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
* Added/edited/deleted users are **local-only** (not persisted to the API).
* Optional fields (phone, website, address) can be filled in when adding/editing.

## Project Structure (src)

* `app/` routing + app shell + theme
* `pages/` route pages (Users list, User details, 404)
* `components/` UI components (table + dialogs)
* `store/` Redux store + slice + typed hooks
* `services/` API calls
* `types/` TypeScript models
* `utils/` helpers (search/sort/email validation)

## Scripts

* `npm run dev` — start dev server
* `npm run build` — production build
* `npm run preview` — preview production build
