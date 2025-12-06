# Deploying ShopStack — Frontend on Vercel, Backend on Render

This document shows copy-paste commands and dashboard steps to deploy the frontend to Vercel and the backend (Express + MongoDB) to Render. It assumes you keep secrets in the platform dashboards (do NOT commit secrets).

---

## 1 — Prepare repository

- Ensure your repo is pushed to GitHub and the default branch is `main`.
- Verify the frontend `next` app builds locally:

```powershell
cd "C:\Users\Administrator\OneDrive\Desktop\project121\ShopStack"
npm install
npm run build
```

If the build completes, the repo is ready for Vercel.

## 2 — Deploy backend to Render (recommended)

Why Render: full process support for Node/Express + long-running services and easy environment variable management.

Dashboard steps (recommended):
1. Go to https://dashboard.render.com and click **New → Web Service**.
2. Connect your GitHub account and select the `parashar098/ShopStack` repository.
3. Set **Root Directory** to `backend`.
4. Branch: `main`.
5. Build Command: `npm install && npm run build`.
6. Start Command: `npm start`.
7. Environment:
   - Add `MONGO_URI` with your MongoDB Atlas connection string (example stored locally in `backend/.env` but DO NOT commit secrets).
   - Optionally add `PORT=5000` (Render supplies a port automatically but setting it is fine).
8. Create the service and deploy.

After deploy completes you will get a public URL such as `https://shopstack-backend.onrender.com`.

CLI notes (optional): Render has a CLI but dashboard configuration is easier for env vars.

## 3 — Deploy frontend to Vercel

Dashboard steps:
1. Go to https://vercel.com/new, choose **Import Git Repository**, and select `parashar098/ShopStack`.
2. Project root: repository root (Vercel will detect Next.js automatically). If Vercel asks for a Root Directory, set it to `/`.
3. Environment Variables: **Add** the following (Production scope):
   - `NEXT_PUBLIC_API_URL` = `https://<your-backend-service>.onrender.com` (replace with your Render backend URL)
4. Deploy.

Vercel CLI (PowerShell):

```powershell
npm i -g vercel
vercel login
cd "C:\Users\Administrator\OneDrive\Desktop\project121\ShopStack"
vercel --prod
# add production env var
vercel env add NEXT_PUBLIC_API_URL production
```

When `vercel env add` prompts, paste the backend URL returned by Render.

## 4 — Post-deploy checks

- Open the frontend site URL provided by Vercel and verify the homepage shows featured products and gallery.
- Visit the admin area `/admin` and verify orders/users load (you may need to log in).
- Run an order (checkout) to ensure backend APIs work.

## 5 — Security & best practices

- NEVER commit `MONGO_URI` / production secrets to the repo. Use Render/Vercel dashboard secrets.
- Lock MongoDB Atlas IP access to Render/Vercel IPs or use VPC peering where possible.
- Keep the backend `start` command as `npm start` (build in postinstall) for production.

## 6 — Troubleshooting

- If the frontend shows empty featured products, confirm `NEXT_PUBLIC_API_URL` is correct and reachable from the browser.
- Check backend logs on Render for connection errors.

---

If you want, I can:
- Commit a small `vercel.json` (done) and this docs file to the repo (done).
- Help you add the env variables via the Vercel/Render CLIs if you share access or run those commands locally.
