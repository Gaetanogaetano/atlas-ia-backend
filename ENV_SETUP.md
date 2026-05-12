# 🔐 ENVIRONMENT SETUP - Atlas-IA Backend

## SUPABASE (Database)

### 1. Login to Supabase
- URL: https://supabase.com/dashboard
- Email: xkuro.89x@gmail.com
- Password: [Your Supabase password]

### 2. Create Project
- Project Name: `atlas-ia`
- Region: `Europe (Frankfurt)` or closest
- Password: [Create strong password]

### 3. Get Credentials
After project creation:
- Go to **Settings** → **API**
- Copy:
  - **SUPABASE_URL**: `https://xxx.supabase.co`
  - **SUPABASE_KEY**: `eyJhbGciOiJIUzI1NiIsInR5...`

### 4. Create Tables
- Go to **SQL Editor**
- Run the content from `database.sql`
- All tables will be created automatically

### 5. Enable Row Level Security (Optional)
- Authentication → Policies
- For now, skip (allow all)

---

## STRIPE (Payments)

### 1. Login to Stripe
- URL: https://dashboard.stripe.com
- Email: xkuro.89x@gmail.com
- Password: @Gaeowna89 ⚠️ **CHANGE THIS IMMEDIATELY AFTER**

### 2. Get API Keys
- Go to **Developers** → **API Keys**
- Copy:
  - **STRIPE_SECRET_KEY**: `sk_test_...`
  - **STRIPE_PUBLISHABLE_KEY**: `pk_test_...`

### 3. Setup Webhook
- Go to **Developers** → **Webhooks**
- Add endpoint:
  - URL: `https://atlas-ia-backend-iota.vercel.app/webhook/stripe`
  - Events: `payment_intent.succeeded`
- Get:
  - **STRIPE_WEBHOOK_SECRET**: `whsec_...`

---

## VERCEL ENVIRONMENT VARIABLES

### Go to:
1. https://vercel.com/dashboard
2. Select `atlas-ia-backend` project
3. **Settings** → **Environment Variables**

### Add these 6 variables:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_KEY = eyJhbGc...
STRIPE_SECRET_KEY = sk_test_...
STRIPE_WEBHOOK_SECRET = whsec_...
JWT_SECRET = (generate: openssl rand -base64 32)
ADMIN_PASSWORD = your_password_here
NODE_ENV = production
```

### After adding:
- Click **Save**
- Go to **Deployments**
- Click latest deployment
- Click **Redeploy**

---

## TESTING

### 1. Health Check
```bash
curl https://atlas-ia-backend-iota.vercel.app/api/health
```

Should return: `{"status":"ok","message":"Atlas-IA Backend is running!"}`

### 2. Dashboard
Visit: https://atlas-ia-backend-iota.vercel.app

Should see the beautiful admin dashboard!

---

## ⚠️ SECURITY REMINDERS

1. **CHANGE STRIPE PASSWORD IMMEDIATELY!**
   - Go to Stripe account settings
   - Change password to something unique

2. **Never share credentials in chat/email**
   - Use environment variables instead
   - Store sensitive data in `.env` (not in git)

3. **Rotate API keys regularly**
   - Every 3-6 months
   - After any suspected compromise

4. **Enable 2FA**
   - Stripe: Settings → Two-factor authentication
   - Supabase: Account → Two-factor authentication

---

## NEXT STEPS

Once env vars are set:
1. ✅ Supabase connected
2. ✅ Stripe configured
3. ✅ Vercel deploying
4. ✅ Dashboard live
5. ⏳ Add API endpoints (clients, invoices, etc)
6. ⏳ Connect frontend to backend
7. ⏳ Payment flows

---

**Document created:** May 12, 2026
**Status:** Setup guide for team
