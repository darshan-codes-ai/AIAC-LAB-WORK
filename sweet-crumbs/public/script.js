/**
 * Sweet Crumbs - Bakery Website Client-Side JavaScript
 * Implements:
 *  - Dynamic product fetching from GET /products REST API
 *  - Responsive product card rendering & Indian Rupee (INR) formatting
 *  - Category filtering
 *  - Graceful image fallbacks
 *  - Mobile navigation drawer
 *  - Client-side form validation & submission to POST /enquiries
 *  - Duplicate submission prevention & accessible user feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global product cache fetched from API (avoids hardcoding in frontend)
  let cachedProducts = [];

  // ==================== DOM ELEMENTS ====================
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const productsLoading = document.getElementById('productsLoading');
  const productsError = document.getElementById('productsError');
  const errorMessage = document.getElementById('errorMessage');
  const retryProductsBtn = document.getElementById('retryProductsBtn');
  const productsGrid = document.getElementById('productsGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const emptyFilterState = document.getElementById('emptyFilterState');

  const enquiryForm = document.getElementById('enquiryForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const productSelect = document.getElementById('productOfInterest');
  const messageInput = document.getElementById('enquiryMessage');
  const submitEnquiryBtn = document.getElementById('submitEnquiryBtn');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const successAlertMessage = document.getElementById('successAlertMessage');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const errorAlertMessage = document.getElementById('errorAlertMessage');
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

  // Mobile navigation hamburger toggle
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
   * Formats numeric price into Indian Rupee representation (₹)
   * Example: 550 => "₹550"
   */
  function formatINR(price) {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    } catch (e) {
      // Fallback if Intl.NumberFormat is unavailable
      return `₹${price}`;
    }
  }

  // ==================== 3. PRODUCTS API INTEGRATION ====================
  /**
   * Fetches bakery products from GET /products REST endpoint
   */
  async function fetchProducts() {
    // Set UI to loading state
    productsLoading.classList.remove('hidden');
    productsError.classList.add('hidden');
    productsGrid.classList.add('hidden');
    emptyFilterState.classList.add('hidden');

    try {
      const response = await fetch('/products', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status} (${response.statusText})`);
      }

      const data = await response.json();

      if (data && data.success && Array.isArray(data.products)) {
        cachedProducts = data.products;
        renderProducts(cachedProducts);
      } else {
        throw new Error('API response did not contain a valid products array');
      }
    } catch (error) {
      console.error('Error fetching bakery products:', error);
      productsLoading.classList.add('hidden');
      productsError.classList.remove('hidden');
      if (errorMessage) {
        errorMessage.textContent = `Could not load bakery products: ${error.message}. Please verify the server is running on localhost.`;
      }
    }
  }

  /**
   * Renders the product cards into the responsive grid
   */
  function renderProducts(items) {
    productsLoading.classList.add('hidden');

    if (!items || items.length === 0) {
      productsGrid.classList.add('hidden');
      emptyFilterState.classList.remove('hidden');
      return;
    }

    emptyFilterState.classList.add('hidden');
    productsGrid.innerHTML = '';

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-category', item.category || 'General');

      const fallbackSrc = item.fallbackImage || 'assets/fallback.svg';
      const formattedPrice = formatINR(item.price);

      card.innerHTML = `
        <div class="card-media">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="card-img" 
            loading="lazy"
            onerror="if(this.src !== '${fallbackSrc}') { this.src = '${fallbackSrc}'; } else { this.src = 'assets/fallback.svg'; }">
          <span class="card-badge">${item.badge || 'Bakery Special'}</span>
          <span class="card-id-tag">#${item.id}</span>
        </div>
        <div class="card-body">
          <span class="card-category">${item.category || 'Bakery'}</span>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <div class="card-footer">
            <div class="card-price-box">
              <span class="price-label">Price</span>
              <span class="card-price">${formattedPrice}</span>
            </div>
            <button class="card-btn order-enquiry-btn" data-product="${item.name}" data-price="${formattedPrice}">
              Enquire Now
            </button>
          </div>
        </div>
      `;

      productsGrid.appendChild(card);
    });

    productsGrid.classList.remove('hidden');

    // Attach click events to "Enquire Now" buttons on each card
    attachCardEnquiryEvents();
  }

  /**
   * When user clicks "Enquire Now" on a card, pre-select that product in the form
   * and smoothly scroll down to the contact section.
   */
  function attachCardEnquiryEvents() {
    const enquiryButtons = document.querySelectorAll('.order-enquiry-btn');
    enquiryButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const productName = e.currentTarget.getAttribute('data-product');
        if (productSelect && productName) {
          // Check if option exists in dropdown; if so, select it
          let matched = false;
          for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].value.toLowerCase() === productName.toLowerCase()) {
              productSelect.selectedIndex = i;
              matched = true;
              break;
            }
          }
          if (!matched) {
            // If not found in standard options, append or select
            productSelect.value = productName;
          }
        }

        // Scroll to contact form smoothly
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
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

      // Update active filter button styling
      document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const selectedCategory = button.getAttribute('data-category');

      if (selectedCategory === 'all') {
        renderProducts(cachedProducts);
      } else {
        const filtered = cachedProducts.filter((product) =>
          product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        renderProducts(filtered);
      }
    });
  }

  // Retry loading products if error occurred
  if (retryProductsBtn) {
    retryProductsBtn.addEventListener('click', () => {
      fetchProducts();
    });
  }

  // Initial products fetch on page load
  fetchProducts();

  // ==================== 4. CONTACT / ENQUIRY FORM VALIDATION & SUBMISSION ====================
  /**
   * Helper: validates email address format using standard pattern
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Helper: displays error message on specific form field
   */
  function setFieldError(fieldId, errorElementId, message) {
    const group = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorElementId);
    if (group) group.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
  }

  /**
   * Helper: clears error message on specific form field
   */
  function clearFieldError(fieldId, errorElementId) {
    const group = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorElementId);
    if (group) group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  }

  /**
   * Clears all validation error messages across the form
   */
  function clearAllErrors() {
    clearFieldError('group-name', 'nameError');
    clearFieldError('group-email', 'emailError');
    clearFieldError('group-phone', 'phoneError');
    clearFieldError('group-message', 'messageError');
    if (formErrorAlert) formErrorAlert.classList.add('hidden');
    if (formSuccessAlert) formSuccessAlert.classList.add('hidden');
  }

  // Real-time input validation cleanup
  if (fullNameInput) {
    fullNameInput.addEventListener('input', () => {
      if (fullNameInput.value.trim().length >= 2) {
        clearFieldError('group-name', 'nameError');
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

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 5) {
        clearFieldError('group-message', 'messageError');
      }
    });
  }

  // Form submission handler
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      // 1. Prevent default page reload
      e.preventDefault();

      clearAllErrors();

      const nameVal = fullNameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const productVal = productSelect ? productSelect.value.trim() : '';
      const messageVal = messageInput.value.trim();

      let hasError = false;

      // 2. Validate Full Name (required, min 2 chars)
      if (!nameVal) {
        setFieldError('group-name', 'nameError', 'Please enter your full name.');
        hasError = true;
      } else if (nameVal.length < 2) {
        setFieldError('group-name', 'nameError', 'Full name must be at least 2 characters.');
        hasError = true;
      }

      // 3. Validate Email Address (required, valid email pattern)
      if (!emailVal) {
        setFieldError('group-email', 'emailError', 'Please enter your email address.');
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        setFieldError('group-email', 'emailError', 'Please provide a valid email (e.g., aditi@example.com).');
        hasError = true;
      }

      // 4. Validate Phone Number (optional, but if provided check digit count)
      if (phoneVal) {
        const digitsOnly = phoneVal.replace(/[\s\-\+\(\)]/g, '');
        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
          setFieldError('group-phone', 'phoneError', 'Phone number must have between 7 and 15 digits.');
          hasError = true;
        }
      }

      // 5. Validate Message (required, min 5 chars)
      if (!messageVal) {
        setFieldError('group-message', 'messageError', 'Please enter your message or order details.');
        hasError = true;
      } else if (messageVal.length < 5) {
        setFieldError('group-message', 'messageError', 'Your message should be at least 5 characters long.');
        hasError = true;
      }

      if (hasError) {
        if (formErrorAlert) {
          formErrorAlert.classList.remove('hidden');
          if (errorAlertMessage) {
            errorAlertMessage.textContent = 'Please correct the highlighted fields before submitting.';
          }
        }
        return;
      }

      // 6. Prevent duplicate submissions while processing
      submitEnquiryBtn.disabled = true;
      const btnText = submitEnquiryBtn.querySelector('.btn-text');
      const btnSpinner = submitEnquiryBtn.querySelector('.btn-spinner');
      if (btnText) btnText.textContent = 'Submitting Enquiry...';
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      try {
        const payload = {
          name: nameVal,
          email: emailVal,
          phone: phoneVal || null,
          productOfInterest: productVal || 'General Enquiry',
          message: messageVal
        };

        const response = await fetch('/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.status === 201 && result.success) {
          // Success! Show success notification and clear form
          if (formSuccessAlert) {
            formSuccessAlert.classList.remove('hidden');
            if (successAlertMessage) {
              successAlertMessage.textContent = result.message || 'Thank you! Your enquiry has been received.';
            }
          }

          // Reset the form inputs
          enquiryForm.reset();

          // Smooth scroll to alert if needed
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Server validation or error
          const serverErrors = result.errors && Array.isArray(result.errors) 
            ? result.errors.join(' ') 
            : (result.message || 'Submission failed. Please check your information.');
          
          if (formErrorAlert) {
            formErrorAlert.classList.remove('hidden');
            if (errorAlertMessage) {
              errorAlertMessage.textContent = serverErrors;
            }
          }
        }
      } catch (err) {
        console.error('Error submitting enquiry:', err);
        if (formErrorAlert) {
          formErrorAlert.classList.remove('hidden');
          if (errorAlertMessage) {
            errorAlertMessage.textContent = 'Could not connect to the server to submit your enquiry. Please verify backend is running.';
          }
        }
      } finally {
        // Re-enable submit button
        submitEnquiryBtn.disabled = false;
        if (btnText) btnText.textContent = 'Submit Enquiry';
        if (btnSpinner) btnSpinner.classList.add('hidden');
      }
    });
  }
});

