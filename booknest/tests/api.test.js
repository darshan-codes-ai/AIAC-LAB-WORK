/**
 * BookNest - Automated API and Integration Tests
 * Uses Node.js built-in test runner (node:test) and strict assertions (node:assert/strict).
 * Tests all 5 required test suites:
 *  - TEST SUITE 1: GET /books (Full Catalog)
 *  - TEST SUITE 2: GET /books/:id (Individual Book Retrieval & ID Validation)
 *  - TEST SUITE 3: GET /health (Server Health & Uptime)
 *  - TEST SUITE 4: Frontend Integration & Static Assets
 *  - TEST SUITE 5: Error Handling & Security
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

let server;
let baseUrl;

before(() => new Promise((resolve) => {
  // Start server on an ephemeral port (0 allows OS to allocate any free port)
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    console.log(`[Test Runner] BookNest test server started at ${baseUrl}`);
    resolve();
  });
}));

after(() => new Promise((resolve) => {
  // Gracefully close server after testing completes
  server.close(() => {
    console.log('[Test Runner] BookNest test server closed cleanly.');
    resolve();
  });
}));

// ==================== TEST SUITE 1: GET /books ====================
describe('TEST SUITE 1: GET /books Endpoint', () => {
  it('should return HTTP 200 and Content-Type application/json', async () => {
    const response = await fetch(`${baseUrl}/books`);
    assert.equal(response.status, 200, 'Expected HTTP status 200');
    assert.match(
      response.headers.get('content-type'),
      /application\/json/,
      'Expected application/json header'
    );
  });

  it('should return valid JSON with success=true and count=10', async () => {
    const response = await fetch(`${baseUrl}/books`);
    const data = await response.json();

    assert.equal(data.success, true, 'Expected data.success to be true');
    assert.equal(data.count, 10, 'Expected count to equal 10');
    assert.ok(Array.isArray(data.books), 'Expected data.books to be an array');
    assert.equal(data.books.length, 10, 'Expected exactly 10 books in catalog');
  });

  it('should verify every book contains all required properties', async () => {
    const response = await fetch(`${baseUrl}/books`);
    const data = await response.json();

    const seenIds = new Set();
    const expectedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    data.books.forEach((book, idx) => {
      // Required properties verification
      assert.ok(book.id !== undefined, `Book #${idx} missing id`);
      assert.ok(typeof book.title === 'string' && book.title.trim().length > 0, `Book #${idx} missing title`);
      assert.ok(typeof book.author === 'string' && book.author.trim().length > 0, `Book #${idx} missing author`);
      assert.ok(typeof book.category === 'string' && book.category.trim().length > 0, `Book #${idx} missing category`);
      assert.ok(typeof book.description === 'string' && book.description.trim().length > 0, `Book #${idx} missing description`);
      assert.ok(typeof book.image === 'string' && book.image.length > 0, `Book #${idx} missing image`);
      assert.equal(book.currency, 'INR', `Book #${book.id} currency must be INR`);

      // Price verification
      assert.equal(typeof book.price, 'number', `Book #${book.id} price must be numeric`);
      assert.ok(book.price > 0, `Book #${book.id} price must be greater than zero`);

      // Unique IDs
      assert.ok(!seenIds.has(book.id), `Duplicate book ID: ${book.id}`);
      seenIds.add(book.id);
    });

    // Check all 10 IDs present
    expectedIds.forEach((id) => {
      assert.ok(seenIds.has(id), `Expected book ID ${id} in dataset`);
    });
  });

  it('should verify sample titles match the 10 required books', async () => {
    const response = await fetch(`${baseUrl}/books`);
    const data = await response.json();

    const expectedTitles = [
      'The Alchemist',
      'Atomic Habits',
      'Clean Code',
      'Rich Dad Poor Dad',
      'Harry Potter and the Philosopher\'s Stone',
      'The Psychology of Money',
      'Deep Work',
      'Ikigai',
      'Introduction to Algorithms',
      'Think and Grow Rich'
    ];

    const actualTitles = data.books.map((b) => b.title);
    expectedTitles.forEach((title) => {
      assert.ok(actualTitles.includes(title), `Expected catalog to include "${title}"`);
    });
  });
});

// ==================== TEST SUITE 2: GET /books/:id ====================
describe('TEST SUITE 2: GET /books/:id Endpoint', () => {
  it('should return HTTP 200 and The Alchemist for GET /books/1', async () => {
    const response = await fetch(`${baseUrl}/books/1`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.ok(data.book, 'Expected book object');
    assert.equal(data.book.id, 1);
    assert.equal(data.book.title, 'The Alchemist');
    assert.equal(data.book.author, 'Paulo Coelho');
    assert.equal(data.book.price, 399);
  });

  it('should return HTTP 200 and Clean Code for GET /books/3', async () => {
    const response = await fetch(`${baseUrl}/books/3`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.equal(data.book.id, 3);
    assert.equal(data.book.title, 'Clean Code');
    assert.equal(data.book.author, 'Robert C. Martin');
    assert.equal(data.book.price, 650);
  });

  it('should return HTTP 200 and Think and Grow Rich for GET /books/10', async () => {
    const response = await fetch(`${baseUrl}/books/10`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.equal(data.book.id, 10);
    assert.equal(data.book.title, 'Think and Grow Rich');
    assert.equal(data.book.author, 'Napoleon Hill');
    assert.equal(data.book.price, 320);
  });

  it('should return HTTP 404 for an unknown positive integer ID (e.g. 999)', async () => {
    const response = await fetch(`${baseUrl}/books/999`);
    assert.equal(response.status, 404);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.equal(data.message, 'Book not found.');
  });

  it('should return HTTP 400 for a nonnumeric ID (e.g. abc)', async () => {
    const response = await fetch(`${baseUrl}/books/abc`);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('positive integer'));
  });

  it('should return HTTP 400 for a decimal ID (e.g. 1.5)', async () => {
    const response = await fetch(`${baseUrl}/books/1.5`);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('positive integer'));
  });

  it('should return HTTP 400 for zero ID (e.g. 0)', async () => {
    const response = await fetch(`${baseUrl}/books/0`);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('positive integer'));
  });

  it('should return HTTP 400 for negative ID (e.g. -5)', async () => {
    const response = await fetch(`${baseUrl}/books/-5`);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('positive integer'));
  });
});

// ==================== TEST SUITE 3: GET /health ====================
describe('TEST SUITE 3: GET /health Endpoint', () => {
  it('should return HTTP 200, valid JSON and healthy server status', async () => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.status, 'ok');
    assert.ok(data.message.includes('running smoothly'));
    assert.ok(typeof data.uptime === 'number');
    assert.ok(data.timestamp);
  });
});

// ==================== TEST SUITE 4: Frontend Integration & Static Files ====================
describe('TEST SUITE 4: Frontend Integration & Static Assets', () => {
  it('should serve index.html with HTTP 200 and text/html', async () => {
    const response = await fetch(`${baseUrl}/`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);

    const html = await response.text();
    assert.ok(html.includes('BookNest'), 'HTML should contain BookNest branding');
    assert.ok(html.includes('Discover Your Next') && html.includes('Great Read'), 'HTML should contain hero title');
    assert.ok(html.includes('id="searchInput"'), 'HTML should contain search input');
    assert.ok(html.includes('id="booksGrid"'), 'HTML should contain book grid');
    assert.ok(html.includes('id="bookModal"'), 'HTML should contain details modal');
  });

  it('should serve style.css with HTTP 200 and text/css', async () => {
    const response = await fetch(`${baseUrl}/style.css`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/css/);

    const css = await response.text();
    assert.ok(css.includes('--color-cream-100'), 'CSS should contain literary theme');
    assert.ok(css.includes('.book-card'), 'CSS should contain book card styles');
  });

  it('should serve script.js with HTTP 200 and javascript mime type', async () => {
    const response = await fetch(`${baseUrl}/script.js`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /(javascript|text\/javascript)/);

    const js = await response.text();
    assert.ok(js.includes('/books'), 'JS should call /books');
    assert.ok(js.includes('searchBooksByTitle') || js.includes('searchInput'), 'JS should implement search');
  });

  it('should serve local SVG fallback and illustration assets', async () => {
    const resLogo = await fetch(`${baseUrl}/assets/logo.svg`);
    assert.equal(resLogo.status, 200);
    assert.match(resLogo.headers.get('content-type'), /image\/svg\+xml/);

    const resPlaceholder = await fetch(`${baseUrl}/assets/book-cover-placeholder.svg`);
    assert.equal(resPlaceholder.status, 200);
    assert.match(resPlaceholder.headers.get('content-type'), /image\/svg\+xml/);

    const resHero = await fetch(`${baseUrl}/assets/hero-books.svg`);
    assert.equal(resHero.status, 200);
    assert.match(resHero.headers.get('content-type'), /image\/svg\+xml/);
  });
});

// ==================== TEST SUITE 5: Error Handling & Security ====================
describe('TEST SUITE 5: Error Handling & Security', () => {
  it('should return HTTP 404 JSON for unknown API routes', async () => {
    const response = await fetch(`${baseUrl}/api/unknown-endpoint`);
    assert.equal(response.status, 404);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('not found'));
  });

  it('should not leak internal server stack traces to users in error responses', async () => {
    const response = await fetch(`${baseUrl}/api/unknown-endpoint`);
    const data = await response.json();
    assert.equal(data.stack, undefined, 'Server should not expose stack traces');
  });
});

