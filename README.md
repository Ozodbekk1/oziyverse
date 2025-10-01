# Q&A Backend (NestJS + MongoDB)

This is a full CRUD Q&A backend example built with NestJS and MongoDB (Mongoose), ready for production/demo.

## Features
- Questions (slug-based)
- Answers (slug-based)
- Comments
- Tags
- Notifications
- Users (profile stats)
- Leaderboard
- Search (MongoDB text index)

## Run with Docker
```bash
docker compose up --build
```

## Local Run
1. Install dependencies: `npm install`
2. Create `.env` with `MONGO_URI` and `PORT`.
3. Run: `npm run start:dev`

Note: This project assumes you integrate your auth middleware which sets `req.user = { id, email, username, slug }`.
