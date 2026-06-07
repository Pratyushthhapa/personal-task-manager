# Personal Task Manager

A full-stack task management application built using React, Node.js, Express, and JSON-based storage.

## Application Screenshot

![Task Manager](./screenshots/screenshot.png)

## Features

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Filter tasks (All, Active, Completed)
- Search tasks by title or description
- Sort tasks by title or due date
- Overdue task highlighting
- Responsive user interface
- REST API backend

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express

### Storage
- JSON File Storage

## Project Structure

```text
client/
├── src/
├── public/

server/
├── index.js
├── tasks.json

screenshots/
└── screenshot.png
```

## Installation

### Backend

```bash
cd server
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Functionalities Implemented

- Full CRUD operations
- Task status management
- Search functionality
- Task filtering
- Task sorting
- Due date support
- Overdue task indication
- Responsive layout

## Author

Pratyush Thapa