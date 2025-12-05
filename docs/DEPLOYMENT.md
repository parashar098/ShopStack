# ShopStack Deployment Guide

## Issue: Featured Products and Limited Time Offer Not Showing in Deployment

### Root Cause
The frontend application cannot connect to the backend API because it's using `http://localhost:5000`, which only works on your local machine. In a deployed environment, you must configure the correct backend URL.

### Solution

#### Step 1: Set Backend URL Environment Variable

**For Vercel Deployment:**
1. Go to your Vercel project settings → **Environment Variables**
2. Add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-backend-domain.com` (or wherever your backend is deployed)
   - **Environments:** Select `Production`, `Preview`, and `Development`
3. Click **Save and Redeploy**

**For Other Platforms (Netlify, Docker, etc.):**
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

#### Step 2: Ensure Backend is Deployed and Running

The backend must be publicly accessible. Common options:
- **Render.com** (free tier available)
- **Railway.app**
- **Heroku**
- **AWS/Google Cloud**
- **Your own server**

#### Step 3: Update Backend URL in Code (if needed)

The frontend looks for `NEXT_PUBLIC_API_URL` environment variable in:
- `src/lib/backend-api.ts` (line 5-6)

Default fallback: `http://localhost:5000` (only works locally)

#### Step 4: Test the Connection

Once deployed with the correct API URL, navigate to your site and:
1. Open browser DevTools → **Console**
2. Check for errors mentioning the API URL
3. Go to **Network** tab and verify API calls to your backend domain are succeeding
4. Refresh the page — Featured Products and Limited Time Offer should appear

### Example Configuration

**Local Development:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Production (Vercel):**
```
NEXT_PUBLIC_API_URL=https://shopstack-api.railway.app
```

### Backend Requirements

Your deployed backend must:
- Have `/api/products` endpoint returning products
- Have `/api/orders` endpoint for placing orders
- Allow CORS requests from your frontend domain
- Return product data in the format:
  ```json
  {
    "products": [
      {
        "_id": "...",
        "name": "...",
        "price": 99.99,
        "image": "...",
        "category": "...",
        "countInStock": 10
      }
    ]
  }
  ```

### Troubleshooting

**Products still not showing after setting env var?**
1. Check the browser Console for CORS errors
2. Verify backend is running and accessible: `curl https://your-backend-domain.com/api/products`
3. Ensure `NEXT_PUBLIC_API_URL` is correctly set (no trailing slash)
4. Redeploy the frontend after changing environment variables

**CORS Error?**
Update backend `app.ts` to allow your frontend domain:
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Quick Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] `NEXT_PUBLIC_API_URL` environment variable set
- [ ] Frontend redeployed after env change
- [ ] API calls visible in browser DevTools Network tab
- [ ] Products loading on homepage
- [ ] Featured Products section visible
- [ ] Limited Time Offer section visible

