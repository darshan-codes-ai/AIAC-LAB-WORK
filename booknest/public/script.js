/**
 * BookNest - Online Bookstore Client-Side JavaScript
 * Implements:
 *  - Dynamic book catalog retrieval from GET /books REST API
 *  - Title-based search with real-time filtering, count display & clear action
 *  - Individual book details retrieval via GET /books/:id REST API
 *  - Accessible modal dialog with keyboard navigation (Escape to close, focus restore)
 *  - Indian Rupee (INR) currency formatting
 *  - Responsive navigation drawer & smooth scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Centralized client-side catalog cache loaded from GET /books
  let cachedBooks = [];
  let currentSearchResults = [];
  let lastFocusedElement = null;

  // ==================== DOM ELEMENTS ====================
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultCount = document.getElementById('searchResultCount');
  const resetCatalogBtn = document.getElementById('resetCatalogBtn');
  const clearSearchActionBtn = document.getElementById('clearSearchActionBtn');

  const booksLoading = document.getElementById('booksLoading');
  const booksError = document.getElementById('booksError');
  const booksErrorMessage = document.getElementById('booksErrorMessage');
  const retryBooksBtn = document.getElementById('retryBooksBtn');
  const emptySearchState = document.getElementById('emptySearchState');
  const booksGrid = document.getElementById('booksGrid');

  // Modal Elements
  const bookModal = document.getElementById('bookModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const modalLoading = document.getElementById('modalLoading');
  const modalError = document.getElementById('modalError');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const modalContent = document.getElementById('modalContent');
  const modalBookImage = document.getElementById('modalBookImage');
  const modalBookId = document.getElementById('modalBookId');
  const modalBookCategory = document.getElementById('modalBookCategory');
  const modalBookTitle = document.getElementById('modalBookTitle');
  const modalBookAuthor = document.getElementById('modalBookAuthor');
  const modalBookPrice = document.getElementById('modalBookPrice');
  const modalBookPages = document.getElementById('modalBookPages');
  const modalBookRating = document.getElementById('modalBookRating');
  const modalBookDescription = document.getElementById('modalBookDescription');

  const currentYearSpan = document.getElementById('currentYear');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==================== 1. NAVBAR & MOBILE NAVIGATION ====================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

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
   * Example: 399 => "₹399"
   */
  function formatINR(price) {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    } catch (e) {
      return `₹${price}`;
    }
  }

  // ==================== 3. CATALOG API INTEGRATION ====================
  /**
   * Fetches books catalog from backend GET /books REST endpoint
   */
  async function fetchBooks() {
    booksLoading.classList.remove('hidden');
    booksError.classList.add('hidden');
    booksGrid.classList.add('hidden');
    emptySearchState.classList.add('hidden');
    if (resetCatalogBtn) resetCatalogBtn.classList.add('hidden');

    try {
      const response = await fetch('/books', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status} (${response.statusText})`);
      }

      const data = await response.json();

      if (data && data.success && Array.isArray(data.books)) {
        cachedBooks = data.books;
        currentSearchResults = [...cachedBooks];
        renderBooks(cachedBooks);
        updateResultCount(cachedBooks.length, cachedBooks.length, '');
      } else {
        throw new Error('API response did not contain a valid books array');
      }
    } catch (error) {
      console.error('Error fetching books catalog:', error);
      booksLoading.classList.add('hidden');
      booksError.classList.remove('hidden');
      if (booksErrorMessage) {
        booksErrorMessage.textContent = `Could not load book catalog: ${error.message}. Please ensure the server is running.`;
      }
    }
  }

  /**
   * Updates the search result counter text
   */
  function updateResultCount(matchingCount, totalCount, query) {
    if (!searchResultCount) return;

    if (!query || query.trim() === '') {
      searchResultCount.textContent = `Showing all ${totalCount} books in collection`;
      if (resetCatalogBtn) resetCatalogBtn.classList.add('hidden');
    } else {
      searchResultCount.textContent = `Found ${matchingCount} ${matchingCount === 1 ? 'book' : 'books'} matching "${query}"`;
      if (resetCatalogBtn) resetCatalogBtn.classList.remove('hidden');
    }
  }

  /**
   * Safely renders book cards into the responsive grid
   */
  function renderBooks(items) {
    booksLoading.classList.add('hidden');

    if (!items || items.length === 0) {
      booksGrid.classList.add('hidden');
      emptySearchState.classList.remove('hidden');
      return;
    }

    emptySearchState.classList.add('hidden');
    booksGrid.innerHTML = '';

    items.forEach((book) => {
      const card = document.createElement('article');
      card.className = 'book-card';
      card.setAttribute('data-id', book.id);
      card.setAttribute('data-category', book.category);

      const formattedPrice = formatINR(book.price);
      const fallbackSrc = 'assets/book-cover-placeholder.svg';

      card.innerHTML = `
        <div class="book-cover-frame">
          <img 
            src="${book.image}" 
            alt="Cover of ${book.title}" 
            class="book-cover-img" 
            loading="lazy"
            onerror="if(this.src !== '${fallbackSrc}') { this.src = '${fallbackSrc}'; }">
          <span class="book-category-badge">${book.category}</span>
          <span class="book-id-tag">#${book.id}</span>
        </div>
        <div class="book-card-body">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">By ${book.author}</p>
          <p class="book-desc">${book.description}</p>
          <div class="book-card-footer">
            <div class="book-price-box">
              <span class="price-label">Price</span>
              <span class="book-price">${formattedPrice}</span>
            </div>
            <button class="view-details-btn" data-id="${book.id}" aria-label="View details for ${book.title}">
              View Details
            </button>
          </div>
        </div>
      `;

      booksGrid.appendChild(card);
    });

    booksGrid.classList.remove('hidden');
    attachViewDetailsEvents();
  }

  // Retry loading catalog button
  if (retryBooksBtn) {
    retryBooksBtn.addEventListener('click', () => {
      fetchBooks();
    });
  }

  // Initial fetch on load
  fetchBooks();

  // ==================== 4. TITLE SEARCH FUNCTIONALITY ====================
  /**
   * Searches books by title:
   *  - Trims whitespace
   *  - Case-insensitive comparison
   *  - Matches partial book titles
   *  - Returns full catalog if query is empty
   */
  function searchBooksByTitle(query, catalog) {
    const normalizedQuery = (query || '').trim().toLowerCase();

    if (!normalizedQuery) {
      return catalog;
    }

    return catalog.filter((book) =>
      book.title && book.title.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Executes the search operation and updates catalog UI
   */
  function executeSearch() {
    const query = searchInput ? searchInput.value : '';
    const trimmedQuery = query.trim();

    // Toggle clear button visibility
    if (clearSearchBtn) {
      if (trimmedQuery.length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }

    // Filter from retrieved in-memory catalog
    currentSearchResults = searchBooksByTitle(trimmedQuery, cachedBooks);
    renderBooks(currentSearchResults);
    updateResultCount(currentSearchResults.length, cachedBooks.length, trimmedQuery);
  }

  /**
   * Clears search input and restores all 10 books
   */
  function resetSearch() {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    if (clearSearchBtn) {
      clearSearchBtn.classList.add('hidden');
    }
    currentSearchResults = [...cachedBooks];
    renderBooks(currentSearchResults);
    updateResultCount(cachedBooks.length, cachedBooks.length, '');
  }

  // Search input listeners
  if (searchInput) {
    // Real-time search as user types
    searchInput.addEventListener('input', () => {
      executeSearch();
    });

    // Enter key support
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch();
        // Scroll to catalog section if searching from hero
        const catalogSection = document.getElementById('catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      executeSearch();
      const catalogSection = document.getElementById('catalog');
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetSearch();
    });
  }

  if (resetCatalogBtn) {
    resetCatalogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetSearch();
    });
  }

  if (clearSearchActionBtn) {
    clearSearchActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetSearch();
    });
  }

  // ==================== 5. INDIVIDUAL BOOK DETAILS (MODAL + GET /books/:id) ====================
  /**
   * Attaches event handlers to all "View Details" buttons
   */
  function attachViewDetailsEvents() {
    const detailButtons = document.querySelectorAll('.view-details-btn');
    detailButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const bookId = e.currentTarget.getAttribute('data-id');
        lastFocusedElement = e.currentTarget;
        if (bookId) {
          openBookModal(bookId);
        }
      });
    });
  }

  /**
   * Opens the book modal and retrieves data from GET /books/:id REST endpoint
   */
  async function openBookModal(id) {
    if (!bookModal) return;

    // Show modal in loading state
    bookModal.classList.remove('hidden');
    modalLoading.classList.remove('hidden');
    modalContent.classList.add('hidden');
    modalError.classList.add('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    try {
      // Call mandatory individual book endpoint: GET /books/:id
      const response = await fetch(`/books/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success && data.book) {
        const book = data.book;

        // Populate modal data safely
        modalBookTitle.textContent = book.title;
        modalBookAuthor.textContent = `By ${book.author}`;
        modalBookPrice.textContent = formatINR(book.price);
        modalBookCategory.textContent = book.category;
        modalBookId.textContent = `ID: #${book.id}`;
        modalBookDescription.textContent = book.description;
        modalBookPages.textContent = `${book.pages || 250} pages`;
        modalBookRating.textContent = `⭐ ${book.rating || 4.8} / 5`;

        // Image with fallback
        const fallbackSrc = 'assets/book-cover-placeholder.svg';
        modalBookImage.src = book.image || fallbackSrc;
        modalBookImage.alt = `Cover of ${book.title}`;
        modalBookImage.onerror = () => {
          modalBookImage.src = fallbackSrc;
        };

        // Reveal content
        modalLoading.classList.add('hidden');
        modalContent.classList.remove('hidden');

        // Set focus inside modal for keyboard accessibility
        if (modalCloseBtn) modalCloseBtn.focus();
      } else {
        throw new Error(data.message || `Failed to retrieve book with ID ${id}`);
      }
    } catch (err) {
      console.error('Error fetching individual book details:', err);
      modalLoading.classList.add('hidden');
      modalError.classList.remove('hidden');
      if (modalErrorMessage) {
        modalErrorMessage.textContent = err.message || 'Unable to retrieve details for this book.';
      }
      if (modalCloseBtn) modalCloseBtn.focus();
    }
  }

  /**
   * Closes the book modal and restores keyboard focus
   */
  function closeBookModal() {
    if (!bookModal) return;
    bookModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore background scrolling

    // Restore keyboard focus to the triggering "View Details" button
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Close modal button listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeBookModal);
  }

  if (modalCloseActionBtn) {
    modalCloseActionBtn.addEventListener('click', closeBookModal);
  }

  // Close modal when clicking on the backdrop
  if (bookModal) {
    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) {
        closeBookModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookModal && !bookModal.classList.contains('hidden')) {
      closeBookModal();
    }
  });
});

