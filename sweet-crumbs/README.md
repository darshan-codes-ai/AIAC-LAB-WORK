# Sweet Crumbs – Online Bakery Website

> **College Assignment:** Task 1 – Improve Readability, Set 1: Online Bakery Website  
> **Course:** Full-Stack Web Development Practical Examination  
> **Author:** College Student  
> **Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js, REST API, Node.js Built-in Test Runner  

---

## 1. Project Title
**Sweet Crumbs – Online Bakery Website & REST API**

---

## 2. Project Overview
**Sweet Crumbs** is a complete, fully functional, responsive web application built for an artisan bakery. The platform provides a seamless digital storefront where customers can explore handcrafted bakery treats (such as artisanal cakes, golden croissants, fresh muffins, and chocolate chip cookies), view accurate Indian Rupee (₹) pricing, and submit catering or order enquiries through an interactive, validated contact form.

Under the hood, Sweet Crumbs is powered by a **Node.js and Express.js REST API**. The frontend dynamically retrieves product records via HTTP `GET /products` and handles customer submissions via HTTP `POST /enquiries`. Built without heavyweight frontend or backend frameworks, the project highlights clean architecture, semantic code readability, robust client/server validation, and zero-dependency automated testing.

---

## 3. Objectives
* Build a responsive, accessible frontend with a warm bakery-inspired aesthetic (cream, chocolate brown, pastel pink).
* Develop a lightweight Express.js REST API providing `GET /products`, `GET /health`, and `POST /enquiries`.
* Integrate frontend and backend seamlessly: dynamically render bakery products and submit enquiries without page refreshes.
* Provide reliable fallback mechanisms so product images display gracefully even when offline or behind restricted college proxy firewalls.
* Establish automated API test coverage using the native Node.js test runner (`node:test`).
* Maintain clean documentation suitable for university practical demonstrations and viva examinations.

---

## 4. Key Features

### Frontend (Client-Side)
* **Warm Bakery Aesthetic:** Curated color palette combining fresh cream (`#FFFDF9`), rich cocoa brown (`#3E2114`), and soft pastel rose (`#FFCCD5`).
* **Responsive Layout:** Fluid CSS Grid and Flexbox layouts designed for desktop monitors, laptops, tablets, and smartphones.
* **Sticky Navigation Bar:** Includes a responsive hamburger menu for mobile devices, smooth scrolling anchors, and active section tracking.
* **Hero Section:** Features the signature heading *"Freshly Baked Happiness, Every Day!"*, descriptive intro, call-to-action buttons, trust indicators, and bakery badge graphics.
* **Dynamic Products Catalog:** Fetches records from the backend API, generates interactive product cards, and formats prices into Indian Rupees (`₹`).
* **Category Filtering:** Filter items by Cakes, Pastries, Muffins, Cupcakes, Cheesecakes, and Cookies.
* **Resilient Image Fallback:** High-resolution photography coupled with inline `onerror` fallback to local standalone SVG assets.
* **Interactive Enquiry Pre-fill:** Clicking *"Enquire Now"* on any product card pre-selects that item in the contact form and scrolls smoothly to the enquiry section.
* **Validated Contact Form:** Real-time and submit-time input validation, custom error messages, duplicate submission prevention (button lock and spinner), and accessible success alerts.

### Backend (Server-Side REST API)
* **Express.js Architecture:** Lightweight, robust HTTP server serving static frontend assets and REST API endpoints simultaneously.
* **`GET /products` Endpoint:** Returns all 8 bakery items in valid JSON format with status 200.
* **`GET /health` Endpoint:** Returns operational status, system uptime, and server timestamp.
* **`POST /enquiries` Endpoint:** Validates incoming payloads, checks required fields and email formats, returning HTTP 201 for success or HTTP 400 for errors.
* **`GET /enquiries` Endpoint:** Helper inspection route returning current in-memory enquiries for grading and testing verification.
* **Graceful Error Handling:** Centralized error-handling middleware preventing stack trace leakage to the client.

---

