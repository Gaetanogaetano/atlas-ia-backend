# 🚀 ATLAS-IA BACKEND - DEPLOYMENT GUIDE

**Time: 10-15 min total**

---

## STEP 1: GitHub (2 min)

### Option A: GitHub CLI
```bash
gh repo create atlas-ia-backend --source=. --remote=origin --push
```

### Option B: Manual
1. Go to https://github.com/new
2. Create repo: `atlas-ia-backend`
3. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/atlas-ia-backend
git branch -M main
git push -u origin main
```

---

## STEP 2: Vercel Deploy (5 min)

1. **Go to:** https://vercel.com/new
2. **Import Project:**
   - Select "GitHub"
   - Find `atlas-ia-backend` repo
   - Click "Import"

3. **Configure:**
   - Framework: "Other"
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Install Command: `npm install`

4. **Environment Variables:**
   ```
   SUPABASE_URL = your_project.supabase.co
   SUPABASE_KEY = your_anon_key
   STRIPE_SECRET_KEY = sk_test_...
   STRIPE_WEBHOOK_SECRET = whsec_...
   JWT_SECRET = generate_random_string_32_chars
   ADMIN_PASSWORD = your_strong_password
   NODE_ENV = production
   ```

5. **Deploy!** → Takes ~2 min

### After Deploy:
- Vercel gives you URL: `atlas-ia-backend-xxx.vercel.app`
- Note this down!

---

## STEP 3: Supabase Setup (3 min)

### 1. Create Supabase Project
- Go to https://supabase.com/dashboard
- "New Project"
- Name: `atlas-ia`
- Region: `Europe (Frankfurt)`
- Password: Strong password (save!)

### 2. Get Credentials
- Project Settings → API
- Copy: `Project URL` + `Anon Public Key`
- Add to Vercel env vars

### 3. Create Tables
- SQL Editor → New Query
- Paste content of `database.sql`
- Run ✅

### 4. Enable RLS (Row Level Security)
- Go to Authentication
- Enable Row Level Security for all tables
- Create policy: Allow all (for now)

---

## STEP 4: Stripe Setup (2 min)

### 1. Get Keys
- https://dashboard.stripe.com/apikeys
- Copy: Secret Key (sk_test_...)
- Add to Vercel env vars

### 2. Webhook Setup
- https://dashboard.stripe.com/webhooks
- "Add Endpoint"
- URL: `https://YOUR_VERCEL_URL/webhook/stripe`
- Events: `payment_intent.succeeded`
- Copy webhook secret
- Add to Vercel env vars

---

## STEP 5: Cloudflare DNS (2 min)

1. Go to https://dash.cloudflare.com
2. Select `atlas-ia.net` domain
3. DNS Records → Add
   ```
   Type: CNAME
   Name: backend
   Content: atlas-ia-backend-xxx.vercel.app
   TTL: Auto
   Proxy: DNS only
   ```
4. Wait ~1 min for DNS propagation

---

## STEP 6: Access Your Admin Dashboard

1. **URL:** https://backend.atlas-ia.net
2. **Password:** (whatever you set in ADMIN_PASSWORD)
3. **Start managing clients & invoices!** ✅

---

## VERIFY DEPLOYMENT

### Check Backend is Live
```bash
curl https://backend.atlas-ia.net/api/products
```

Should return JSON with products list.

### Test Admin Dashboard
```
https://backend.atlas-ia.net
→ Login with ADMIN_PASSWORD
→ Check Analytics tab
```

---

## TROUBLESHOOTING

### 502 Bad Gateway
- Check Vercel logs: https://vercel.com/dashboard
- Verify env vars are set correctly
- Restart deployment

### Database Connection Error
- Verify SUPABASE_URL and SUPABASE_KEY
- Check if Supabase project is running
- Check firewall/IP allow-lists

### Stripe Webhook Not Working
- Verify webhook URL in Stripe Dashboard
- Check Vercel function logs
- Test with Stripe CLI: `stripe listen --forward-to localhost:3001/webhook/stripe`

---

## NEXT STEPS

1. ✅ Deploy backend
2. Connect to frontend (atlas-ia.net)
   - Add payment form integration
   - Link to backend API
3. Setup email automation
   - Send invoices via Nodemailer
   - Payment reminders
4. Advanced reporting
   - Export to CSV
   - Generate PDF invoices

---

**Deployment checklist:**
- [ ] GitHub repo created
- [ ] Vercel project deployed
- [ ] Supabase project created + tables
- [ ] Env vars set in Vercel
- [ ] Stripe keys added
- [ ] Cloudflare DNS configured
- [ ] Admin dashboard accessible
- [ ] API endpoints working

**Total time: ~15 min** ⚡

---

**Support:** Check vercel.com logs or supabase.com console for errors.
