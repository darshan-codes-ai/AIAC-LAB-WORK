/**
 * Sweet Crumbs - Automated API and Integration Tests
 * Uses Node.js built-in test runner (node:test) and strict assertions (node:assert/strict).
 * Tests all required endpoints:
 *  - TEST 1: GET /products
 *  - TEST 2: GET /health
 *  - TEST 3: POST /enquiries (valid submission, missing fields, invalid email, HTTP 400 & 201)
 *  - TEST 4: Frontend static assets & integration verification
 *  - TEST 5: API Error handling (404 for unknown endpoints)
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../server');

let server;
let baseUrl;

before(() => new Promise((resolve) => {
  // Start server on an ephemeral port (0 allows OS to assign any free port)
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    console.log(`[Test Runner] Test server started at ${baseUrl}`);
    resolve();
  });
}));

after(() => new Promise((resolve) => {
  // Gracefully close server after test execution
  server.close(() => {
    console.log('[Test Runner] Test server closed cleanly.');
    resolve();
  });
}));

// ==================== TEST 1: GET /products ====================
describe('TEST 1: GET /products REST API', () => {
  it('should return HTTP 200 OK and Content-Type application/json', async () => {
    const response = await fetch(`${baseUrl}/products`);
    assert.equal(response.status, 200, 'Expected HTTP status 200');
    assert.match(
      response.headers.get('content-type'),
      /application\/json/,
      'Expected application/json header'
    );
  });

  it('should return valid JSON with success=true and count=8', async () => {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();

    assert.equal(data.success, true, 'Expected data.success to be true');
    assert.equal(data.count, 8, 'Expected data.count to be 8');
    assert.ok(Array.isArray(data.products), 'Expected products to be an array');
    assert.equal(data.products.length, 8, 'Expected exactly 8 bakery products');
  });

  it('should verify each product contains id, name, description, price, and image', async () => {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();

    const seenIds = new Set();

    data.products.forEach((product, idx) => {
      // Check required fields existence
      assert.ok(product.id !== undefined, `Product #${idx} missing id`);
      assert.ok(typeof product.name === 'string' && product.name.length > 0, `Product #${idx} missing name`);
      assert.ok(typeof product.description === 'string' && product.description.length > 0, `Product #${idx} missing description`);
      assert.ok(typeof product.image === 'string' && product.image.length > 0, `Product #${idx} missing image`);

      // Verify numeric price > 0
      assert.equal(typeof product.price, 'number', `Product #${product.id} price must be numeric`);
      assert.ok(product.price > 0, `Product #${product.id} price must be greater than zero`);

      // Verify unique IDs
      assert.ok(!seenIds.has(product.id), `Duplicate product ID detected: ${product.id}`);
      seenIds.add(product.id);
    });

    assert.equal(seenIds.size, 8, 'Expected 8 unique product IDs');
  });

  it('should verify product names match the 8 sample bakery products', async () => {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();

    const expectedNames = [
      'Chocolate Cake',
      'Red Velvet Cake',
      'Butter Croissant',
      'Blueberry Muffin',
      'Chocolate Cupcake',
      'Strawberry Cheesecake',
      'Cinnamon Roll',
      'Chocolate Chip Cookies'
    ];

    const actualNames = data.products.map((p) => p.name);
    expectedNames.forEach((expected) => {
      assert.ok(actualNames.includes(expected), `Expected products to include "${expected}"`);
    });
  });
});

// ==================== TEST 2: GET /health ====================
describe('TEST 2: GET /health Endpoint', () => {
  it('should return HTTP 200 OK and health confirmation JSON', async () => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200, 'Expected HTTP 200 from /health');

    const data = await response.json();
    assert.equal(data.status, 'ok', 'Expected status="ok"');
    assert.ok(data.message.includes('running smoothly'), 'Expected healthy message');
    assert.ok(typeof data.uptime === 'number', 'Expected uptime number');
    assert.ok(data.timestamp, 'Expected timestamp');
  });
});

// ==================== TEST 3: POST /enquiries ====================
describe('TEST 3: POST /enquiries Customer Enquiries', () => {
  it('should accept a valid enquiry and return HTTP 201 Created', async () => {
    const validEnquiry = {
      name: 'Aditi Sharma',
      email: 'aditi.sharma@example.com',
      phone: '+91 9876543210',
      productOfInterest: 'Chocolate Cake',
      message: 'I would like to order a 1kg Chocolate Cake for a birthday celebration on Saturday.'
    };

    const response = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validEnquiry)
    });

    assert.equal(response.status, 201, 'Expected HTTP 201 Created');
    const data = await response.json();

    assert.equal(data.success, true, 'Expected data.success to be true');
    assert.ok(data.enquiry, 'Expected enquiry object in response');
    assert.equal(data.enquiry.name, 'Aditi Sharma');
    assert.equal(data.enquiry.email, 'aditi.sharma@example.com');
    assert.equal(data.enquiry.productOfInterest, 'Chocolate Cake');
    assert.ok(data.enquiry.id > 0, 'Expected positive enquiry id');
  });

  it('should reject requests with missing name and return HTTP 400', async () => {
    const invalidPayload = {
      email: 'valid@example.com',
      message: 'Please send pricing details.'
    };

    const response = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload)
    });

    assert.equal(response.status, 400, 'Expected HTTP 400 Bad Request');
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('name')));
  });

  it('should reject requests with invalid email and return HTTP 400', async () => {
    const invalidEmailPayload = {
      name: 'Rohan Verma',
      email: 'not-an-email-address',
      message: 'Interested in catering.'
    };

    const response = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidEmailPayload)
    });

    assert.equal(response.status, 400, 'Expected HTTP 400 Bad Request');
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('email')));
  });

  it('should reject requests with missing message and return HTTP 400', async () => {
    const missingMessagePayload = {
      name: 'Rohan Verma',
      email: 'rohan@example.com',
      message: ''
    };

    const response = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingMessagePayload)
    });

    assert.equal(response.status, 400, 'Expected HTTP 400 Bad Request');
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('message')));
  });
});

// ==================== TEST 4: Frontend Integration & Static Serving ====================
describe('TEST 4: Frontend Integration & Static Files', () => {
  it('should serve index.html with HTTP 200 and text/html', async () => {
    const response = await fetch(`${baseUrl}/`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);

    const html = await response.text();
    assert.ok(html.includes('Sweet Crumbs'), 'HTML should contain bakery name');
    assert.ok(html.includes('Freshly Baked Happiness, Every Day!'), 'HTML should contain hero title');
    assert.ok(html.includes('id="productsGrid"'), 'HTML should contain products grid');
    assert.ok(html.includes('id="enquiryForm"'), 'HTML should contain contact form');
  });

  it('should serve style.css with HTTP 200 and text/css', async () => {
    const response = await fetch(`${baseUrl}/style.css`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/css/);

    const css = await response.text();
    assert.ok(css.includes('--color-cream-100'), 'CSS should contain bakery color palette');
    assert.ok(css.includes('.product-card'), 'CSS should contain product card styling');
  });

  it('should serve script.js with HTTP 200 and javascript mime type', async () => {
    const response = await fetch(`${baseUrl}/script.js`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /(javascript|text\/javascript)/);

    const js = await response.text();
    assert.ok(js.includes('/products'), 'JS should fetch from /products');
    assert.ok(js.includes('/enquiries'), 'JS should submit to /enquiries');
  });

  it('should serve local SVG fallback assets', async () => {
    const response = await fetch(`${baseUrl}/assets/chocolate-cake.svg`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/svg\+xml/);
  });
});

// ==================== TEST 5: Error Handling ====================
describe('TEST 5: Server Error Handling', () => {
  it('should return HTTP 404 JSON for unmatched API routes', async () => {
    const response = await fetch(`${baseUrl}/api/nonexistent`);
    assert.equal(response.status, 404);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('not found'));
  });
});
