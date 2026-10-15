# BookNest – Online Bookstore Website

> **College Assignment:** Set 3 – Online Bookstore Website  
> **Course:** Full-Stack Web Development Practical Examination  
> **Author:** College Student  
> **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), Node.js, Express.js, REST API, Node.js Native Test Runner  

---

## 1. Project Title
**BookNest – Online Bookstore Website & REST API**

---

## 2. Project Overview
**BookNest** is a complete, fully functional, responsive web application designed for book lovers to explore an online bookstore catalog, search for titles dynamically in real time, and inspect in-depth book details.

The application is powered by a **Node.js and Express.js REST API** backend coupled with a semantic **HTML5, CSS3, and Vanilla JavaScript** frontend. The frontend retrieves catalog items dynamically through `GET /books` and fetches individual book details via `GET /books/:id`. The interface features an elegant literary design using a warm cream background (`#FAF7F2`), deep forest-navy accents (`#1A2E26`), and warm gold highlights (`#D97706`). The search bar supports case-insensitive, whitespace-trimmed, partial-title matching and updates results dynamically without page reloads. The application includes 19 automated tests using the native Node.js test runner (`node:test`).

---

## 3. Assignment Objectives
* **Complete Book Catalog:** Present 10 curated titles across Fiction, Self-Help, Computer Science, Fantasy, and Finance with prices formatted in Indian Rupees (`₹`).
* **Dynamic API-Driven Frontend:** Retrieve all book information from the backend REST API rather than maintaining a separate hardcoded list in frontend JavaScript.
* **Instant Title Search:** Implement functional JavaScript search that filters the retrieved catalog, displays matching counts, handles empty result states, and restores the full catalog when cleared.
* **Individual Book Details:** Fetch individual book records on demand via `GET /books/:id` and display them inside an accessible modal dialog.
* **Server-Side Validation:** Enforce positive integer ID validation on `/books/:id`, returning HTTP 400 for malformed IDs and HTTP 404 for non-existent IDs.
* **Automated Verification:** Create and execute automated API and integration tests using Node.js's native test runner (`node:test`) with zero external test dependencies.
* **Practical Examination Suitability:** Provide a clean, beginner-friendly single-server setup ready for college practical evaluation.

---

## 4. Key Features

### Frontend (Client-Side)
* **Literary Aesthetic:** Warm cream background (`#FAF7F2`), forest-navy borders/text (`#1A2E26`, `#0F231C`), and warm amber-gold accents (`#D97706`).
* **Responsive Layout:** Engineered with CSS Flexbox and CSS Grid, fully tested across desktops, tablets, and smartphones.
* **Fixed Navigation Bar:** Sticky header with BookNest logo, smooth-scroll links, active link scroll tracking, and an accessible mobile hamburger drawer.
* **Hero Section:** Displays *"Discover Your Next Great Read"*, descriptive narrative, quick navigation button, and prominent search bar.
* **Real-Time Title Search:**
  * Search input with Enter key support.
  * Case-insensitive, partial-title matching.
  * Real-time search button & clear (✕) button.
  * Dynamic result counter (e.g., *"Showing all 10 books in collection"* or *"Found 1 book matching 'clean'"*).
  * Graceful empty state (*"No books found. Try another title."*) with a *"Reset Search"* button.
* **Dynamic Catalog Grid:** Automatically renders book cards with cover graphics, genre badges, IDs, titles, authors, Indian Rupee prices, and descriptions.
* **Accessible Book Details Modal:**
  * Opens when clicking *"View Details"* on any card.
  * Calls `GET /books/:id` to fetch fresh individual book data.
  * Displays complete metadata: cover, title, author, price, category, full description, pages, and star rating.
  * Closes via close button, clicking the backdrop, or pressing the <kbd>Escape</kbd> key.
  * Restores keyboard focus back to the triggering *"View Details"* button upon closing.
* **Fallback Asset Handling:** Gracefully handles missing book cover images with a standalone vector graphic (`assets/book-cover-placeholder.svg`).

### Backend (Server-Side REST API)
* **Single Express Server:** Serves static frontend assets and REST API endpoints from a single Node.js process.
* **`GET /books` Endpoint:** Returns all 10 books with numeric prices, INR currency, categories, and descriptions in valid JSON.
* **`GET /books/:id` Endpoint:** Validates that the requested ID is a positive integer. Returns HTTP 200 on success, HTTP 400 for non-numeric/decimal/zero/negative IDs, and HTTP 404 if the ID is not in the catalog.
* **`GET /health` Endpoint:** Confirms server health, uptime, and current timestamp.
* **Centralized Error Handling:** 404 handler for unknown API routes and centralized 500 middleware to prevent stack trace leaks.

