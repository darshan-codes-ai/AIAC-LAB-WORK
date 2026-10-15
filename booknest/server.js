/**
 * BookNest - Online Bookstore Web Application Server
 * Express.js backend providing REST API endpoints and static file hosting.
 */

const express = require('express');
const path = require('path');
const books = require('./data/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON with malformed JSON guard
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body.'
    });
  }
  next(err);
});

app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 1. Health Check Endpoint
 * GET /health
 * Returns server operational status and uptime.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'BookNest API is running smoothly',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * 2. All Books Catalog Endpoint
 * GET /books
 * Returns all 10 books in JSON format with success=true and count=10.
 */
app.get('/books', (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      count: books.length,
      books: books
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. Individual Book Details Endpoint
 * GET /books/:id
 * Retrieves one specific book by numeric ID.
 *  - Returns HTTP 400 for non-integer, zero, negative, or malformed IDs.
 *  - Returns HTTP 404 if positive integer ID does not exist in the catalog.
 *  - Returns HTTP 200 with the book object on success.
 */
app.get('/books/:id', (req, res) => {
  const rawId = req.params.id;

  // Validate that ID contains only positive integer digits (no decimals, no letters, no negatives, no zero)
  if (!/^\d+$/.test(rawId) || parseInt(rawId, 10) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID. Please provide a positive integer.'
    });
  }

  const bookId = parseInt(rawId, 10);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found.'
    });
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    success: true,
    book: book
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

// Only start the server if this file is executed directly (allows testing with node:test)
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`📚 BookNest - Online Bookstore Server Running!`);
    console.log(`📍 Website URL:     http://localhost:${PORT}`);
    console.log(`📖 Books API:       http://localhost:${PORT}/books`);
    console.log(`🔍 Book Detail API: http://localhost:${PORT}/books/1`);
    console.log(`🩺 Health API:      http://localhost:${PORT}/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;