## 5. Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Markup** | HTML5 | Semantic structure, accessible landmarks, form inputs |
| **Frontend Styling** | CSS3 (Flexbox & Grid) | Responsive layouts, animations, transitions, custom variables |
| **Frontend Scripting** | Vanilla JavaScript (ES6+) | DOM manipulation, `fetch()` API calls, form validation |
| **Backend Runtime** | Node.js (v24.x) | High-performance asynchronous JavaScript engine |
| **Backend Framework** | Express.js (v4.21.x) | Static file hosting and RESTful routing |
| **Data Format** | JSON | Structured client-server payload communication |
| **Testing Runner** | `node:test` & `node:assert/strict` | Automated API and integration unit tests |

---

## 6. Project Folder Structure

```text
sweet-crumbs/
│
├── public/                     # Static frontend assets served by Express
│   ├── index.html              # Main HTML5 webpage
│   ├── style.css               # Responsive bakery stylesheet (Flexbox/Grid)
│   ├── script.js               # Client-side dynamic rendering & API fetch
│   └── assets/                 # Local SVG vector illustrations & fallbacks
│       ├── bakery-logo.svg
│       ├── hero-bakery.svg
│       ├── chocolate-cake.svg
│       ├── red-velvet-cake.svg
│       ├── butter-croissant.svg
│       ├── blueberry-muffin.svg
│       ├── chocolate-cupcake.svg
│       ├── strawberry-cheesecake.svg
│       ├── cinnamon-roll.svg
│       ├── chocolate-chip-cookies.svg
│       └── fallback.svg
│
├── data/                       # Backend data source
│   └── products.js             # 8 bakery items with prices in INR & image links
│
├── tests/                      # Automated test suite
│   └── api.test.js             # Node.js built-in API & integration tests
│
├── server.js                   # Main Express application entry point
├── package.json                # Project dependencies, scripts, and metadata
├── .gitignore                  # Git exclusions (node_modules, logs, etc.)
└── README.md                   # Comprehensive documentation
```

---

## 7. Installation Requirements
To run and test this project locally, make sure you have:
* **Node.js:** v18.0.0 or later (Tested on Node.js v24.20.0).
* **npm:** v9.0.0 or later (Tested on npm v12.0.2).
* **Modern Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

Check your installed versions by running:
```bash
node -v
npm -v
```

---

## 8. Installation Instructions
Follow these steps to set up the project on your machine:

