#!/bin/bash

# ATLAS-IA BACKEND AUTOMATED SETUP
# Installs dependencies and creates .env file

echo "🚀 ATLAS-IA BACKEND SETUP"
echo "========================="

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# 2. Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ npm install failed"
    exit 1
fi

# 3. Create .env file
if [ -f .env ]; then
    echo "⚠️  .env already exists"
else
    echo ""
    echo "🔐 Creating .env file..."
    
    # Generate random secrets
    JWT_SECRET=$(openssl rand -base64 32)
    ADMIN_PASSWORD=$(openssl rand -base64 12)
    
    cat > .env << EOF
# SUPABASE
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here

# STRIPE
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# SERVER
PORT=3001
NODE_ENV=development
JWT_SECRET=$JWT_SECRET
ADMIN_PASSWORD=$ADMIN_PASSWORD

# EMAIL (optional)
EMAIL_FROM=noreply@atlas-ia.net
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EOF

    echo "✅ .env created with random secrets"
    echo ""
    echo "⚠️  EDIT .env with your actual credentials:"
    echo "   - SUPABASE_URL + SUPABASE_KEY"
    echo "   - STRIPE_SECRET_KEY + WEBHOOK_SECRET"
    echo "   - ADMIN_PASSWORD (for dashboard login)"
fi

# 4. Check for Git
if ! command -v git &> /dev/null; then
    echo "⚠️  Git not found. Install from https://git-scm.com/"
else
    echo "✅ Git found"
    
    if [ ! -d .git ]; then
        echo ""
        echo "📦 Initializing Git..."
        git init
        git add .
        git commit -m "Initial commit: Atlas-IA Backend"
    fi
fi

echo ""
echo "✅ SETUP COMPLETE!"
echo ""
echo "🚀 Next steps:"
echo "1. Edit .env with your Supabase & Stripe credentials"
echo "2. Run: npm start"
echo "3. Visit: http://localhost:3001"
echo "4. Login with password from .env"
echo ""
echo "📚 See DEPLOY_GUIDE.md for Vercel deployment"
