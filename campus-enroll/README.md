# CampusEnroll – Student Course Registration System

> **College Assignment:** Set 2 – Student Course Registration Website  
> **Course:** Full-Stack Web Development Practical Examination  
> **Author:** College Student  
> **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), Node.js, Express.js, REST API, Node.js Native Test Runner  

---

## 1. Project Title
**CampusEnroll – Student Course Registration System & REST API**

---

## 2. Project Overview
**CampusEnroll** is a complete, fully functional, responsive web application designed for higher education students to explore college curriculum tracks and register for academic and professional courses online. 

The application is built using a modern **Node.js and Express.js REST API** backend coupled with a semantic **HTML5, CSS3, and Vanilla JavaScript** frontend. The frontend dynamically retrieves course offerings through the `GET /courses` endpoint and submits student registrations via `POST /registrations`. The design incorporates an academic navy blue, white, and cyan theme, responsive CSS Flexbox and Grid layouts, robust client- and server-side validation, duplicate submission protection, and comprehensive automated test suites using the native Node.js test runner (`node:test`).

---

## 3. Assignment Objectives
* **Course Exploration:** Present 8 diverse engineering and computing courses with descriptions, durations, categories, and tuition fees formatted in Indian Rupees (₹).
* **Dynamic API Integration:** Load course catalogs from the backend REST API rather than hardcoding duplicates in client-side scripts.
* **Streamlined Registration:** Provide an interactive registration form with automatic course pre-selection when a student clicks *"Register for This Course"*.
* **Comprehensive Validation:** Enforce strict validation rules on both frontend and backend for names, student IDs, email addresses, phone numbers, courses, academic departments, and study years.
* **REST API Endpoints:** Deliver `GET /courses`, `POST /registrations`, and `GET /health` with standardized JSON responses and HTTP status codes.
* **Automated Testing:** Execute 21 automated unit and integration tests with zero external test runners.
* **College Practical Suitability:** Simple single-server architecture, zero database/auth bloat, and clear setup documentation.

---

## 4. Key Features

### Frontend (Client-Side)
* **Academic Visual Design:** Professional aesthetic utilizing dark navy (`#0B1F36`, `#0F2B48`), crisp white, and cyan accents (`#0EA5E9`, `#38BDF8`).
* **Responsive Layout:** Fluid layout across desktops, laptops, tablets, and mobile devices using CSS Flexbox and CSS Grid.
* **Sticky Navigation Bar:** Features CampusEnroll branding, smooth-scrolling anchors, scroll-spy link tracking, and a mobile drawer menu with ARIA accessibility.
* **Hero Section:** Features the title *"Build Your Future with the Right Course"*, descriptive overview, quick action buttons, key metrics, and custom SVG educational graphics.
* **Dynamic Courses Grid:** Fetches from `GET /courses`, renders responsive cards with icons, duration tags, INR pricing, and *"Register for This Course"* action buttons.
* **Category Filtering:** Filter courses instantly by *All Courses*, *Programming*, *Data Science*, *AI*, *Cloud*, *Cybersecurity*, *Databases*, and *App Dev*.
* **Interactive Course Pre-Selection:** Clicking *"Register for This Course"* on any card automatically populates the dropdown in the registration form and scrolls smoothly to it.
* **Real-Time & Submit Form Validation:** Immediate visual feedback with inline field error alerts, input border highlights, and character count counters.
* **Duplicate Submission Prevention:** Disables the submit button and shows an animated spinner while HTTP requests are in flight.
* **Accessible Alert Banners:** Displays a registration receipt banner upon success with the generated Registration ID, student name, and course title.

### Backend (Server-Side REST API)
* **Single Express Server:** Hosts static frontend assets and REST API endpoints simultaneously from a single process.
* **`GET /courses`:** Returns all 8 courses with numeric fees, INR currency, categories, and durations in valid JSON.
* **`POST /registrations`:** Validates incoming payloads, ensures course IDs exist in the curriculum, generates unique registration IDs (`REG-1001-XXXX`), and stores records in server memory.
* **`GET /health`:** Confirms server operational health, uptime, and timestamp.
* **`GET /registrations`:** Demonstration endpoint allowing examiners to view registrations currently stored in server RAM.
* **Error Handling Middleware:** Gracefully handles malformed JSON requests (HTTP 400), non-existent API routes (HTTP 404), and unhandled server errors (HTTP 500) without exposing internal stack traces.

---

