export const personalInfo = {
  name: "Syed Shayan Arshad",
  title: "AI / Machine Learning Engineer",
  email: "syedshayanarshad.1@gmail.com",
  phone: "+92 3334412941",
  linkedin: "https://www.linkedin.com/in/syedshayanarshad/",
  github: "https://github.com/syedshayanarshad",
  location: "Lahore, Pakistan",
  stats: [
    { label: "Projects", value: 5, suffix: "+", decimals: 0 },
    { label: "Internships", value: 2, suffix: "", decimals: 0 },
    { label: "Technologies", value: 20, suffix: "+", decimals: 0 },
    { label: "Years", value: 2, suffix: "+", decimals: 0 },
  ],
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: "deep-learning" | "machine-learning" | "time-series" | "full-stack";
  categoryLabel: string;
  tech: string[];
  highlights: string[];
  outcomes?: string[];
  deployment?: string;
  github?: string;
  demo?: string;
  accent: string;
  // Visual preview fields
  thumbnail?: string;     // Main card image
  images?: string[];      // Carousel images for modal
  gif?: string;          // Animated GIF for hover preview
  video?: string;        // Video demo URL (YouTube/Loom embed)
};

export const projects: Project[] = [
  {
    id: "plant-disease",
    title: "Plant Disease Classification",
    description:
      "Deep learning system for plant disease detection using transfer learning, with visual interpretability and production-ready deployment.",
    category: "deep-learning",
    categoryLabel: "Deep Learning",
    tech: ["Python", "TensorFlow", "VGG16", "Inception", "Grad-CAM", "Streamlit"],
    highlights: [
      "CNN model using VGG16 + Inception architecture with transfer learning",
      "Grad-CAM visual interpretability for explainable AI decisions",
      "Deployed with Streamlit for real-time image inference",
    ],
    outcomes: [
      "Achieved high classification accuracy across multiple disease categories",
      "Grad-CAM heatmaps provide transparent model reasoning for end users",
      "Production-ready Streamlit app with instant inference on uploaded images",
    ],
    deployment: "Streamlit",
    accent: "#f472b6",
    thumbnail: "/plant/thumbnail.png",
    images: [
      "/plant/1.png",
      "/plant/2.png",
    ],
  },
  {
    id: "crypto-volatility",
    title: "Crypto Volatility Forecaster",
    description:
      "Time-series forecasting system predicting cryptocurrency volatility with live market data integration and trading signal generation.",
    category: "time-series",
    categoryLabel: "Time Series",
    tech: ["Python", "LSTM", "GRU", "RNN", "Streamlit", "Hugging Face"],
    highlights: [
      "Multi-model comparison: LSTM, GRU, and Vanilla RNN architectures",
      "Live market API integration for real-time data ingestion",
      "Volatility-based trading signal generation with confidence scores",
      "Deployed on Streamlit + Hugging Face Spaces",
    ],
    outcomes: [
      "Compared 3 RNN variants to identify the best forecasting architecture",
      "Real-time pipeline from market API to model prediction",
      "Actionable buy/sell signals based on predicted volatility thresholds",
    ],
    deployment: "Streamlit + Hugging Face",
    accent: "#8b5cf6",
    thumbnail: "/crypto/thumbnail.png",
    images: [
      "/crypto/1.png",
      "/crypto/2.png",
      "/crypto/3.png",
    ],
  },
  {
    id: "movie-recommendation",
    title: "Movie Recommendation System",
    description:
      "Scalable collaborative filtering recommendation engine built with PySpark ALS, handling large-scale datasets with an interactive UI.",
    category: "machine-learning",
    categoryLabel: "Machine Learning",
    tech: ["Python", "PySpark", "ALS", "Collaborative Filtering", "Gradio"],
    highlights: [
      "PySpark ALS collaborative filtering designed for distributed scale",
      "Handles large-scale movie rating datasets efficiently",
      "Interactive Gradio UI for real-time personalized recommendations",
    ],
    outcomes: [
      "Scalable to millions of user-item interactions via PySpark",
      "Personalized recommendations based on user rating history",
      "Gradio interface enables live demo without any code required",
    ],
    deployment: "Gradio",
    accent: "#a78bfa",
    thumbnail: "/movie/thumbnail.png",
    images: [
      "/movie/1.png",
      "/movie/2.png",
    ],
  },
  {
    id: "aqi-prediction",
    title: "AQI Prediction & Analysis",
    description:
      "Comprehensive air quality analysis system trained on 10,000+ records with ensemble ML models and unsupervised pattern discovery.",
    category: "machine-learning",
    categoryLabel: "Machine Learning",
    tech: ["Python", "SVM", "KNN", "Random Forest", "PCA", "K-Means", "Scikit-learn"],
    highlights: [
      "Analyzed 10,000+ air quality records across multiple cities",
      "Ensemble models: SVM, KNN, Random Forest with cross-validation",
      "PCA dimensionality reduction + K-Means pattern clustering",
      "Unsupervised discovery of pollution patterns and regional trends",
    ],
    outcomes: [
      "Processed and cleaned 10,000+ real-world air quality records",
      "Ensemble approach outperformed individual models on test set",
      "K-Means revealed distinct pollution clusters by geography and season",
    ],
    accent: "#10b981",
    thumbnail: "/aqi/thumbnail.png",
    images: [
      "/aqi/1.png",
      "/aqi/2.png",
      "/aqi/3.png",
      "/aqi/4.png",
      "/aqi/5.png",
    ],
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    description:
      "Full-stack web application with real-time stock tracking, purchase/sales management, and comprehensive reporting dashboard.",
    category: "full-stack",
    categoryLabel: "Full Stack",
    tech: ["Next.js", "Prisma", "MySQL", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Full-stack Next.js with Prisma ORM and MySQL database",
      "Real-time stock tracking with low-inventory alerts",
      "Purchase and sales management with transaction history",
      "Comprehensive reporting dashboard with data visualization",
    ],
    outcomes: [
      "End-to-end full-stack implementation with type-safe Prisma schema",
      "Real-time stock alerts prevent inventory shortages",
      "Single dashboard for purchasing, sales, and reporting workflows",
    ],
    accent: "#f59e0b",
    thumbnail: "/inventory/thumbnail.png",
    images: [
      "/inventory/1.png",
      "/inventory/2.png",
      "/inventory/3.png",
      "/inventory/4.png",
      "/inventory/5.png",
      "/inventory/6.png",
      "/inventory/7.png",
    ],
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "deep-learning", label: "Deep Learning" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "time-series", label: "Time Series" },
  { id: "full-stack", label: "Full Stack" },
] as const;