---

## 5. Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Markup** | HTML5 | Semantic structure, accessible landmarks, modal dialog |
| **Frontend Styling** | CSS3 (Flexbox & Grid) | Literary theme, responsive grid, modal styling, transitions |
| **Frontend Scripting** | Vanilla JavaScript (ES6+) | `fetch()` API calls, dynamic DOM rendering, title search |
| **Backend Runtime** | Node.js (v18+ / v24.x) | High-performance asynchronous JavaScript engine |
| **Backend Framework** | Express.js (v4.21.x) | Static file hosting and RESTful routing |
| **Data Protocol** | JSON | Structured client-server payloads |
| **Testing Runner** | `node:test` & `node:assert/strict` | Automated unit, integration, and API testing |

---

## 6. Project Folder Structure

```text
booknest/
│
├── public/                     # Static frontend assets served by Express
│   ├── index.html              # Main HTML5 layout & accessible modal
│   ├── style.css               # Literary cream & navy responsive stylesheet
│   ├── script.js               # Dynamic API fetch, title search, and modal handling
│   └── assets/                 # Standalone SVG illustrations and logos
│       ├── logo.svg
│       ├── hero-books.svg
│       └── book-cover-placeholder.svg
│
├── data/                       # Backend data source
│   └── books.js                # Centralized dataset of 10 curated books
│
├── tests/                      # Automated test suite
│   └── api.test.js             # 19 automated tests using node:test
│
├── server.js                   # Express.js server & REST API endpoints
├── package.json                # Project dependencies, scripts, and metadata
├── .gitignore                  # Git ignore rules for node_modules and logs
└── README.md                   # Comprehensive 22-section documentation
```

---

## 7. Sample Book Catalog

| ID | Title | Author | Category | Price (INR) | Pages |
|---|---|---|---|---|---|
| **1** | The Alchemist | Paulo Coelho | Fiction | ₹399 | 208 |
| **2** | Atomic Habits | James Clear | Self-Help | ₹499 | 320 |
| **3** | Clean Code | Robert C. Martin | Programming | ₹650 | 464 |
| **4** | Rich Dad Poor Dad | Robert T. Kiyosaki | Finance | ₹350 | 336 |
| **5** | Harry Potter and the Philosopher's Stone | J. K. Rowling | Fantasy | ₹450 | 352 |
| **6** | The Psychology of Money | Morgan Housel | Finance | ₹420 | 256 |
| **7** | Deep Work | Cal Newport | Productivity | ₹380 | 304 |
| **8** | Ikigai | Héctor García & Francesc Miralles | Self-Help | ₹299 | 208 |
| **9** | Introduction to Algorithms | Thomas H. Cormen et al. | Computer Science | ₹899 | 1312 |
| **10** | Think and Grow Rich | Napoleon Hill | Personal Development | ₹320 | 238 |

---

## 8. Installation Requirements
* **Node.js:** v18.0.0 or later (Tested on Node.js v24.20.0).
* **npm:** v9.0.0 or later (Tested on npm v12.0.2).
* **Modern Web Browser:** Chrome, Edge, Firefox, or Safari.

Verify versions:
```bash
node -v
npm -v
```

---

## 9. Dependency Installation Commands

Navigate to the `booknest` directory and install the lightweight Express dependency:
```bash
cd "booknest"
npm install
```

---

## 10. Application Startup Commands

To start the BookNest application:
```bash
npm start
```

Console confirmation:
```text
====================================================
📚 BookNest - Online Bookstore Server Running!
📍 Website URL:     http://localhost:3000
📖 Books API:       http://localhost:3000/books
🔍 Book Detail API: http://localhost:3000/books/1
🩺 Health API:      http://localhost:3000/health
====================================================
```

*(Note: If port 3000 is occupied by another process, you can configure another port: `$env:PORT=5000; npm start` in PowerShell or `PORT=5000 npm start` in Linux/macOS).*

---

## 11. Website URL
Open your web browser and navigate to:
```text
http://localhost:3000
```

---

## 12. REST API Documentation & Endpoints

| Endpoint | Method | Description | Status Code |
|---|---|---|---|
| `/books` | `GET` | Retrieves all 10 books in JSON format | `200 OK` |
| `/books/:id` | `GET` | Retrieves single book by numeric ID | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `/health` | `GET` | Server health status, uptime, and timestamp | `200 OK` |

---

## 13. Example JSON Responses