1. Open your terminal or PowerShell console.
2. Navigate to the `sweet-crumbs` directory:
   ```bash
   cd sweet-crumbs
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

---

## 9. Commands to Install Dependencies
Inside the `sweet-crumbs` folder, execute:
```bash
npm install
```
This installs `express` (v4.21.x). No other third-party dependencies or databases are required.

---

## 10. Commands to Start the Application
To launch the Sweet Crumbs web server:
```bash
npm start
```
You will see the console confirmation:
```text
====================================================
🥐 Sweet Crumbs Bakery Server Running!
📍 Website URL:   http://localhost:3000
📦 Products API:  http://localhost:3000/products
🩺 Health API:    http://localhost:3000/health
✉️  Enquiries API: http://localhost:3000/enquiries
====================================================
```

*(To run the server on a custom port, pass `PORT=8080 npm start` or `$env:PORT=8080; npm start` in PowerShell).*

---

## 11. Website URL
Once the application is running, open your web browser and navigate to:
```text
http://localhost:3000
```

---

## 12. API Endpoint URLs

| HTTP Method | Route | Description | Expected Status |
|---|---|---|---|
| `GET` | `/products` | Retrieves all 8 bakery products in JSON format | `200 OK` |
| `GET` | `/products/:id` | Retrieves a single product by numeric ID | `200 OK` / `404 Not Found` |
| `GET` | `/health` | Health check endpoint for uptime and monitoring | `200 OK` |
| `POST` | `/enquiries` | Submits a customer contact enquiry | `201 Created` / `400 Bad Request` |
| `GET` | `/enquiries` | Helper route listing in-memory enquiries | `200 OK` |

---

## 13. Example `GET /products` Response

**Request:**
```http
GET /products HTTP/1.1
Host: localhost:3000
Accept: application/json
```

**Response (HTTP 200 OK):**
```json
{
  "success": true,
  "count": 8,
  "products": [
    {
      "id": 1,
      "name": "Chocolate Cake",
      "description": "Decadent multi-layered Belgian chocolate sponge infused with rich fudge ganache and cocoa nibs.",
      "price": 550,
      "currency": "INR",
      "category": "Cakes",
      "badge": "Bestseller",
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/chocolate-cake.svg"
    },
    {
      "id": 2,
      "name": "Red Velvet Cake",
      "description": "Vibrant crimson velvet sponge layered with silky smooth cream cheese frosting and subtle vanilla notes.",
      "price": 650,
      "currency": "INR",
      "category": "Cakes",
      "badge": "Chef's Special",
      "image": "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/red-velvet-cake.svg"
    },
    {
      "id": 3,
      "name": "Butter Croissant",
      "description": "Authentic golden French puff pastry laminated with 100% pure churned butter for maximum flakiness.",
      "price": 120,
      "currency": "INR",
      "category": "Pastries",
      "badge": "Fresh Baked",
      "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/butter-croissant.svg"
    },
    {
      "id": 4,
      "name": "Blueberry Muffin",
      "description": "Moist bakery-style muffin bursting with plump wild blueberries and crowned with golden sugar crystals.",
      "price": 90,
      "currency": "INR",
      "category": "Muffins",
      "badge": "Popular",
      "image": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/blueberry-muffin.svg"
    },
    {
      "id": 5,
      "name": "Chocolate Cupcake",
      "description": "Fluffy Dutch cocoa cupcake topped with an artisanal swirl of dark chocolate buttercream and sprinkles.",
      "price": 80,
      "currency": "INR",
      "category": "Cupcakes",
      "badge": "Kid's Favorite",
      "image": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/chocolate-cupcake.svg"
    },
    {
      "id": 6,
      "name": "Strawberry Cheesecake",
      "description": "Velvety New York style baked cheesecake on buttery graham crust with sweet organic strawberry compote.",
      "price": 180,
      "currency": "INR",
      "category": "Cheesecakes",
      "badge": "Recommended",
      "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/strawberry-cheesecake.svg"
    },
    {
      "id": 7,
      "name": "Cinnamon Roll",
      "description": "Warm, pillowy dough swirled with aromatic Korintje cinnamon, brown sugar, and dripping cream cheese glaze.",
      "price": 110,
      "currency": "INR",
      "category": "Pastries",
      "badge": "Morning Favorite",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/cinnamon-roll.svg"
    },
    {
      "id": 8,
      "name": "Chocolate Chip Cookies",
      "description": "Crispy golden perimeter with a tender chewy heart, loaded with generous melted Belgian chocolate chips.",
      "price": 150,
      "currency": "INR",
      "category": "Cookies",
      "badge": "Must Try",
      "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "fallbackImage": "/assets/chocolate-chip-cookies.svg"
    }
  ]
}
```

---

## 14. API Testing Guide (Browser, cURL, Postman)

### A. Testing via Web Browser
Simply enter these URLs in any browser address bar:
* View Products: `http://localhost:3000/products`
* Check Server Health: `http://localhost:3000/health`
* View Stored Enquiries: `http://localhost:3000/enquiries`

### B. Testing via cURL

**1. Test GET /products:**
```bash
curl -X GET http://localhost:3000/products
```

**2. Test GET /health:**
```bash
curl -X GET http://localhost:3000/health
```

**3. Test POST /enquiries (Valid Submission):**
```bash
curl -X POST http://localhost:3000/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohan Verma",
    "email": "rohan@example.com",
    "phone": "+91 9876543210",
    "productOfInterest": "Chocolate Cake",
    "message": "Need pricing for a 2kg birthday cake."
  }'
```

**4. Test POST /enquiries (Validation Error Test):**
```bash
curl -X POST http://localhost:3000/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email",
    "message": ""
  }'
```
*Expected output: HTTP 400 Bad Request with descriptive error array.*

