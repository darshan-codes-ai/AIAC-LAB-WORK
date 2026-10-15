/**
 * CampusEnroll - Automated API and Integration Tests
 * Uses Node.js built-in test runner (node:test) and strict assertions (node:assert/strict).
 * Tests all 5 required test suites:
 *  - TEST SUITE 1: GET /courses
 *  - TEST SUITE 2: POST /registrations
 *  - TEST SUITE 3: GET /health
 *  - TEST SUITE 4: Frontend Integration & Static Assets
 *  - TEST SUITE 5: Error Handling
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

let server;
let baseUrl;

before(() => new Promise((resolve) => {
  // Start server on an ephemeral port (0 lets OS select any free port)
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    console.log(`[Test Runner] CampusEnroll test server started at ${baseUrl}`);
    resolve();
  });
}));

after(() => new Promise((resolve) => {
  // Gracefully close server after testing completes
  server.close(() => {
    console.log('[Test Runner] CampusEnroll test server closed cleanly.');
    resolve();
  });
}));

// ==================== TEST SUITE 1: GET /courses ====================
describe('TEST SUITE 1: GET /courses Endpoint', () => {
  it('should return HTTP 200 and Content-Type application/json', async () => {
    const response = await fetch(`${baseUrl}/courses`);
    assert.equal(response.status, 200, 'Expected HTTP 200');
    assert.match(
      response.headers.get('content-type'),
      /application\/json/,
      'Expected application/json header'
    );
  });

  it('should return valid JSON with success=true and count=8', async () => {
    const response = await fetch(`${baseUrl}/courses`);
    const data = await response.json();

    assert.equal(data.success, true, 'Expected data.success to be true');
    assert.equal(data.count, 8, 'Expected count to equal 8');
    assert.ok(Array.isArray(data.courses), 'Expected data.courses to be an array');
    assert.equal(data.courses.length, 8, 'Expected exactly 8 courses in the list');
  });

  it('should verify every course contains required fields and numeric fees > 0', async () => {
    const response = await fetch(`${baseUrl}/courses`);
    const data = await response.json();

    const seenIds = new Set();
    const expectedIds = [101, 102, 103, 104, 105, 106, 107, 108];

    data.courses.forEach((course, idx) => {
      // Check required properties
      assert.ok(course.id !== undefined, `Course #${idx} missing id`);
      assert.ok(typeof course.title === 'string' && course.title.length > 0, `Course #${idx} missing title`);
      assert.ok(typeof course.category === 'string' && course.category.length > 0, `Course #${idx} missing category`);
      assert.ok(typeof course.description === 'string' && course.description.length > 0, `Course #${idx} missing description`);
      assert.ok(typeof course.duration === 'string' && course.duration.length > 0, `Course #${idx} missing duration`);
      assert.equal(course.currency, 'INR', `Course #${course.id} currency must be INR`);

      // Verify numeric fee greater than zero
      assert.equal(typeof course.fee, 'number', `Course #${course.id} fee must be a number`);
      assert.ok(course.fee > 0, `Course #${course.id} fee must be greater than zero`);

      // Check unique ID
      assert.ok(!seenIds.has(course.id), `Duplicate course ID: ${course.id}`);
      seenIds.add(course.id);
    });

    // Check course IDs match sample dataset exactly
    expectedIds.forEach((id) => {
      assert.ok(seenIds.has(id), `Expected course ID ${id} in dataset`);
    });
  });

  it('should verify sample course titles match the required course list', async () => {
    const response = await fetch(`${baseUrl}/courses`);
    const data = await response.json();

    const expectedTitles = [
      'Web Development',
      'Python Programming',
      'Data Science Fundamentals',
      'Artificial Intelligence',
      'Cloud Computing',
      'Cybersecurity Basics',
      'Database Management Systems',
      'Mobile App Development'
    ];

    const actualTitles = data.courses.map((c) => c.title);
    expectedTitles.forEach((title) => {
      assert.ok(actualTitles.includes(title), `Expected courses to include "${title}"`);
    });
  });
});

// ==================== TEST SUITE 2: POST /registrations ====================
describe('TEST SUITE 2: POST /registrations Endpoint', () => {
  it('should accept a valid registration and return HTTP 201 Created', async () => {
    const validRegistration = {
      fullName: 'Aarav Sharma',
      studentId: 'STU2026001',
      email: 'aarav@example.com',
      phone: '+91 9876543210',
      courseId: 101,
      department: 'Computer Science and Engineering',
      yearOfStudy: 'Second Year',
      additionalInfo: 'Interested in web application development.'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validRegistration)
    });

    assert.equal(response.status, 201, 'Expected HTTP 201 Created');
    const data = await response.json();

    assert.equal(data.success, true, 'Expected data.success=true');
    assert.ok(data.registration, 'Expected registration object in response');
    assert.ok(data.registration.id.startsWith('REG-'), 'Expected unique registration ID starting with REG-');
    assert.ok(data.registration.createdAt, 'Expected creation timestamp');
    assert.equal(data.registration.courseTitle, 'Web Development', 'Expected matched course title');
    assert.equal(data.registration.fullName, 'Aarav Sharma');
    assert.equal(data.registration.studentId, 'STU2026001');
    assert.equal(data.registration.email, 'aarav@example.com');
  });

  it('should reject requests with missing full name and return HTTP 400', async () => {
    const payload = {
      studentId: 'STU2026002',
      email: 'student@example.com',
      phone: '9876543210',
      courseId: 102,
      department: 'Information Technology',
      yearOfStudy: 'First Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('name')));
  });

  it('should reject requests with missing student ID and return HTTP 400', async () => {
    const payload = {
      fullName: 'Pooja Iyer',
      studentId: '',
      email: 'pooja@example.com',
      phone: '9876543210',
      courseId: 103,
      department: 'Information Technology',
      yearOfStudy: 'Third Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('student id')));
  });

  it('should reject requests with invalid email and return HTTP 400', async () => {
    const payload = {
      fullName: 'Pooja Iyer',
      studentId: 'STU2026003',
      email: 'not-an-email',
      phone: '9876543210',
      courseId: 103,
      department: 'Information Technology',
      yearOfStudy: 'Third Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('email')));
  });

  it('should reject requests with invalid phone number and return HTTP 400', async () => {
    const payload = {
      fullName: 'Karan Patel',
      studentId: 'STU2026004',
      email: 'karan@example.com',
      phone: '123',
      courseId: 104,
      department: 'Mechanical Engineering',
      yearOfStudy: 'Fourth Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('phone')));
  });

  it('should reject requests with missing or invalid department and return HTTP 400', async () => {
    const payload = {
      fullName: 'Karan Patel',
      studentId: 'STU2026004',
      email: 'karan@example.com',
      phone: '9876543210',
      courseId: 104,
      department: 'Astronomy & Astrology Department',
      yearOfStudy: 'Fourth Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('department')));
  });

  it('should reject requests with missing or invalid year of study and return HTTP 400', async () => {
    const payload = {
      fullName: 'Karan Patel',
      studentId: 'STU2026004',
      email: 'karan@example.com',
      phone: '9876543210',
      courseId: 104,
      department: 'Civil Engineering',
      yearOfStudy: 'Tenth Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('year of study')));
  });

  it('should reject requests with missing courseId and return HTTP 400', async () => {
    const payload = {
      fullName: 'Karan Patel',
      studentId: 'STU2026004',
      email: 'karan@example.com',
      phone: '9876543210',
      department: 'Civil Engineering',
      yearOfStudy: 'First Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('course')));
  });

  it('should reject requests with a nonexistent courseId and return HTTP 400', async () => {
    const payload = {
      fullName: 'Karan Patel',
      studentId: 'STU2026004',
      email: 'karan@example.com',
      phone: '9876543210',
      courseId: 9999,
      department: 'Civil Engineering',
      yearOfStudy: 'First Year'
    };

    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.errors.some((err) => err.toLowerCase().includes('does not exist')));
  });

  it('should reject malformed JSON with HTTP 400', async () => {
    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ malformed JSON string ... '
    });

    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.toLowerCase().includes('json'));
  });
});

// ==================== TEST SUITE 3: GET /health ====================
describe('TEST SUITE 3: GET /health Endpoint', () => {
  it('should return HTTP 200 and healthy status confirmation', async () => {
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
    assert.ok(html.includes('CampusEnroll'), 'HTML should contain CampusEnroll');
    assert.ok(html.includes('Build Your Future') && html.includes('Right Course'), 'HTML should contain hero title');
    assert.ok(html.includes('id="coursesGrid"'), 'HTML should contain courses grid container');
    assert.ok(html.includes('id="registrationForm"'), 'HTML should contain registration form');
  });

  it('should serve style.css with HTTP 200 and text/css', async () => {
    const response = await fetch(`${baseUrl}/style.css`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/css/);

    const css = await response.text();
    assert.ok(css.includes('--color-navy-900'), 'CSS should contain navy palette');
    assert.ok(css.includes('.course-card'), 'CSS should contain course card styles');
  });

  it('should serve script.js with HTTP 200 and javascript mime type', async () => {
    const response = await fetch(`${baseUrl}/script.js`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /(javascript|text\/javascript)/);

    const js = await response.text();
    assert.ok(js.includes('/courses'), 'JS should call /courses');
    assert.ok(js.includes('/registrations'), 'JS should call /registrations');
  });

  it('should serve education-illustration.svg and campus-logo.svg', async () => {
    const resLogo = await fetch(`${baseUrl}/assets/campus-logo.svg`);
    assert.equal(resLogo.status, 200);
    assert.match(resLogo.headers.get('content-type'), /image\/svg\+xml/);

    const resHero = await fetch(`${baseUrl}/assets/education-illustration.svg`);
    assert.equal(resHero.status, 200);
    assert.match(resHero.headers.get('content-type'), /image\/svg\+xml/);
  });
});

// ==================== TEST SUITE 5: Error Handling ====================
describe('TEST SUITE 5: Error Handling & Security', () => {
  it('should return HTTP 404 JSON for unknown API routes', async () => {
    const response = await fetch(`${baseUrl}/api/unknown-endpoint`);
    assert.equal(response.status, 404);

    const data = await response.json();
    assert.equal(data.success, false);
    assert.ok(data.message.includes('not found'));
  });

  it('should not leak server internal stack traces in public JSON responses', async () => {
    const response = await fetch(`${baseUrl}/api/unknown-endpoint`);
    const data = await response.json();
    assert.equal(data.stack, undefined, 'Server must not expose stack traces');
  });
});