## 5. Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Markup** | HTML5 | Semantic landmarks, accessible form controls, ARIA tags |
| **Frontend Styling** | CSS3 (Flexbox & Grid) | Academic navy palette, responsive layouts, hover animations |
| **Frontend Scripting** | Vanilla JavaScript (ES6+) | `fetch()` API calls, dynamic DOM rendering, client-side validation |
| **Backend Runtime** | Node.js (v18+ / v24.x) | Fast, non-blocking asynchronous JavaScript runtime |
| **Backend Framework** | Express.js (v4.21.x) | Static hosting and RESTful routing |
| **Data Protocol** | JSON | Structured client-server payloads |
| **Test Runner** | `node:test` & `node:assert/strict` | Automated unit, integration, and API testing |

---

## 6. Project Folder Structure

```text
campus-enroll/
│
├── public/                     # Static frontend assets served by Express
│   ├── index.html              # Main HTML5 webpage
│   ├── style.css               # Responsive academic stylesheet (Flexbox/Grid)
│   ├── script.js               # Dynamic API fetch, rendering, and validation
│   └── assets/                 # Standalone SVG illustrations and logos
│       ├── campus-logo.svg
│       └── education-illustration.svg
│
├── data/                       # Backend data source
│   └── courses.js              # 8 sample engineering & computing courses
│
├── tests/                      # Automated test suite
│   └── api.test.js             # 21 automated tests using node:test
│
├── server.js                   # Express.js server & REST API endpoints
├── package.json                # Project dependencies, scripts, and metadata
├── .gitignore                  # Git ignore rules for node_modules and logs
└── README.md                   # Comprehensive project documentation
```

---

## 7. Sample Course Catalog

| ID | Title | Category | Duration | Fee (INR) | Description |
|---|---|---|---|---|---|
| **101** | Web Development | Programming | 12 weeks | ₹8,000 | Learn HTML, CSS, JavaScript, and responsive website development. |
| **102** | Python Programming | Programming | 10 weeks | ₹6,000 | Learn Python fundamentals, functions, data structures, and problem-solving. |
| **103** | Data Science Fundamentals | Data Science | 16 weeks | ₹12,000 | Explore data analysis, statistics, data visualization, and introductory machine learning. |
| **104** | Artificial Intelligence | Artificial Intelligence | 16 weeks | ₹15,000 | Understand AI fundamentals, intelligent systems, and introductory machine learning techniques. |
| **105** | Cloud Computing | Cloud Computing | 12 weeks | ₹10,000 | Learn cloud fundamentals, virtual machines, storage, and cloud deployment concepts. |
| **106** | Cybersecurity Basics | Cybersecurity | 10 weeks | ₹7,000 | Understand network security, common threats, and essential security practices. |
| **107** | Database Management Systems | Databases | 8 weeks | ₹5,000 | Learn relational databases, SQL queries, database design, and normalization. |
| **108** | Mobile App Development | App Development | 14 weeks | ₹11,000 | Learn the fundamentals of mobile application design and development. |

---

## 8. Installation Requirements
* **Node.js:** v18.0.0 or later (Tested on Node.js v24.20.0).
* **npm:** v9.0.0 or later (Tested on npm v12.0.2).
* **Modern Browser:** Chrome, Edge, Firefox, or Safari.

Check your installed runtime:
```bash
node -v
npm -v
```

---

## 9. Installation Instructions

1. Open PowerShell or terminal in the project directory:
   ```bash
   cd "campus-enroll"
   ```
2. Install the lightweight Express dependency:
   ```bash
   npm install
   ```

---

## 10. How to Start the Application
To launch the server:
```bash
npm start
```

Console confirmation:
```text
====================================================
🎓 CampusEnroll - Course Registration System Running!
📍 Website URL:        http://localhost:3000
📚 Courses API:        http://localhost:3000/courses
🩺 Health API:         http://localhost:3000/health
📝 Registrations API:  http://localhost:3000/registrations
====================================================
```

*(Note: If port 3000 is occupied by another process, you can run on another port such as 5000: `$env:PORT=5000; npm start` in PowerShell or `PORT=5000 npm start` in Linux/macOS).*

---

## 11. Website & REST API URLs

| Resource | HTTP Method | URL | Description |
|---|---|---|---|
| **Website** | `GET` | `http://localhost:3000/` | Interactive student portal |
| **Courses** | `GET` | `http://localhost:3000/courses` | Returns all 8 courses in JSON |
| **Single Course** | `GET` | `http://localhost:3000/courses/:id` | Returns single course by ID |
| **Health** | `GET` | `http://localhost:3000/health` | Server operational status |
| **Submit Registration** | `POST` | `http://localhost:3000/registrations` | Submits student registration |
| **List Registrations** | `GET` | `http://localhost:3000/registrations` | View in-memory registrations (demo) |

---

## 12. API Documentation & JSON Examples

### A. `GET /courses`
**Request:**
```http
GET /courses HTTP/1.1
Host: localhost:3000
Accept: application/json
```

