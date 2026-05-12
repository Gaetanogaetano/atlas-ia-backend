const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// SUPABASE
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// STRIPE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// JWT MIDDLEWARE
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ===== CLIENTS ENDPOINTS =====

// GET all clients
app.get('/api/clients', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE client
app.post('/api/clients', authenticateToken, async (req, res) => {
  const { name, email, phone, address, city, country, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name,
          email,
          phone,
          address,
          city,
          country,
          status: status || 'prospect',
          created_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE client
app.put('/api/clients/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, city, country, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ name, email, phone, address, city, country, status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PRODUCTS ENDPOINTS =====

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== INVOICES ENDPOINTS =====

// GET all invoices
app.get('/api/invoices', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(name, email)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE invoice
app.post('/api/invoices', authenticateToken, async (req, res) => {
  const { client_id, product_id, quantity, total, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert([
        {
          client_id,
          product_id,
          quantity,
          total,
          status: status || 'draft',
          created_at: new Date(),
          invoice_number: `INV-${Date.now()}`,
        },
      ])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE invoice status
app.put('/api/invoices/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== STRIPE WEBHOOK =====

app.post('/webhook/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Update invoice status to paid
      await supabase
        .from('invoices')
        .update({ status: 'paid', stripe_id: paymentIntent.id })
        .eq('stripe_id', paymentIntent.metadata.invoice_id);

      console.log('✅ Payment received:', paymentIntent.id);
    }

    res.json({received: true});
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// ===== AUTH ENDPOINT =====

// LOGIN
app.post('/api/login', async (req, res) => {
  const { password } = req.body;

  // Simple password check (change this!)
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// ===== ANALYTICS =====

app.get('/api/analytics', authenticateToken, async (req, res) => {
  try {
    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('total, status, created_at');

    if (error) throw error;

    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const paidRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);
    const pendingRevenue = invoices
      .filter(inv => inv.status === 'sent' || inv.status === 'draft')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);

    res.json({
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      totalInvoices: invoices.length,
      paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✅ Atlas-IA Backend running on http://localhost:${PORT}`);
});
