/**
 * Sweet Crumbs - Bakery Web Application Server
 * Express.js backend providing REST API endpoints and static file hosting.
 */

const express = require('express');
const path = require('path');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for customer enquiries (demo college assignment purpose)
// NOTE: These enquiries are stored in RAM and will reset when server restarts.
const enquiries = [];

// Middleware for parsing JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Basic Email Validation Helper
 * Ensures the email follows the user@domain.tld format.
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * 1. Health Check Endpoint
 * GET /health
 * Returns server status and uptime for monitoring.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Sweet Crumbs Bakery API is running smoothly',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * 2. Products Endpoint
 * GET /products
 * Returns all bakery products with descriptions, pricing in INR, and image links.
 */
app.get('/products', (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      count: products.length,
      products: products
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. Single Product Endpoint (Helper for modularity)
 * GET /products/:id
 */
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID format'
    });
  }

  const product = products.find((item) => item.id === productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found`
    });
  }

  res.status(200).json({
    success: true,
    product: product
  });
});

/**
 * 4. Customer Enquiries Endpoint
 * POST /enquiries
 * Accepts customer enquiries, validates input, and stores them in memory.
 */
app.post('/enquiries', (req, res) => {
  try {
    const { name, email, phone, productOfInterest, message } = req.body || {};

    const errors = [];

    // Validation: Name is required and must have reasonable length
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Full Name is required.');
    } else if (name.trim().length < 2) {
      errors.push('Full Name must be at least 2 characters long.');
    }

    // Validation: Email is required and must be valid
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      errors.push('Email address is required.');
    } else if (!isValidEmail(email)) {
      errors.push('Please provide a valid email address (e.g., customer@example.com).');
    }

    // Validation: Message is required
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      errors.push('Message is required.');
    } else if (message.trim().length < 5) {
      errors.push('Message must be at least 5 characters long.');
    }

    // Optional phone validation if provided
    if (phone && typeof phone === 'string' && phone.trim().length > 0) {
      const phoneDigits = phone.replace(/[\s\-\+\(\)]/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        errors.push('Phone number, if provided, must contain between 7 and 15 digits.');
      }
    }

    // If validation fails, return 400 Bad Request
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors: errors
      });
    }

    // Construct enquiry object
    const newEnquiry = {
      id: enquiries.length + 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      productOfInterest: productOfInterest ? productOfInterest.trim() : 'General Enquiry',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    enquiries.push(newEnquiry);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.',
      enquiry: newEnquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process enquiry. Please try again later.'
    });
  }
});

/**
 * 5. Retrieve Enquiries Endpoint (Helper for testing and grading evaluation)
 * GET /enquiries
 */
app.get('/enquiries', (req, res) => {
  res.status(200).json({
    success: true,
    count: enquiries.length,
    enquiries: enquiries,
    note: 'Enquiries are stored in temporary server memory and will clear upon server restart.'
  });
});

// 404 handler for unknown API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Centralized error-handling middleware (prevents leaking stack traces)
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred. Please try again later.'
  });
});

// Only start the server if this file is executed directly (allows testing with supertest or node:test)
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🥐 Sweet Crumbs Bakery Server Running!`);
    console.log(`📍 Website URL:   http://localhost:${PORT}`);
    console.log(`📦 Products API:  http://localhost:${PORT}/products`);
    console.log(`🩺 Health API:    http://localhost:${PORT}/health`);
    console.log(`✉️  Enquiries API: http://localhost:${PORT}/enquiries`);
    console.log(`====================================================`);
  });
}

module.exports = app;