**Response (HTTP 200 OK):**
```json
{
  "success": true,
  "count": 8,
  "courses": [
    {
      "id": 101,
      "title": "Web Development",
      "category": "Programming",
      "duration": "12 weeks",
      "fee": 8000,
      "currency": "INR",
      "description": "Learn HTML, CSS, JavaScript, and responsive website development.",
      "icon": "🌐",
      "badge": "Most Popular",
      "level": "Beginner to Intermediate"
    },
    {
      "id": 102,
      "title": "Python Programming",
      "category": "Programming",
      "duration": "10 weeks",
      "fee": 6000,
      "currency": "INR",
      "description": "Learn Python fundamentals, functions, data structures, and problem-solving.",
      "icon": "🐍",
      "badge": "Foundational",
      "level": "Beginner"
    }
  ]
}
```

### B. `POST /registrations`
**Request:**
```http
POST /registrations HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "fullName": "Aarav Sharma",
  "studentId": "STU2026001",
  "email": "aarav@example.com",
  "phone": "+91 9876543210",
  "courseId": 101,
  "department": "Computer Science and Engineering",
  "yearOfStudy": "Second Year",
  "additionalInfo": "Interested in responsive full-stack applications."
}
```

**Response (HTTP 201 Created):**
```json
{
  "success": true,
  "message": "Student registration submitted successfully.",
  "registration": {
    "id": "REG-1001-8X2F",
    "fullName": "Aarav Sharma",
    "studentId": "STU2026001",
    "email": "aarav@example.com",
    "phone": "+91 9876543210",
    "courseId": 101,
    "courseTitle": "Web Development",
    "department": "Computer Science and Engineering",
    "yearOfStudy": "Second Year",
    "additionalInfo": "Interested in responsive full-stack applications.",
    "createdAt": "2026-10-15T07:10:00.000Z"
  }
}
```

**Error Response (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed. Please correct the highlighted errors.",
  "errors": [
    "Full Name is required.",
    "Please provide a valid email address (e.g., student@example.com)."
  ]
}
```

### C. `GET /health`
**Response (HTTP 200 OK):**
```json
{
  "status": "ok",
  "message": "CampusEnroll API is running smoothly",
  "uptime": 142,
  "timestamp": "2026-10-15T07:10:00.000Z"
}
```

---

## 13. Form Validation Architecture

### Client-Side (Frontend) Validation:
* **Full Name:** Required, non-empty, minimum 2 characters.
* **Student ID:** Required, minimum 3 characters, leading/trailing whitespace trimmed.
* **Email Address:** Required, validated against standard email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
* **Phone Number:** Required, validates that cleaned digits total between 7 and 15 digits, accepts optional `+91`, hyphens, and spaces.
* **Course Selection:** Required, validated to exist among the courses retrieved from the backend API.
* **Department:** Required, must be chosen from the pre-defined engineering/technology department list.
* **Year of Study:** Required, must be selected from the valid study years.
* **Additional Info:** Optional, enforces a 500-character upper limit with a live character count counter.

### Server-Side (Backend) Validation:
* Client validation is never trusted solely. The Express backend enforces independent checks.
* Unknown course IDs are rejected with HTTP 400.
* Disallowed department and year values are rejected with HTTP 400.
* Malformed JSON bodies are caught and rejected gracefully with HTTP 400 without crashing the server.

---

## 14. Automated Testing Instructions

The project includes 21 automated tests covering 5 test suites.

To execute the test suite:
```bash
npm test
```
Or directly via the Node.js test runner:
```bash
node --test tests/api.test.js
```

### Actual Automated Test Results:
```text
▶ TEST SUITE 1: GET /courses Endpoint
  ✔ should return HTTP 200 and Content-Type application/json (82.38ms)
  ✔ should return valid JSON with success=true and count=8 (8.99ms)
  ✔ should verify every course contains required fields and numeric fees > 0 (12.85ms)
  ✔ should verify sample course titles match the required course list (5.10ms)
✔ TEST SUITE 1: GET /courses Endpoint (110.32ms)

▶ TEST SUITE 2: POST /registrations Endpoint
  ✔ should accept a valid registration and return HTTP 201 Created (24.11ms)
  ✔ should reject requests with missing full name and return HTTP 400 (4.38ms)
  ✔ should reject requests with missing student ID and return HTTP 400 (4.85ms)
  ✔ should reject requests with invalid email and return HTTP 400 (9.10ms)
  ✔ should reject requests with invalid phone number and return HTTP 400 (11.14ms)
  ✔ should reject requests with missing or invalid department and return HTTP 400 (3.75ms)
  ✔ should reject requests with missing or invalid year of study and return HTTP 400 (4.90ms)
  ✔ should reject requests with missing courseId and return HTTP 400 (4.44ms)
  ✔ should reject requests with a nonexistent courseId and return HTTP 400 (3.45ms)
  ✔ should reject malformed JSON with HTTP 400 (4.81ms)
