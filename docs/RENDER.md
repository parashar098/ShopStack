# Deploying ShopStack to Render

Render is a modern cloud platform that makes deploying Node.js apps easy. This guide covers deploying both the backend (Express) and frontend (Next.js).

## Prerequisites
- GitHub account with your ShopStack repo pushed
- Render account (free tier available at https://render.com)
- MongoDB Atlas cluster with connection string

---

## Part 1: Deploy Backend to Render

### 1. Create a Web Service
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo (ShopStack)
4. Fill in the form:
   - **Name**: `shopstack-backend`
   - **Root Directory**: `backend` (important!)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if preferred)

### 2. Add Environment Variables
On the same page, scroll to **"Environment"** and add:

```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?appName=ecommerce
NODE_ENV=production
PORT=5000
```

Replace with your actual MongoDB Atlas connection string.

### 3. Deploy
Click **"Create Web Service"**. Render will:
- Clone your repo
- Run `npm install && npm run build` (compiles TypeScript to `dist/`)
- Run `npm start` (starts `node dist/server.js`)

Wait for deployment to complete. You'll get a public URL like `https://shopstack-backend.onrender.com`

### 4. Verify
Open `https://shopstack-backend.onrender.com/api/products` in your browser. You should see JSON products from MongoDB Atlas.

---

## Part 2: Deploy Frontend to Render

### 1. Create Another Web Service (for Frontend)
1. Click **"New +"** → **"Web Service"** again
2. Select your ShopStack repo
3. Fill in:
   - **Name**: `shopstack-frontend`
   - **Root Directory**: (leave empty — root of repo)
   - **Runtime**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### 2. Add Environment Variables
Add:
```
NEXT_PUBLIC_API_URL=https://shopstack-backend.onrender.com
NODE_ENV=production
```

Replace `shopstack-backend` with your actual backend service name.

### 3. Deploy
Click **"Create Web Service"**. Render will build and start your Next.js app.

Wait for deployment. You'll get a URL like `https://shopstack-frontend.onrender.com`

---

## Part 3: Verify Integration

1. Open your frontend URL: `https://shopstack-frontend.onrender.com`
2. Check that "Our Featured Products" section loads with products
3. Open DevTools → Network tab → look for `/api/products` requests
4. They should hit your backend URL (e.g., `https://shopstack-backend.onrender.com/api/products`)

---

## Troubleshooting

### Backend fails to start with "Permission denied" error
This usually means production is trying to run `npm run dev` (which uses nodemon/ts-node).
- **Solution**: Make sure your **Start Command** is exactly `npm start` (not `npm run dev`)
- The `render.yaml` file automatically configures this correctly

### Frontend shows "Featured Products" but products don't load
This means the frontend can't reach the backend API.
- **Check**: DevTools Network tab for 404 or CORS errors
- **Check**: `NEXT_PUBLIC_API_URL` environment variable is set correctly on frontend service
- **Check**: Backend service is running and responding to `/api/products`

### MongoDB connection fails
- **Check**: `MONGO_URI` is set in backend environment variables
- **Check**: The connection string is correct (copy-paste from MongoDB Atlas)
- **Check**: IP whitelist in MongoDB Atlas includes Render IPs (usually allow all: 0.0.0.0/0)

### Deployment gets stuck or times out
Free tier services auto-sleep after 15 minutes of inactivity.
- Click **"Restart"** in Render dashboard
- Or upgrade to a paid plan for always-on service

---

## Auto-deploy on Push
By default, Render automatically redeploys when you push to GitHub (main branch). To disable:
- Service Settings → **"Auto-Deploy"** → toggle off

---

## Next Steps
- Set up a domain (Render provides free `.onrender.com` domain or use custom domain)
- Configure HTTPS (automatic with Render)
- Monitor logs in Render dashboard → **"Logs"** tab
- Scale up to paid plan if needed for better performance
