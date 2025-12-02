Backend local setup
-------------------

This document explains how to run a local MongoDB instance and start the backend during development on Windows (PowerShell) or using Docker.

1) Prerequisites
- Node.js (>=16)
- npm
- Either MongoDB installed locally (mongod) or Docker available

2) Use .env
 - Copy `.env.example` to `.env` in the `backend` folder and edit if needed.

3) Start MongoDB locally (option A: installed mongod)
PowerShell:

```powershell
mongod --dbpath "C:\data\db"
```

4) Start MongoDB with Docker (option B)
PowerShell:

```powershell
docker run -d --name shopstack-mongo -p 27017:27017 -v %cd%/mongo-data:/data/db mongo:6
docker ps
```

5) Start backend
PowerShell (from `backend` folder):

```powershell
npm install
copy .env.example .env
npm run dev

# Alternative: build and run the compiled output
npm run build
npm start
```

6) Verify
- Open browser or use curl/Postman: `http://localhost:5000/` should return the welcome JSON.
- If you see connection logs from the backend, it successfully connected to MongoDB.

Notes
- The project uses `MONGO_URI` environment variable; the default in `.env.example` points to `mongodb://localhost:27017/shopstack`.
- On Windows, signal handling (SIGUSR2) used by nodemon might behave differently; `npm run dev` with the provided script should work.
