/**
 * CampusEnroll - Centralized Course Data Source
 * Contains all 8 academic and professional courses required for Set 2.
 * Each course contains:
 *  - id: Unique numeric identifier
 *  - title: Official course name
 *  - category: Department/Subject classification
 *  - duration: Course length in weeks
 *  - fee: Numeric course tuition fee in INR
 *  - currency: "INR"
 *  - description: Educational course overview
 *  - icon: SVG glyph / icon key for visual enhancement
 *  - badge: Popularity or difficulty badge
 */

const courses = [
  {
    id: 101,
    title: "Web Development",
    category: "Programming",
    duration: "12 weeks",
    fee: 8000,
    currency: "INR",
    description: "Learn HTML, CSS, JavaScript, and responsive website development.",
    icon: "🌐",
    badge: "Most Popular",
    level: "Beginner to Intermediate"
  },
  {
    id: 102,
    title: "Python Programming",
    category: "Programming",
    duration: "10 weeks",
    fee: 6000,
    currency: "INR",
    description: "Learn Python fundamentals, functions, data structures, and problem-solving.",
    icon: "🐍",
    badge: "Foundational",
    level: "Beginner"
  },
  {
    id: 103,
    title: "Data Science Fundamentals",
    category: "Data Science",
    duration: "16 weeks",
    fee: 12000,
    currency: "INR",
    description: "Explore data analysis, statistics, data visualization, and introductory machine learning.",
    icon: "📊",
    badge: "High Demand",
    level: "Intermediate"
  },
  {
    id: 104,
    title: "Artificial Intelligence",
    category: "Artificial Intelligence",
    duration: "16 weeks",
    fee: 15000,
    currency: "INR",
    description: "Understand AI fundamentals, intelligent systems, and introductory machine learning techniques.",
    icon: "🤖",
    badge: "Advanced Specialization",
    level: "Advanced"
  },
  {
    id: 105,
    title: "Cloud Computing",
    category: "Cloud Computing",
    duration: "12 weeks",
    fee: 10000,
    currency: "INR",
    description: "Learn cloud fundamentals, virtual machines, storage, and cloud deployment concepts.",
    icon: "☁️",
    badge: "Industry Certified",
    level: "Intermediate"
  },
  {
    id: 106,
    title: "Cybersecurity Basics",
    category: "Cybersecurity",
    duration: "10 weeks",
    fee: 7000,
    currency: "INR",
    description: "Understand network security, common threats, and essential security practices.",
    icon: "🛡️",
    badge: "Essential Security",
    level: "Beginner to Intermediate"
  },
  {
    id: 107,
    title: "Database Management Systems",
    category: "Databases",
    duration: "8 weeks",
    fee: 5000,
    currency: "INR",
    description: "Learn relational databases, SQL queries, database design, and normalization.",
    icon: "🗄️",
    badge: "Core Engineering",
    level: "Beginner"
  },
  {
    id: 108,
    title: "Mobile App Development",
    category: "App Development",
    duration: "14 weeks",
    fee: 11000,
    currency: "INR",
    description: "Learn the fundamentals of mobile application design and development.",
    icon: "📱",
    badge: "Hands-on Project",
    level: "Intermediate"
  }
];

module.exports = courses;

