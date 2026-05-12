# 🚀 ATLAS-IA BACKEND

Admin Dashboard + API pour gérer les clients, factures, et revenus.

---

## 📋 STRUCTURE

```
ATLAS-IA-BACKEND/
├── server.js              # Express server principal
├── package.json           # Dependencies
├── .env.example           # Config template
├── database.sql           # SQL schema (Supabase)
├── public/
│   └── index.html         # Admin dashboard
└── README.md
```

---

## 🔧 SETUP

### 1. Cloner et installer

```bash
cd ATLAS-IA-BACKEND
npm install
cp .env.example .env
```

### 2. Configurer .env

```
SUPABASE_URL=your_project.supabase.co
SUPABASE_KEY=your_anon_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your_secret_key
ADMIN_PASSWORD=your_password
PORT=3001
```

### 3. Créer la DB Supabase

1. Aller sur https://supabase.com
2. Créer nouveau projet
3. Copier l'URL et la clé dans .env
4. Exécuter `database.sql` dans l'éditeur SQL Supabase

### 4. Démarrer le serveur

```bash
npm start
```

Le dashboard admin sera à: `http://localhost:3001`

---

## 📊 FEATURES ACTUELLES

✅ **Clients**
- Créer/lister/modifier clients
- Statut (prospect, client, churned)

✅ **Factures**
- Créer factures
- Marquer comme payée
- Tracking Stripe

✅ **Produits**
- Hobby (€1,299)
- Standard (€1,499)
- Pro (€3,499)
- Support (€150/mois)

✅ **Analytics**
- Revenue total
- Revenue payé
- Revenue en attente
- Total invoices

---

## 🔌 API ENDPOINTS

### Authentification
```
POST /api/login
Body: { password: "..." }
Response: { token: "..." }
```

### Clients
```
GET /api/clients
POST /api/clients
PUT /api/clients/:id
```

### Invoices
```
GET /api/invoices
POST /api/invoices
PUT /api/invoices/:id
```

### Products
```
GET /api/products
```

### Analytics
```
GET /api/analytics
```

---

## 💳 STRIPE INTEGRATION

Webhook endpoint: `POST /webhook/stripe`

À configurer dans Stripe Dashboard:
```
Endpoint URL: https://your-domain.com/webhook/stripe
Events: payment_intent.succeeded
```

---

## 🚀 NEXT STEPS

1. **Deploy sur Vercel** (Node.js support)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Ajouter email automation** (Nodemailer)
   - Envoi automatique factures
   - Rappels paiement

3. **Générer PDF** (html-pdf)
   - Export factures en PDF
   - Templates professionnels

4. **Advanced reporting**
   - Export CSV/JSON
   - Graphiques MRR
   - Projections revenue

---

## 🔐 SÉCURITÉ

- ✅ JWT authentication
- ✅ CORS configured
- ✅ Stripe webhook validation
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: Input validation

---

## 📱 DASHBOARD FEATURES

- Login password-protected
- Dark mode (cyan theme)
- Real-time analytics
- Client management
- Invoice tracking
- Mobile responsive

---

**Created:** May 12, 2026
**Version:** 1.0.0
**Author:** Gatsu
