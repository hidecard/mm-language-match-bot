# Admin Dashboard Plan for mm-language-match-bot

## 1. Proposed Folder Structure Reorganization

To accommodate the Admin Dashboard and improve maintainability, the existing project structure will be reorganized. The goal is to separate concerns between the bot's core logic, API endpoints, database interactions, and the new admin interface.

```
mm-language-match-bot/
├── src/
│   ├── bot/                 # Core bot logic, handlers, commands
│   │   ├── commands/
│   │   ├── handlers/
│   │   └── index.js
│   ├── api/                 # Existing API endpoints (match, user, webhook)
│   │   ├── match.js
│   │   ├── user.js
│   │   └── webhook.js
│   ├── admin/               # Admin Dashboard specific backend logic
│   │   ├── routes/          # Admin API routes
│   │   ├── controllers/     # Admin API controllers
│   │   └── services/        # Admin specific services/helpers
│   ├── db/                  # Database connection and schema
│   │   ├── index.js
│   │   └── schema.sql
│   ├── config/              # Configuration files (e.g., environment variables, constants)
│   └── utils/               # Utility functions
├── public/                  # Static files for the bot (if any)
├── admin_dashboard/         # Admin Dashboard frontend files
│   ├── public/              # Static assets (CSS, JS, images)
│   ├── views/               # HTML templates for the dashboard
│   └── app.js               # Frontend application logic
├── scripts/                 # Database initialization and other scripts
├── .env                     # Environment variables
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## 2. Admin Dashboard Functionalities

The Admin Dashboard will provide the following key features based on the existing database schema:

### 2.1 User Management
- **View all users**: Display a list of all registered users with their `telegram_id`, `username`, `gender`, `learning_lang`, `learning_level`, `daily_limit`, and `is_premium` status.
- **Search/Filter users**: Ability to search users by `telegram_id` or `username`, and filter by `learning_lang`, `learning_level`, `gender`, or `is_premium` status.
- **Edit user details**: Modify `daily_limit` and `is_premium` status for individual users.
- **Delete user**: Remove a user from the system (with confirmation).

### 2.2 Vocabulary Management
- **View vocabularies**: List all vocabulary entries with `language`, `level`, `word`, `reading`, `meaning`, and `is_premium` status.
- **Add new vocabulary**: Form to add new vocabulary entries.
- **Edit vocabulary**: Modify existing vocabulary entries.
- **Delete vocabulary**: Remove vocabulary entries (with confirmation).
- **Search/Filter vocabularies**: Search by `word` or `meaning`, filter by `language`, `level`, or `is_premium` status.

### 2.3 Phrase Management
- **View phrases**: List all phrase entries with `language`, `level`, `phrase`, `meaning`, `context`, and `is_premium` status.
- **Add new phrase**: Form to add new phrase entries.
- **Edit phrase**: Modify existing phrase entries.
- **Delete phrase**: Remove phrase entries (with confirmation).
- **Search/Filter phrases**: Search by `phrase` or `meaning`, filter by `language`, `level`, or `is_premium` status.

### 2.4 Session Monitoring
- **View active sessions**: Display current active matching sessions between users.
- **View past sessions**: Display historical matching sessions.
- **Search/Filter sessions**: Search by `user_a` or `user_b` `telegram_id`, filter by `status`.

### 2.5 Match Queue Monitoring
- **View match queue**: Display users currently waiting in the match queue.
- **Remove from queue**: Manually remove a user from the match queue.

## 3. Technology Stack for Admin Dashboard

- **Backend**: Node.js with Express.js (to integrate with existing API structure).
- **Frontend**: HTML, CSS (TailwindCSS for rapid styling), and vanilla JavaScript (or a lightweight library like Alpine.js if needed for interactivity).
- **Database**: SQLite (local development) / Turso (production) - leveraging the existing `@libsql/client`.
