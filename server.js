const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ROUTES
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Atlas-IA Backend is running!' });
});

// SERVE INDEX.HTML FOR ALL ROUTES (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✅ Atlas-IA Backend running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});