export type Skill = {
  name: string;
  proficiency: number; // 0-100
  category: string;
  color: string;
  icon?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  accent: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ml-dl",
    title: "ML & Deep Learning",
    accent: "#f472b6",
    skills: [
      { name: "TensorFlow", proficiency: 90, category: "ml-dl", color: "#FF6F00" },
      { name: "PyTorch", proficiency: 85, category: "ml-dl", color: "#EE4C2C" },
      { name: "Scikit-learn", proficiency: 95, category: "ml-dl", color: "#F7931E" },
      { name: "Keras", proficiency: 90, category: "ml-dl", color: "#D00000" },
      { name: "Hugging Face", proficiency: 80, category: "ml-dl", color: "#FFD21E" },
      { name: "OpenCV", proficiency: 85, category: "ml-dl", color: "#5C3EE8" },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    accent: "#10b981",
    skills: [
      { name: "Python", proficiency: 95, category: "data-science", color: "#3776AB" },
      { name: "Pandas", proficiency: 95, category: "data-science", color: "#150458" },
      { name: "NumPy", proficiency: 90, category: "data-science", color: "#013243" },
      { name: "PySpark", proficiency: 80, category: "data-science", color: "#E25A1C" },
      { name: "SQL", proficiency: 85, category: "data-science", color: "#00758F" },
      { name: "Jupyter", proficiency: 90, category: "data-science", color: "#F37626" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & Tools",
    accent: "#8b5cf6",
    skills: [
      { name: "Streamlit", proficiency: 90, category: "deployment", color: "#FF4B4B" },
      { name: "FastAPI", proficiency: 85, category: "deployment", color: "#009688" },
      { name: "Docker", proficiency: 80, category: "deployment", color: "#2496ED" },
      { name: "Git", proficiency: 90, category: "deployment", color: "#F05032" },
      { name: "AWS", proficiency: 70, category: "deployment", color: "#FF9900" },
      { name: "Linux", proficiency: 85, category: "deployment", color: "#FCC624" },
    ],
  },
];
