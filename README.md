# MM Language Match Bot 🗣️

A Telegram Mini App and Bot for language learners to find speaking partners.

## 🚀 Features
- **Daily 3 Free Matches** for free users.
- **Language & Level Filtering**.
- **Premium Upgrade** (Unlimited matches, Gender filter, VIP badge).
- **Automated Daily Reset** via Cron.
- **Admin Approval System** for payments.
- **Admin Dashboard** for managing users, vocabularies, and phrases.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express (Vercel Serverless)
- **Database:** Turso (LibSQL)
- **Frontend:** HTML, Tailwind CSS, Telegram WebApp SDK
- **Bot Framework:** Telegraf

## 📦 Setup Instructions

### 1. Environment Variables
Create a `.env` file or set in Vercel:
```env
BOT_TOKEN=your_telegram_bot_token
ADMIN_ID=your_telegram_id
TURSO_DATABASE_URL=libsql://your-db-url.turso.io
TURSO_AUTH_TOKEN=your_auth_token
WEBAPP_URL=https://your-vercel-app.vercel.app
```

### 2. Database Initialization
Run the SQL in `db/schema.sql` on your Turso database.

### 3. Deployment
- **Frontend & API:** Deploy to Vercel.
- **Bot:** Run `npm run bot` on a persistent server (or use a webhook on Vercel).
- **Admin Dashboard:** Run `npm start` and visit `/admin`.
- **Cron:** Set up a GitHub Action or Vercel Cron to trigger `scripts/reset_limits.js`.

## 📂 Project Structure
- `src/bot`: Core bot logic and handlers.
- `src/api`: Vercel serverless functions for the bot.
- `src/admin`: Backend logic for the Admin Dashboard.
- `src/db`: Database schema and connection.
- `admin_dashboard`: Frontend for the Admin Dashboard.
- `public`: Mini App frontend.
- `scripts`: Automation scripts.
- `server.js`: Main Express server entry point.
```
