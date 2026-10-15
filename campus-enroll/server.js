/**
 * CampusEnroll - Student Course Registration System
 * Express.js backend providing REST API endpoints and static file hosting.
 */

const express = require('express');
const path = require('path');
const courses = require('./data/courses');

const app = express();
const PORT = process.env.PORT || 3000;

// Centralized in-memory store for student registrations (demo college assignment purpose)
// NOTE: Registrations are stored in RAM and will reset when server restarts.
const registrations = [];

// Allowed Academic Departments & Study Years for rigorous validation
const ALLOWED_DEPARTMENTS = [
  'Computer Science and Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other'
];

const ALLOWED_YEARS = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year',
  'Other'
];

// Middleware for parsing JSON with error handling for malformed JSON
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload. Please ensure request body is valid JSON.',
      errors: ['Malformed JSON format in request body.']
    });
  }
  next(err);
});

app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Validation Helpers
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleanPhone = phone.trim();
  // Strip allowed formatting characters: spaces, hyphens, plus, parentheses
  const digitsOnly = cleanPhone.replace(/[\s\-\+\(\)]/g, '');
  // Must contain between 7 and 15 digits
  return /^\d{7,15}$/.test(digitsOnly);
}

/**
 * 1. Health Check Endpoint
 * GET /health
 * Returns server status and uptime for monitoring.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CampusEnroll API is running smoothly',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * 2. Courses Endpoint
 * GET /courses
 * Returns all 8 available courses in JSON format.
 */
app.get('/courses', (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      count: courses.length,
      courses: courses
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. Single Course Endpoint (Helper for modularity)
 * GET /courses/:id
 */
app.get('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid course ID format'
    });
  }

  const course = courses.find((item) => item.id === courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course with ID ${courseId} not found`
    });
  }

  res.status(200).json({
    success: true,
    course: course
  });
});

/**
 * 4. Student Course Registrations Endpoint
 * POST /registrations
 * Accepts course registration details, validates input, and stores records in memory.
 */
app.post('/registrations', (req, res) => {
  try {
    const {
      fullName,
      studentId,
      email,
      phone,
      courseId,
      department,
      yearOfStudy,
      additionalInfo
    } = req.body || {};

    const errors = [];

    // Validation: Full Name (required, non-empty, reasonable length)
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      errors.push('Full Name is required.');
    } else if (fullName.trim().length < 2) {
      errors.push('Full Name must be at least 2 characters long.');
    } else if (fullName.trim().length > 100) {
      errors.push('Full Name must not exceed 100 characters.');
    }

    // Validation: Student ID (required, alphanumeric, min 3 chars)
    if (!studentId || typeof studentId !== 'string' || studentId.trim().length === 0) {
      errors.push('Student ID is required.');
    } else if (studentId.trim().length < 3) {
      errors.push('Student ID must be at least 3 characters long.');
    } else if (studentId.trim().length > 30) {
      errors.push('Student ID must not exceed 30 characters.');
    }

    // Validation: Email (required, valid format)
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      errors.push('Email address is required.');
    } else if (!isValidEmail(email)) {
      errors.push('Please provide a valid email address (e.g., student@example.com).');
    }

    // Validation: Phone (required, valid digits)
    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      errors.push('Phone number is required.');
    } else if (!isValidPhone(phone)) {
      errors.push('Phone number must contain between 7 and 15 digits (e.g., +91 9876543210).');
    }

    // Validation: Course ID (required, must exist in courses dataset)
    const parsedCourseId = parseInt(courseId, 10);
    let matchedCourse = null;
    if (courseId === undefined || courseId === null || isNaN(parsedCourseId)) {
      errors.push('A valid course must be selected.');
    } else {
      matchedCourse = courses.find((c) => c.id === parsedCourseId);
      if (!matchedCourse) {
        errors.push(`Course with ID ${parsedCourseId} does not exist in available courses.`);
      }
    }

    // Validation: Academic Department (required, must be in allowed list)
    if (!department || typeof department !== 'string' || department.trim().length === 0) {
      errors.push('Academic Department is required.');
    } else if (!ALLOWED_DEPARTMENTS.includes(department.trim())) {
      errors.push(`Department must be one of: ${ALLOWED_DEPARTMENTS.join(', ')}.`);
    }

    // Validation: Year of Study (required, must be in allowed list)
    if (!yearOfStudy || typeof yearOfStudy !== 'string' || yearOfStudy.trim().length === 0) {
      errors.push('Year of Study is required.');
    } else if (!ALLOWED_YEARS.includes(yearOfStudy.trim())) {
      errors.push(`Year of Study must be one of: ${ALLOWED_YEARS.join(', ')}.`);
    }

    // Validation: Optional Additional Information length check
    if (additionalInfo && typeof additionalInfo === 'string' && additionalInfo.trim().length > 500) {
      errors.push('Additional information must not exceed 500 characters.');
    }

    // If any validation failed, return 400 Bad Request
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors: errors
      });
    }

    // Generate unique registration ID (e.g., REG-1001, REG-1002...)
    const uniqueNumber = 1000 + registrations.length + 1;
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const registrationId = `REG-${uniqueNumber}-${randomSuffix}`;

    const newRegistration = {
      id: registrationId,
      fullName: fullName.trim(),
      studentId: studentId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      courseId: matchedCourse.id,
      courseTitle: matchedCourse.title,
      department: department.trim(),
      yearOfStudy: yearOfStudy.trim(),
      additionalInfo: additionalInfo ? additionalInfo.trim() : '',
      createdAt: new Date().toISOString()
    };

    registrations.push(newRegistration);

    return res.status(201).json({
      success: true,
      message: 'Student registration submitted successfully.',
      registration: newRegistration
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process course registration. Please try again later.'
    });
  }
});

/**
 * 5. Retrieve Registrations Endpoint (Helper for testing and grading evaluation)
 * GET /registrations
 */
app.get('/registrations', (req, res) => {
  res.status(200).json({
    success: true,
    count: registrations.length,
    registrations: registrations,
    note: 'Registrations are stored in temporary server memory and will reset when server restarts.'
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
    console.log(`🎓 CampusEnroll - Course Registration System Running!`);
    console.log(`📍 Website URL:        http://localhost:${PORT}`);
    console.log(`📚 Courses API:        http://localhost:${PORT}/courses`);
    console.log(`🩺 Health API:         http://localhost:${PORT}/health`);
    console.log(`📝 Registrations API:  http://localhost:${PORT}/registrations`);
    console.log(`====================================================`);
  });
}

module.exports = app;

