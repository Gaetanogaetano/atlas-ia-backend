# ⚡ QUICK START - ATLAS-IA BACKEND

**Get live in 15 minutes!**

---

## 🚀 STEP 1: Create GitHub Repo

Go to https://github.com/new and create `atlas-ia-backend`

Then run:
```bash
cd ATLAS-IA-BACKEND
git remote add origin https://github.com/YOUR_USERNAME/atlas-ia-backend
git branch -M main
git push -u origin main
```

---

## 🔧 STEP 2: Vercel Setup

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select GitHub → Connect Account
4. Find & Select `atlas-ia-backend`
5. Click "Import"

---

## 🔐 STEP 3: Environment Variables

In Vercel, add these vars before deploying:

```
SUPABASE_URL = (get from supabase.com dashboard)
SUPABASE_KEY = (get from supabase.com dashboard)
STRIPE_SECRET_KEY = sk_test_... (from stripe.com)
STRIPE_WEBHOOK_SECRET = whsec_... (from stripe webhooks)
JWT_SECRET = (any random 32-char string)
ADMIN_PASSWORD = (your dashboard password)
NODE_ENV = production
```

Then click **Deploy** ✅

---

## 🗄️ STEP 4: Supabase Tables

1. Go to https://supabase.com
2. Create new project: `atlas-ia`
3. Get your `SUPABASE_URL` and `SUPABASE_KEY`
4. Go to SQL Editor
5. Run this query (from `database.sql`):

```sql
-- Copy entire database.sql content here
-- Then run ✅
```

---

## 💳 STEP 5: Stripe Webhook

1. Go to https://stripe.com/dashboard
2. Get your `STRIPE_SECRET_KEY`
3. Go to Webhooks
4. Add endpoint:
   - URL: `https://YOUR_VERCEL_URL/webhook/stripe`
   - Events: `payment_intent.succeeded`
5. Get webhook secret `whsec_...`

---

## 🌐 STEP 6: Cloudflare DNS

1. Go to https://dash.cloudflare.com
2. Select `atlas-ia.net`
3. DNS → Add Record:
   ```
   Type: CNAME
   Name: backend
   Content: (your vercel URL)
   ```

---

## ✅ DONE!

Visit: **https://backend.atlas-ia.net**

Login with your `ADMIN_PASSWORD`

---

## 📊 Dashboard Features

✅ View all clients
✅ Create invoices
✅ Track payments
✅ See analytics
✅ Manage products

---

**Total time: ~15 minutes** ⚡

Questions? Check `DEPLOY_GUIDE.md` for details.