### A. `GET /books` (All Books)
**Response (HTTP 200 OK):**
```json
{
  "success": true,
  "count": 10,
  "books": [
    {
      "id": 1,
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "price": 399,
      "currency": "INR",
      "category": "Fiction",
      "description": "A philosophical novel about following dreams and discovering one's personal journey.",
      "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
      "pages": 208,
      "rating": 4.8
    },
    {
      "id": 2,
      "title": "Atomic Habits",
      "author": "James Clear",
      "price": 499,
      "currency": "INR",
      "category": "Self-Help",
      "description": "A practical guide to building good habits and improving behavior through small changes.",
      "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "pages": 320,
      "rating": 4.9
    }
  ]
}
```

### B. `GET /books/:id` (Individual Book)
**Example 1: `GET /books/1` (HTTP 200 OK):**
```json
{
  "success": true,
  "book": {
    "id": 1,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 399,
    "currency": "INR",
    "category": "Fiction",
    "description": "A philosophical novel about following dreams and discovering one's personal journey.",
    "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    "pages": 208,
    "rating": 4.8
  }
}
```

**Example 2: `GET /books/999` (HTTP 404 Not Found):**
```json
{
  "success": false,
  "message": "Book not found."
}
```

**Example 3: `GET /books/abc` (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid book ID. Please provide a positive integer."
}
```

### C. `GET /health` (Server Health)
**Response (HTTP 200 OK):**
```json
{
  "status": "ok",
  "message": "BookNest API is running smoothly",
  "uptime": 234,
  "timestamp": "2026-10-15T07:30:00.000Z"
}
```

---

## 14. Search Functionality Explanation

The search feature allows users to filter books by title dynamically:
1. **Source of Truth:** Books are retrieved once via `GET /books` on page load and cached in frontend memory (`cachedBooks`).
2. **Normalization:** User input is normalized using `.trim().toLowerCase()`.
3. **Partial Matching:** The filter evaluates whether `book.title.toLowerCase().includes(normalizedQuery)`.
4. **Instant Response:** Triggers as the user types or presses <kbd>Enter</kbd>.
5. **Live Counter:** Updates the header text (e.g., *"Found 1 book matching 'clean'"*).
6. **Graceful Restoration:** An empty query or clicking the clear (✕) button instantly restores all 10 books.
7. **No Extra Network Calls:** Searches operate efficiently on the loaded client dataset without unnecessary server requests.

---

## 15. Individual Book Details Modal Explanation

When a user clicks *"View Details"* on any book card:
1. **API Call:** The frontend captures the book ID and requests `GET /books/:id` from the backend.
2. **Loading State:** An animated spinner is shown while the HTTP call completes.
3. **Data Population:** The modal safely populates title, author, price formatted in INR, pages, star rating, and complete synopsis.
4. **Accessibility:**
   * Overlay has `role="dialog"` and `aria-modal="true"`.
   * Automatically moves focus to the close button.
   * Pressing <kbd>Escape</kbd> or clicking the background closes the modal.
   * Closing the modal restores focus to the triggering *"View Details"* button.

---

## 16. Automated Testing Instructions

The project includes 19 automated tests covering 5 test suites.

To run the automated tests:
```bash
npm test
```
Or directly:
```bash
node --test tests/api.test.js
```

### Actual Automated Test Results:
```text
▶ TEST SUITE 1: GET /books Endpoint
  ✔ should return HTTP 200 and Content-Type application/json (184.83ms)
  ✔ should return valid JSON with success=true and count=10 (19.44ms)
  ✔ should verify every book contains all required properties (17.38ms)
  ✔ should verify sample titles match the 10 required books (6.66ms)
✔ TEST SUITE 1: GET /books Endpoint (230.37ms)

▶ TEST SUITE 2: GET /books/:id Endpoint
  ✔ should return HTTP 200 and The Alchemist for GET /books/1 (8.54ms)
  ✔ should return HTTP 200 and Clean Code for GET /books/3 (6.30ms)
  ✔ should return HTTP 200 and Think and Grow Rich for GET /books/10 (5.24ms)
  ✔ should return HTTP 404 for an unknown positive integer ID (e.g. 999) (16.42ms)
  ✔ should return HTTP 400 for a nonnumeric ID (e.g. abc) (6.89ms)
  ✔ should return HTTP 400 for a decimal ID (e.g. 1.5) (7.89ms)
  ✔ should return HTTP 400 for zero ID (e.g. 0) (7.97ms)
  ✔ should return HTTP 400 for negative ID (e.g. -5) (6.60ms)
✔ TEST SUITE 2: GET /books/:id Endpoint (68.10ms)

▶ TEST SUITE 3: GET /health Endpoint
  ✔ should return HTTP 200, valid JSON and healthy server status (5.33ms)
✔ TEST SUITE 3: GET /health Endpoint (6.05ms)

