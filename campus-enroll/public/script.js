/**
 * CampusEnroll - Student Course Registration Client-Side JavaScript
 * Implements:
 *  - Dynamic course retrieval from GET /courses REST API
 *  - Responsive course cards rendering & Indian Rupee (INR) formatting
 *  - Dynamic population of registration form course select dropdown
 *  - Interactive "Register for This Course" automatic selection and smooth scroll
 *  - Category filtering
 *  - Client-side form validation (Full Name, Student ID, Email, Phone, Course, Dept, Year)
 *  - Submission to POST /registrations REST API
 *  - Duplicate submission prevention, loading spinners & accessible alert receipts
 */

document.addEventListener('DOMContentLoaded', () => {
  // In-memory cache for courses loaded from API (prevents hardcoding in frontend)
  let cachedCourses = [];

  // ==================== DOM ELEMENTS ====================
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const coursesLoading = document.getElementById('coursesLoading');
  const coursesError = document.getElementById('coursesError');
  const coursesErrorMessage = document.getElementById('coursesErrorMessage');
  const retryCoursesBtn = document.getElementById('retryCoursesBtn');
  const emptyCoursesState = document.getElementById('emptyCoursesState');
  const coursesGrid = document.getElementById('coursesGrid');
  const categoryFilters = document.getElementById('categoryFilters');

  const registrationForm = document.getElementById('registrationForm');
  const fullNameInput = document.getElementById('fullName');
  const studentIdInput = document.getElementById('studentId');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const courseSelect = document.getElementById('courseSelect');
  const departmentSelect = document.getElementById('departmentSelect');
  const yearOfStudySelect = document.getElementById('yearOfStudy');
  const additionalInfoInput = document.getElementById('additionalInfo');
  const charCountSpan = document.getElementById('charCount');
  const submitRegistrationBtn = document.getElementById('submitRegistrationBtn');

  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const receiptRegId = document.getElementById('receiptRegId');
  const receiptCourse = document.getElementById('receiptCourse');
  const receiptStudent = document.getElementById('receiptStudent');

  const formErrorAlert = document.getElementById('formErrorAlert');
  const errorMessageText = document.getElementById('errorMessageText');

  const currentYearSpan = document.getElementById('currentYear');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==================== 1. NAVBAR & MOBILE NAVIGATION ====================
  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active navigation link highlighting on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==================== 2. CURRENCY FORMATTER (INR) ====================
  /**
   * Formats numeric fee into Indian Rupee representation (₹)
   * Example: 8000 => "₹8,000"
   */
  function formatINR(amount) {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    } catch (e) {
      return `₹${amount}`;
    }
  }

  // ==================== 3. COURSES API INTEGRATION ====================
  /**
   * Fetches courses list from backend GET /courses REST endpoint
   */
  async function fetchCourses() {
    coursesLoading.classList.remove('hidden');
    coursesError.classList.add('hidden');
    coursesGrid.classList.add('hidden');
    emptyCoursesState.classList.add('hidden');

    try {
      const response = await fetch('/courses', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status} (${response.statusText})`);
      }

      const data = await response.json();

      if (data && data.success && Array.isArray(data.courses)) {
        cachedCourses = data.courses;
        renderCourses(cachedCourses);
        populateCourseDropdown(cachedCourses);
      } else {
        throw new Error('API response did not contain a valid courses array');
      }
    } catch (error) {
      console.error('Error fetching courses from API:', error);
      coursesLoading.classList.add('hidden');
      coursesError.classList.remove('hidden');
      if (coursesErrorMessage) {
        coursesErrorMessage.textContent = `Could not connect to CampusEnroll API: ${error.message}. Please ensure the server is running.`;
      }
    }
  }

  /**
   * Populates the Registration Form course dropdown from backend course records
   */
  function populateCourseDropdown(items) {
    if (!courseSelect) return;

    // Preserve the initial placeholder option
    courseSelect.innerHTML = '<option value="">-- Choose an available course --</option>';

    items.forEach((course) => {
      const option = document.createElement('option');
      option.value = course.id;
      option.textContent = `${course.title} (ID: ${course.id} • ${formatINR(course.fee)} • ${course.duration})`;
      courseSelect.appendChild(option);
    });
  }

  /**
   * Renders course cards dynamically into the responsive grid
   */
  function renderCourses(items) {
    coursesLoading.classList.add('hidden');

    if (!items || items.length === 0) {
      coursesGrid.classList.add('hidden');
      emptyCoursesState.classList.remove('hidden');
      return;
    }

    emptyCoursesState.classList.add('hidden');
    coursesGrid.innerHTML = '';

    items.forEach((course) => {
      const card = document.createElement('article');
      card.className = 'course-card';
      card.setAttribute('data-id', course.id);
      card.setAttribute('data-category', course.category);

      const formattedFee = formatINR(course.fee);

      card.innerHTML = `
        <div class="course-card-header">
          <div class="course-icon-badge" aria-hidden="true">${course.icon || '🎓'}</div>
          <span class="course-id-tag">ID: ${course.id}</span>
        </div>
        <div class="course-card-body">
          <span class="course-category">${course.category}</span>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-meta">
            <div class="meta-item">
              <span>⏱️</span>
              <span>${course.duration}</span>
            </div>
            <div class="meta-item">
              <span>📚</span>
              <span>${course.level || 'Academic Track'}</span>
            </div>
          </div>
        </div>
        <div class="course-card-footer">
          <div class="course-fee-box">
            <span class="fee-label">Course Fee</span>
            <span class="fee-amount">${formattedFee}</span>
          </div>
          <button class="register-course-btn" data-course-id="${course.id}" data-course-title="${course.title}">
            Register for This Course
          </button>
        </div>
      `;

      coursesGrid.appendChild(card);
    });

    coursesGrid.classList.remove('hidden');

    // Attach click events to "Register for This Course" buttons
    attachCourseRegistrationEvents();
  }

  /**
   * Handles clicking "Register for This Course":
   * Automatically sets dropdown value in the registration form and scrolls smoothly to it
   */
  function attachCourseRegistrationEvents() {
    const registerButtons = document.querySelectorAll('.register-course-btn');
    registerButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const courseId = e.currentTarget.getAttribute('data-course-id');
        if (courseSelect && courseId) {
          courseSelect.value = courseId;
          clearFieldError('group-courseId', 'courseError');
        }

        // Smooth scroll to registration form section
        const registerSection = document.getElementById('register');
        if (registerSection) {
          registerSection.scrollIntoView({ behavior: 'smooth' });
          // Focus name input for user convenience
          setTimeout(() => {
            if (fullNameInput) fullNameInput.focus();
          }, 600);
        }
      });
    });
  }

  // Category Filtering
  if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
      const button = e.target.closest('.filter-btn');
      if (!button) return;

      document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const selectedCategory = button.getAttribute('data-category');

      if (selectedCategory === 'all') {
        renderCourses(cachedCourses);
      } else {
        const filtered = cachedCourses.filter((course) =>
          course.category && course.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        renderCourses(filtered);
      }
    });
  }

  // Retry loading courses button
  if (retryCoursesBtn) {
    retryCoursesBtn.addEventListener('click', () => {
      fetchCourses();
    });
  }

  // Initial fetch on page load
  fetchCourses();

  // ==================== 4. REGISTRATION FORM VALIDATION & SUBMISSION ====================
  /**
   * Helper: Email regex validation
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Helper: Phone validation (7-15 digits, allows optional +91, spaces, hyphens)
   */
  function isValidPhone(phone) {
    const digitsOnly = phone.replace(/[\s\-\+\(\)]/g, '');
    return /^\d{7,15}$/.test(digitsOnly);
  }

  /**
   * Helper: Sets error state on specific form field
   */
  function setFieldError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
  }

  /**
   * Helper: Clears error state on specific form field
   */
  function clearFieldError(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  }

  /**
   * Clears all validation errors and alert banners
   */
  function clearAllErrors() {
    clearFieldError('group-fullName', 'fullNameError');
    clearFieldError('group-studentId', 'studentIdError');
    clearFieldError('group-email', 'emailError');
    clearFieldError('group-phone', 'phoneError');
    clearFieldError('group-courseId', 'courseError');
    clearFieldError('group-department', 'departmentError');
    clearFieldError('group-yearOfStudy', 'yearError');
    if (formErrorAlert) formErrorAlert.classList.add('hidden');
    if (formSuccessAlert) formSuccessAlert.classList.add('hidden');
  }

  // Real-time character count for optional additional info
  if (additionalInfoInput && charCountSpan) {
    additionalInfoInput.addEventListener('input', () => {
      charCountSpan.textContent = additionalInfoInput.value.length;
    });
  }

  // Real-time input validation cleanup
  if (fullNameInput) {
    fullNameInput.addEventListener('input', () => {
      if (fullNameInput.value.trim().length >= 2) {
        clearFieldError('group-fullName', 'fullNameError');
      }
    });
  }

  if (studentIdInput) {
    studentIdInput.addEventListener('input', () => {
      if (studentIdInput.value.trim().length >= 3) {
        clearFieldError('group-studentId', 'studentIdError');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value)) {
        clearFieldError('group-email', 'emailError');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (isValidPhone(phoneInput.value)) {
        clearFieldError('group-phone', 'phoneError');
      }
    });
  }

  if (courseSelect) {
    courseSelect.addEventListener('change', () => {
      if (courseSelect.value) {
        clearFieldError('group-courseId', 'courseError');
      }
    });
  }

  if (departmentSelect) {
    departmentSelect.addEventListener('change', () => {
      if (departmentSelect.value) {
        clearFieldError('group-department', 'departmentError');
      }
    });
  }

  if (yearOfStudySelect) {
    yearOfStudySelect.addEventListener('change', () => {
      if (yearOfStudySelect.value) {
        clearFieldError('group-yearOfStudy', 'yearError');
      }
    });
  }

  // Registration Form Submission Handler
  if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
      // 1. Prevent default form submission and page reload
      e.preventDefault();

      clearAllErrors();

      const nameVal = fullNameInput.value.trim();
      const studentIdVal = studentIdInput.value.trim();
      const emailVal = emailInput.value.trim();
      const phoneVal = phoneInput.value.trim();
      const courseIdVal = courseSelect.value.trim();
      const deptVal = departmentSelect.value.trim();
      const yearVal = yearOfStudySelect.value.trim();
      const infoVal = additionalInfoInput ? additionalInfoInput.value.trim() : '';

      let hasError = false;

      // 2. Validate Full Name (required, non-empty, min 2 chars)
      if (!nameVal) {
        setFieldError('group-fullName', 'fullNameError', 'Please enter your full name.');
        hasError = true;
      } else if (nameVal.length < 2) {
        setFieldError('group-fullName', 'fullNameError', 'Full name must be at least 2 characters.');
        hasError = true;
      }

      // 3. Validate Student ID (required, alphanumeric, min 3 chars)
      if (!studentIdVal) {
        setFieldError('group-studentId', 'studentIdError', 'Please enter your student ID.');
        hasError = true;
      } else if (studentIdVal.length < 3) {
        setFieldError('group-studentId', 'studentIdError', 'Student ID must be at least 3 characters.');
        hasError = true;
      }

      // 4. Validate Email Address (required, valid email pattern)
      if (!emailVal) {
        setFieldError('group-email', 'emailError', 'Please enter your email address.');
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        setFieldError('group-email', 'emailError', 'Please enter a valid email (e.g., student@example.com).');
        hasError = true;
      }

      // 5. Validate Phone Number (required, valid digits)
      if (!phoneVal) {
        setFieldError('group-phone', 'phoneError', 'Please enter your contact phone number.');
        hasError = true;
      } else if (!isValidPhone(phoneVal)) {
        setFieldError('group-phone', 'phoneError', 'Phone must contain 7-15 digits (e.g., +91 9876543210).');
        hasError = true;
      }

      // 6. Validate Course Selection (required, must exist in loaded backend courses)
      const parsedCourseId = parseInt(courseIdVal, 10);
      if (!courseIdVal || isNaN(parsedCourseId)) {
        setFieldError('group-courseId', 'courseError', 'Please select a course for registration.');
        hasError = true;
      } else {
        const courseExists = cachedCourses.some((c) => c.id === parsedCourseId);
        if (!courseExists && cachedCourses.length > 0) {
          setFieldError('group-courseId', 'courseError', 'Selected course is not available in our catalog.');
          hasError = true;
        }
      }

      // 7. Validate Academic Department (required)
      if (!deptVal) {
        setFieldError('group-department', 'departmentError', 'Please select your academic department.');
        hasError = true;
      }

      // 8. Validate Year of Study (required)
      if (!yearVal) {
        setFieldError('group-yearOfStudy', 'yearError', 'Please select your current year of study.');
        hasError = true;
      }

      if (hasError) {
        if (formErrorAlert) {
          formErrorAlert.classList.remove('hidden');
          if (errorMessageText) {
            errorMessageText.textContent = 'Please correct the highlighted fields before submitting.';
          }
          formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      // 9. Prevent Duplicate Submissions: lock submit button and show spinner
      submitRegistrationBtn.disabled = true;
      const btnText = submitRegistrationBtn.querySelector('.btn-text');
      const btnSpinner = submitRegistrationBtn.querySelector('.btn-spinner');
      if (btnText) btnText.textContent = 'Processing Registration...';
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      try {
        const payload = {
          fullName: nameVal,
          studentId: studentIdVal,
          email: emailVal,
          phone: phoneVal,
          courseId: parsedCourseId,
          department: deptVal,
          yearOfStudy: yearVal,
          additionalInfo: infoVal
        };

        const response = await fetch('/registrations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.status === 201 && result.success) {
          // Success! Show registration receipt alert
          if (formSuccessAlert) {
            formSuccessAlert.classList.remove('hidden');
            if (receiptRegId) receiptRegId.textContent = result.registration.id;
            if (receiptCourse) receiptCourse.textContent = result.registration.courseTitle;
            if (receiptStudent) receiptStudent.textContent = result.registration.fullName;

            formSuccessAlert.focus();
            formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          // Reset form fields
          registrationForm.reset();
          if (charCountSpan) charCountSpan.textContent = '0';
        } else {
          // Server rejected registration with validation errors
          const errorMsg = result.errors && Array.isArray(result.errors)
            ? result.errors.join(' ')
            : (result.message || 'Registration failed. Please check your information.');

          if (formErrorAlert) {
            formErrorAlert.classList.remove('hidden');
            if (errorMessageText) errorMessageText.textContent = errorMsg;
            formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      } catch (err) {
        console.error('Error submitting registration to API:', err);
        if (formErrorAlert) {
          formErrorAlert.classList.remove('hidden');
          if (errorMessageText) {
            errorMessageText.textContent = 'Network error: Could not reach the CampusEnroll backend server.';
          }
          formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        // Restore submit button state
        submitRegistrationBtn.disabled = false;
        if (btnText) btnText.textContent = 'Submit Course Registration';
        if (btnSpinner) btnSpinner.classList.add('hidden');
      }
    });
  }
});

