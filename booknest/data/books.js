/**
 * BookNest - Centralized Bookstore Catalog Data Source
 * Contains all 10 sample books required for Set 3: Online Bookstore Website.
 * Each item contains:
 *  - id: Unique numeric identifier
 *  - title: Book title
 *  - author: Author(s)
 *  - price: Numeric price in Indian Rupees (INR)
 *  - currency: "INR"
 *  - category: Literary genre / classification
 *  - description: Detailed, engaging synopsis
 *  - image: Primary book cover image (or local SVG fallback)
 *  - pages: Number of pages
 *  - rating: Customer star rating (out of 5)
 */

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 399,
    currency: "INR",
    category: "Fiction",
    description: "A philosophical novel about following dreams and discovering one's personal journey. It recounts the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of worldly treasure.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    pages: 208,
    rating: 4.8
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    currency: "INR",
    category: "Self-Help",
    description: "A practical guide to building good habits and improving behavior through small changes. Backed by proven neuroscience and psychology, James Clear reveals how tiny changes can produce remarkable results.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    pages: 320,
    rating: 4.9
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 650,
    currency: "INR",
    category: "Programming",
    description: "Principles and practices for writing readable, maintainable software. Uncle Bob presents a revolutionary paradigm that will instill within you the values of a software craftsman and make you a better programmer.",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?auto=format&fit=crop&w=600&q=80",
    pages: 464,
    rating: 4.7
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    price: 350,
    currency: "INR",
    category: "Finance",
    description: "Lessons about financial literacy, assets, liabilities, and personal finance. Robert shares what the rich teach their kids about money that the poor and middle class do not.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    pages: 336,
    rating: 4.6
  },
  {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    price: 450,
    currency: "INR",
    category: "Fantasy",
    description: "A young wizard discovers a magical world and begins his journey at Hogwarts. Rescued from the outrageous neglect of his aunt and uncle, Harry enters an enchanted school where magic is taught.",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80",
    pages: 352,
    rating: 4.9
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 420,
    currency: "INR",
    category: "Finance",
    description: "Essays exploring how people think about money, risk, wealth, and financial decisions. Doing well with money isn't necessarily about what you know; it's about how you behave.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80",
    pages: 256,
    rating: 4.8
  },
  {
    id: 7,
    title: "Deep Work",
    author: "Cal Newport",
    price: 380,
    currency: "INR",
    category: "Productivity",
    description: "A guide to focused work and producing valuable results with fewer distractions. Deep work is the superpower to focus without distraction on a cognitively demanding task in an increasingly distracted world.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    pages: 304,
    rating: 4.7
  },
  {
    id: 8,
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    price: 299,
    currency: "INR",
    category: "Self-Help",
    description: "An exploration of purpose, daily routines, and finding meaning in life. The Japanese secret to a long and happy life encourages readers to discover their reason for being.",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    pages: 208,
    rating: 4.5
  },
  {
    id: 9,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen and co-authors",
    price: 899,
    currency: "INR",
    category: "Computer Science",
    description: "A comprehensive introduction to algorithm design and analysis. Widely used as the definitive textbook in universities worldwide, covering algorithmic techniques, graph algorithms, and data structures.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    pages: 1312,
    rating: 4.9
  },
  {
    id: 10,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 320,
    currency: "INR",
    category: "Personal Development",
    description: "A classic personal development book about goals, mindset, and achievement. Napoleon Hill distills insights from interviewing over five hundred of America's most affluent leaders into thirteen success principles.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    pages: 238,
    rating: 4.6
  }
];

module.exports = books;

