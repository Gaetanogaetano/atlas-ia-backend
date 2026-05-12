-- ATLAS-IA BACKEND DATABASE SCHEMA (Supabase PostgreSQL)

-- CLIENTS TABLE
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  status VARCHAR(50) DEFAULT 'prospect', -- prospect, client, churned
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- PRODUCTS TABLE
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL, -- Hobby, Standard, Pro
  sku VARCHAR(50) UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  margin DECIMAL(5, 2) DEFAULT 50, -- 50%
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INVOICES TABLE
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT DEFAULT 1,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  stripe_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  due_date DATE,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ORDERS TABLE (for tracking multiple products per invoice)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10, 2),
  subtotal DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- PAYMENT TRACKING
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  stripe_id VARCHAR(255),
  amount DECIMAL(10, 2),
  payment_method VARCHAR(50), -- card, bank_transfer
  status VARCHAR(50), -- pending, completed, failed
  created_at TIMESTAMP DEFAULT NOW()
);

-- SEED DATA: Products
INSERT INTO products (name, sku, price, cost, margin, description) VALUES
('Hobby - Pi5 8GB', 'HOBBY', 1299.00, 649.50, 50, 'Raspberry Pi 5 8GB + 1TB SSD'),
('Standard - Pi5 16GB', 'STANDARD', 1499.00, 749.50, 50, 'Raspberry Pi 5 16GB + 1TB SSD'),
('Pro - GPU Server', 'PRO', 3499.00, 1749.50, 50, 'GPU Server (RTX 4060+)'),
('Support Monthly', 'SUPPORT', 150.00, 75.00, 50, '24/5 Support + Updates');

-- INDEXES
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_created ON invoices(created_at);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
