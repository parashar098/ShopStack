Backend Setup & Running
-----------------------

This project uses **MongoDB Atlas** (cloud database). No local MongoDB installation required.

## Prerequisites
- Node.js (>=16)
- npm
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

## Setup Steps

### 1. Get MongoDB Atlas Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with a password
4. Click "Connect" and copy the connection string
5. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/?appName=shopstack`

### 2. Configure Environment
Copy `.env.example` to `.env` in the `backend` folder:

```powershell
cd backend
copy .env.example .env
```

Edit `.env` and paste your MongoDB Atlas connection string:
```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?appName=shopstack
PORT=5000
```

### 3. Install Dependencies & Start Backend
```powershell
npm install
npm run dev
```

The backend will start on `http://localhost:5000` and connect to MongoDB Atlas.

### 4. Verify Connection
- Open `http://localhost:5000/api/products` in your browser
- You should see a JSON response with products
- Check the terminal for "MongoDB connected" message

## Build & Production

Build for production:
```powershell
npm run build
npm start
```

This compiles TypeScript and runs the production version from `dist/server.js`.

## Notes
- `nodemon` watches for file changes during `npm run dev` (development only)
- For deployment, use `npm start` (runs pre-compiled code)
- All data is stored in MongoDB Atlas cloud, not locally