### C. Testing via Postman
1. Set request method to `GET` and URL to `http://localhost:3000/products`. Click **Send**.
2. Set request method to `POST` and URL to `http://localhost:3000/enquiries`.
3. In the **Body** tab, choose **raw** and set the format to **JSON**.
4. Enter the JSON payload and click **Send**. Inspect the status `201 Created` and response body.

---

## 15. Instructions for Running Automated Tests
The project includes automated API and integration tests using Node.js's native test runner (`node:test`).

To run the test suite, run:
```bash
npm test
```
Or directly:
```bash
node --test tests/api.test.js
```

---

## 16. Contact Form Functionality
The enquiry form allows customers to connect with Sweet Crumbs.
* **Fields:**
  * `Full Name` *(Required, min 2 chars)*
  * `Email Address` *(Required, verified with email regex)*
  * `Phone Number` *(Optional, verified for 7-15 digits if provided)*
  * `Product of Interest` *(Optional dropdown, automatically pre-selected when clicking "Enquire Now" on product cards)*
  * `Message` *(Required, min 5 chars)*
* **Frontend Handling:**
  * Prevents standard browser page reload using `event.preventDefault()`.
  * Displays inline field errors if validation fails.
  * Disables the submit button and shows an animated spinner to prevent accidental double-clicks.
  * Resets the form upon receiving a `201 Created` response.
  * Displays a green success banner alerting the user that the enquiry was logged.

---

## 17. Limitations & Technical Notes
* **In-Memory Enquiry Storage:** In accordance with the beginner-level college assignment guidelines, enquiries are stored in a JavaScript RAM array (`enquiries = []`) on the Express server.
* **Restart Reset:** When the server restarts or crashes, stored enquiries are cleared.
* **No Database/Auth Bloat:** The assignment purposefully avoids external database engines (MongoDB/SQL), authentication libraries, or payment gateways to ensure maximum readability and portability.

---

## 18. Expected Automated Testing Results

When executing `npm test`, you should see 14 tests across 5 test suites pass successfully:

```text
▶ TEST 1: GET /products REST API
  ✔ should return HTTP 200 OK and Content-Type application/json
  ✔ should return valid JSON with success=true and count=8
  ✔ should verify each product contains id, name, description, price, and image
  ✔ should verify product names match the 8 sample bakery products
✔ TEST 1: GET /products REST API

▶ TEST 2: GET /health Endpoint
  ✔ should return HTTP 200 OK and health confirmation JSON
✔ TEST 2: GET /health Endpoint

▶ TEST 3: POST /enquiries Customer Enquiries
  ✔ should accept a valid enquiry and return HTTP 201 Created
  ✔ should reject requests with missing name and return HTTP 400
  ✔ should reject requests with invalid email and return HTTP 400
  ✔ should reject requests with missing message and return HTTP 400
✔ TEST 3: POST /enquiries Customer Enquiries

▶ TEST 4: Frontend Integration & Static Files
  ✔ should serve index.html with HTTP 200 and text/html
  ✔ should serve style.css with HTTP 200 and text/css
  ✔ should serve script.js with HTTP 200 and javascript mime type
  ✔ should serve local SVG fallback assets
✔ TEST 4: Frontend Integration & Static Files

▶ TEST 5: Server Error Handling
  ✔ should return HTTP 404 JSON for unmatched API routes
✔ TEST 5: Server Error Handling

ℹ tests 14
ℹ suites 5
ℹ pass 14
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

---

## Practical Examination Viva / Demonstration Checklist
* [x] **Responsive UI:** Tested on desktop and mobile viewports.
* [x] **Bakery Theme:** Cream, chocolate brown, and pastel pink aesthetics applied.
* [x] **8 Products:** All 8 items rendered dynamically from API.
* [x] **Indian Rupee Formatting:** Prices displayed with `₹` symbol (e.g., ₹550, ₹650, ₹120).
* [x] **API Endpoints:** `GET /products`, `GET /health`, `POST /enquiries` fully operational.
* [x] **Validation:** Both client-side and server-side validation active.
* [x] **Error Handling:** Graceful offline image fallback & friendly error alerts with retry button.
* [x] **Automated Tests:** 14 automated unit and integration tests passing.