▶ TEST SUITE 4: Frontend Integration & Static Assets
  ✔ should serve index.html with HTTP 200 and text/html (14.38ms)
  ✔ should serve style.css with HTTP 200 and text/css (6.92ms)
  ✔ should serve script.js with HTTP 200 and javascript mime type (6.91ms)
  ✔ should serve local SVG fallback and illustration assets (28.95ms)
✔ TEST SUITE 4: Frontend Integration & Static Assets (58.47ms)

▶ TEST SUITE 5: Error Handling & Security
  ✔ should return HTTP 404 JSON for unknown API routes (10.13ms)
  ✔ should not leak internal server stack traces to users in error responses (8.47ms)
✔ TEST SUITE 5: Error Handling & Security (19.53ms)

----------------------------------------------------
ℹ tests: 19
ℹ suites: 5
ℹ pass: 19
ℹ fail: 0
ℹ cancelled: 0
ℹ skipped: 0
ℹ todo: 0
----------------------------------------------------
```

---

## 17. Manual Testing Checklist

Follow these steps during viva and practical examination:

### TEST A: Homepage & Responsiveness
1. Start the server (`npm start`) and open `http://localhost:3000`.
2. Confirm the BookNest logo, literary tagline, and hero banner render correctly.
3. Verify that all 10 books appear in the catalog with titles, authors, categories, and prices in INR (`₹`).
4. Resize the browser window to test the responsive mobile grid and hamburger menu.

### TEST B: Title Search Verification
1. Type `"atomic"` in the search input: confirm **Atomic Habits** appears.
2. Type `"CLEAN"`: confirm **Clean Code** appears (tests case-insensitivity).
3. Type `"harry"`: confirm **Harry Potter and the Philosopher's Stone** appears (tests partial match).
4. Type `"xyz-not-a-book"`: confirm the friendly empty state (*"No books found. Try another title."*) appears.
5. Click **Clear** (✕) or **Reset Search**: confirm all 10 books are restored.

### TEST C: Individual Book Details Modal
1. Click **View Details** on **The Alchemist**.
2. Verify the modal opens and displays title, author, price (`₹399`), pages (`208 pages`), rating (`⭐ 4.8 / 5`), and synopsis.
3. Press the <kbd>Escape</kbd> key or click ✕ to close the modal.
4. Verify keyboard focus is restored to the button you clicked.

### TEST D: Catalog API (`GET /books`)
1. Open `http://localhost:3000/books` in your browser.
2. Confirm valid JSON with `success: true`, `count: 10`, and an array of 10 books.

### TEST E: Individual Book API (`GET /books/:id`)
1. Open `http://localhost:3000/books/1`: confirm **The Alchemist** is returned with status 200.
2. Open `http://localhost:3000/books/3`: confirm **Clean Code** is returned with status 200.
3. Open `http://localhost:3000/books/999`: confirm HTTP 404 (*"Book not found."*).
4. Open `http://localhost:3000/books/abc`: confirm HTTP 400 (*"Invalid book ID. Please provide a positive integer."*).

---

## 18. cURL & PowerShell Testing Examples

### cURL Commands (Bash / Linux / macOS / Windows Terminal)
```bash
# 1. Retrieve all books
curl http://localhost:3000/books

# 2. Retrieve book by ID
curl http://localhost:3000/books/1

# 3. Retrieve another book
curl http://localhost:3000/books/3

# 4. Test non-existent book (HTTP 404)
curl -i http://localhost:3000/books/999

# 5. Test invalid book ID (HTTP 400)
curl -i http://localhost:3000/books/abc

# 6. Check server health
curl http://localhost:3000/health
```

### Windows PowerShell Commands
```powershell
# 1. Retrieve all books
Invoke-RestMethod -Uri "http://localhost:3000/books" -Method Get

# 2. Retrieve book by ID
Invoke-RestMethod -Uri "http://localhost:3000/books/1" -Method Get

# 3. Retrieve another book
Invoke-RestMethod -Uri "http://localhost:3000/books/3" -Method Get

# 4. Check server health
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
```

---

## 19. Known Limitations
* **Static In-Memory Catalog:** The catalog is stored centrally in a JavaScript data module (`data/books.js`) to fulfill the beginner-level college assignment guidelines without database dependencies.
* **No User Authentication/Cart:** Focuses on catalog browsing, title search, and individual book inspection as requested by the assignment scope.

---

## 20. Potential Future Improvements
* **Persistent Database:** Integrate SQLite, PostgreSQL, or MongoDB for permanent book catalog management and inventory updates.
* **Shopping Cart & Checkout:** Add a shopping cart state with simulated order placement.
* **Multi-Filter Queries:** Expand filtering by category, price ranges, and author in combination with title search.