✔ TEST SUITE 2: POST /registrations Endpoint (76.56ms)

▶ TEST SUITE 3: GET /health Endpoint
  ✔ should return HTTP 200 and healthy status confirmation (1.82ms)
✔ TEST SUITE 3: GET /health Endpoint (2.01ms)

▶ TEST SUITE 4: Frontend Integration & Static Assets
  ✔ should serve index.html with HTTP 200 and text/html (8.99ms)
  ✔ should serve style.css with HTTP 200 and text/css (3.96ms)
  ✔ should serve script.js with HTTP 200 and javascript mime type (3.07ms)
  ✔ should serve education-illustration.svg and campus-logo.svg (36.76ms)
✔ TEST SUITE 4: Frontend Integration & Static Assets (53.44ms)

▶ TEST SUITE 5: Error Handling & Security
  ✔ should return HTTP 404 JSON for unknown API routes (6.58ms)
  ✔ should not leak server internal stack traces in public JSON responses (8.81ms)
✔ TEST SUITE 5: Error Handling & Security (16.18ms)

----------------------------------------------------
ℹ tests: 21
ℹ suites: 5
ℹ pass: 21
ℹ fail: 0
ℹ cancelled: 0
ℹ skipped: 0
ℹ todo: 0
----------------------------------------------------
```

---

## 15. Manual Testing Checklist

Follow this checklist during practical evaluation:

### TEST A: Website Interface & Responsiveness
1. Run `npm start` and visit `http://localhost:3000`.
2. Verify brand title *"CampusEnroll"* and navbar links (Home, Available Courses, Register Now, About Us).
3. Test mobile view (reduce browser width or open mobile emulation) and toggle the hamburger menu.
4. Verify all 8 courses are rendered with title, ID, category, duration, description, and fee in INR.

### TEST B: Backend Courses API
1. Open `http://localhost:3000/courses` in your browser.
2. Confirm the JSON payload: `success: true`, `count: 8`, and an array of 8 courses.

### TEST C: Successful Registration
1. In the course grid, click *"Register for This Course"* on **Web Development**.
2. Notice the page smoothly scrolls to the form and **Web Development** is automatically selected in the dropdown.
3. Fill in:
   * **Full Name:** Aarav Sharma
   * **Student ID:** STU2026001
   * **Email:** aarav@example.com
   * **Phone:** +91 9876543210
   * **Department:** Computer Science and Engineering
   * **Year of Study:** Second Year
4. Click **Submit Course Registration**.
5. Observe the button loading state and the green confirmation banner displaying your generated Registration ID (e.g., `REG-1001-XXXX`).

### TEST D: Validation Handling
1. Reload and try submitting the form with empty fields.
2. Verify inline error messages appear next to each required field.
3. Enter `invalid-email` and submit to verify email rejection.
4. Correct the errors to confirm real-time error clearance.

### TEST E: In-Memory Verification
1. Open `http://localhost:3000/registrations` in a new tab.
2. Confirm that your submitted registration is present in the memory array.

---

## 16. cURL & PowerShell Testing Commands

### A. cURL Commands (Bash / Linux / macOS)
```bash
# 1. Fetch courses
curl -X GET http://localhost:3000/courses

# 2. Server health
curl -X GET http://localhost:3000/health

# 3. Submit registration
curl -X POST http://localhost:3000/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Aarav Sharma",
    "studentId": "STU2026001",
    "email": "aarav@example.com",
    "phone": "+91 9876543210",
    "courseId": 101,
    "department": "Computer Science and Engineering",
    "yearOfStudy": "Second Year"
  }'
```

### B. Windows PowerShell Commands
```powershell
# 1. Fetch courses
Invoke-RestMethod -Uri "http://localhost:3000/courses" -Method Get

# 2. Server health
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get

# 3. Submit registration
$body = @{
    fullName    = "Aarav Sharma"
    studentId   = "STU2026001"
    email       = "aarav@example.com"
    phone       = "+91 9876543210"
    courseId    = 101
    department  = "Computer Science and Engineering"
    yearOfStudy = "Second Year"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/registrations" -Method Post -ContentType "application/json" -Body $body
```

---

## 17. Limitations & Technical Notes
* **In-Memory Storage:** To satisfy beginner-level college assignment guidelines and avoid complex external database setups, registrations are stored in server memory (`registrations = []`).
* **Server Restarts:** Registrations reset whenever the Express server process terminates or restarts.
* **Educational Scope:** Built strictly for academic demonstration and viva examinations without third-party authentication or payment processing gateways.

