// ============================================
// MOVIE DATA (extended with genres, category, sentimentScore)
// ============================================

const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: "2008",
    genres: ["Action", "Drama", "Thriller"],
    category: "Action",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "This movie is absolutely fantastic! The acting was superb, especially Heath Ledger's performance as the Joker. The plot was engaging, and I was on the edge of my seat the entire time. The cinematography and direction are flawless. Highly recommend to everyone!",
    sentimentScore: 0.93,
    description:
      "A gritty, grounded superhero crime saga that redefined comic book films with unforgettable performances and tension."
  },
  {
    id: 2,
    title: "Inception",
    year: "2010",
    genres: ["Sci‑Fi", "Thriller"],
    category: "Sci‑Fi",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "One of the best films I've ever seen. The cinematography is breathtaking, the soundtrack is perfect, and the emotional depth is incredible. Christopher Nolan has created a masterpiece that challenges the mind and touches the heart.",
    sentimentScore: 0.95,
    description:
      "Reality‑bending heists inside dreams, layered with emotional stakes and a thunderous Hans Zimmer score."
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: "1994",
    genres: ["Drama", "Crime"],
    category: "Drama",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "I loved every minute of this movie! The characters are well-developed, the dialogue is witty and memorable, and the non-linear storytelling is brilliant. The ending was perfect. Can't wait to watch it again!",
    sentimentScore: 0.9,
    description:
      "A stylish, nonlinear crime tapestry packed with razor‑sharp dialogue and unforgettable characters."
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    year: "1994",
    genres: ["Drama"],
    category: "Drama",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "An outstanding performance by the entire cast. The story is compelling and the direction is flawless. This is cinema at its finest! A timeless classic that everyone should watch.",
    sentimentScore: 0.97,
    description:
      "A powerful, hopeful prison drama about friendship, perseverance, and freedom."
  },
  {
    id: 5,
    title: "Interstellar",
    year: "2014",
    genres: ["Sci‑Fi", "Drama"],
    category: "Sci‑Fi",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "A visually stunning masterpiece with incredible emotional depth. The scientific accuracy combined with human drama creates an unforgettable experience. The score by Hans Zimmer is phenomenal.",
    sentimentScore: 0.92,
    description:
      "A sweeping space odyssey about love, time, and survival across the stars, anchored by a soaring score."
  },
  {
    id: 6,
    title: "The Matrix",
    year: "1999",
    genres: ["Sci‑Fi", "Action"],
    category: "Sci‑Fi",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "Revolutionary filmmaking that changed cinema forever. The visual effects are groundbreaking, the philosophy is thought-provoking, and the action sequences are mind-blowing. A true sci-fi classic!",
    sentimentScore: 0.94,
    description:
      "Reality is a simulation in this genre‑defining cyberpunk action film that mixes philosophy and bullet time."
  },
  {
    id: 7,
    title: "Fight Club",
    year: "1999",
    genres: ["Drama", "Thriller"],
    category: "Thriller",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "This film is terrible. The plot makes no sense, the acting is wooden, and I wasted two hours of my life. The violence is gratuitous and the message is confusing. Do not watch this movie!",
    sentimentScore: 0.18,
    description:
      "A brutal, provocative satire of consumer culture and masculinity that sharply divides audiences."
  },
  {
    id: 8,
    title: "Batman v Superman",
    year: "2016",
    genres: ["Action", "Superhero"],
    category: "Action",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "I was extremely disappointed. The movie is boring, poorly written, and the special effects look cheap. The plot is convoluted and the characters are underdeveloped. Save your money and time!",
    sentimentScore: 0.22,
    description:
      "A visually striking but narratively messy clash of titans that left many viewers divided."
  },
  {
    id: 9,
    title: "The Last Airbender",
    year: "2010",
    genres: ["Fantasy", "Adventure"],
    category: "Fantasy",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "What a waste of time! The characters are unlikeable, the story is predictable, and the dialogue is cringe-worthy. The adaptation completely misses the spirit of the original. I regret watching this.",
    sentimentScore: 0.12,
    description:
      "An infamous live‑action adaptation that struggles to capture the heart and humor of its beloved source."
  },
  {
    id: 10,
    title: "Catwoman",
    year: "2004",
    genres: ["Action"],
    category: "Action",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "This is one of the worst movies I've ever seen. Nothing works - not the script, not the acting, not the direction. The action scenes are poorly choreographed and the plot is nonsensical. Completely awful!",
    sentimentScore: 0.08,
    description:
      "A notorious superhero misfire known more for its camp than its crime‑fighting."
  },
  {
    id: 11,
    title: "Parasite",
    year: "2019",
    genres: ["Thriller", "Drama"],
    category: "Thriller",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "Brilliant filmmaking from start to finish! The social commentary is sharp, the performances are outstanding, and the plot twists are masterfully executed. A perfect blend of thriller and dark comedy.",
    sentimentScore: 0.96,
    description:
      "A darkly comic thriller that slices into class, privilege, and survival with surgical precision."
  },
  {
    id: 12,
    title: "Spirited Away",
    year: "2001",
    genres: ["Animation", "Fantasy"],
    category: "Animation",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "A beautiful animated masterpiece that captures the imagination. The artistry is stunning, the story is enchanting, and the characters are unforgettable. Studio Ghibli at its absolute best!",
    sentimentScore: 0.97,
    description:
      "A breathtaking journey through a spirit world full of wonder, detail, and emotional warmth."
  },
  {
    id: 13,
    title: "Mad Max: Fury Road",
    year: "2015",
    genres: ["Action"],
    category: "Action",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "An adrenaline-fueled action masterpiece! The practical effects are incredible, the cinematography is breathtaking, and the world-building is immersive. Non-stop excitement from beginning to end.",
    sentimentScore: 0.93,
    description:
      "A relentless, visually explosive chase across the wasteland with practical stunts and bold style."
  },
  {
    id: 14,
    title: "Get Out",
    year: "2017",
    genres: ["Thriller", "Horror"],
    category: "Thriller",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "Genius horror-thriller with brilliant social commentary. The tension builds perfectly, the performances are excellent, and the twist is shocking. Jordan Peele has created something truly special.",
    sentimentScore: 0.94,
    description:
      "A razor‑sharp horror thriller that blends scares with incisive commentary on race and identity."
  },
  {
    id: 15,
    title: "The Godfather",
    year: "1972",
    genres: ["Drama", "Crime"],
    category: "Drama",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "A cinematic masterpiece that defines excellence. The storytelling is perfect, the performances are legendary, and the direction is flawless. This is why we go to the movies. Pure perfection!",
    sentimentScore: 0.99,
    description:
      "A towering epic of power, family, and loyalty that became the gold standard for crime dramas."
  },
  {
    id: 16,
    title: "Blade Runner 2049",
    year: "2017",
    genres: ["Sci‑Fi"],
    category: "Sci‑Fi",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "Visually stunning and emotionally profound. The cinematography is some of the best ever captured on film. The story is thought-provoking and the performances are excellent. A worthy sequel.",
    sentimentScore: 0.9,
    description:
      "A hauntingly beautiful sequel that deepens the questions of identity, memory, and humanity."
  },
  {
    id: 17,
    title: "Dunkirk",
    year: "2017",
    genres: ["War", "Thriller"],
    category: "Thriller",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "Intense and immersive war film. The non-linear narrative creates incredible tension. The practical effects and cinematography are outstanding. A masterclass in filmmaking.",
    sentimentScore: 0.88,
    description:
      "A visceral, time‑bending war thriller that drops you directly onto the beaches and in the skies."
  },
  {
    id: 18,
    title: "Whiplash",
    year: "2014",
    genres: ["Drama"],
    category: "Drama",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop",
    review:
      "Incredibly intense and emotionally gripping. The performances are outstanding, especially J.K. Simmons. The editing and sound design create an almost unbearable tension. Absolutely brilliant!",
    sentimentScore: 0.93,
    description:
      "An electrifying clash between student and teacher about perfection, obsession, and sacrifice."
  },
  {
    id: 19,
    title: "The Revenant",
    year: "2015",
    genres: ["Drama"],
    category: "Drama",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    review:
      "Visually breathtaking with incredible cinematography. Leonardo DiCaprio's performance is raw and powerful. The survival story is gripping and the natural lighting is stunning. A cinematic achievement.",
    sentimentScore: 0.86,
    description:
      "A brutal survival saga in frozen wilderness, captured with natural light and visceral intensity."
  },
  {
    id: 20,
    title: "Her",
    year: "2013",
    genres: ["Romance", "Sci‑Fi"],
    category: "Romance",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600&h=900&fit=crop",
    review:
      "Beautiful, thoughtful, and emotionally resonant. The futuristic setting feels authentic and the love story is surprisingly touching. The cinematography and score create a dreamlike atmosphere. A modern classic.",
    sentimentScore: 0.92,
    description:
      "A tender, futuristic romance exploring connection and loneliness in a near‑future digital world."
  }
];

// Categories for carousels
const categories = [
  "Drama",
  "Sci‑Fi",
  "Action",
  "Romance",
  "Comedy",
  "Thriller",
  "Animation",
  "Fantasy"
];

// ============================================
// DOM ELEMENTS
// ============================================

const moviesGrid = document.getElementById("moviesGrid");
const categoriesContainer = document.getElementById("categoriesContainer");

// Analyzer
const reviewInput = document.getElementById("reviewInput");
const predictBtn = document.getElementById("predictBtn");
const buttonLoader = document.getElementById("buttonLoader");
const resultContainer = document.getElementById("resultContainer");
const resultBox = document.getElementById("resultBox");
const resultIcon = document.getElementById("resultIcon");
const resultValue = document.getElementById("resultValue");
const resultConfidence = document.getElementById("resultConfidence");
const errorBox = document.getElementById("errorBox");
const userRatingDisplay = document.getElementById("userRatingDisplay");
const analysisSummary = document.getElementById("analysisSummary");

// Navigation and theme
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Hero buttons
const heroAnalyzeBtn = document.getElementById("heroAnalyzeBtn");
const heroBrowseBtn = document.getElementById("heroBrowseBtn");

// Trending
const overallPositivityEl = document.getElementById("overallPositivity");
const overallPositivityBar = document.getElementById("overallPositivityBar");
const overallCountsEl = document.getElementById("overallCounts");
const topPositiveList = document.getElementById("topPositiveList");
const topNegativeList = document.getElementById("topNegativeList");

// Modal
const movieModal = document.getElementById("movieModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalPoster = document.getElementById("modalPoster");
const modalTitleEl = document.getElementById("modalTitle");
const modalYearEl = document.getElementById("modalYear");
const modalGenresEl = document.getElementById("modalGenres");
const modalDescriptionEl = document.getElementById("modalDescription");
const modalAnalyzeBtn = document.getElementById("modalAnalyzeBtn");
const modalUseInAnalyzerBtn = document.getElementById("modalUseInAnalyzerBtn");

// Charts
let pieChart;
let barChart;
let lineChart;

// State
let currentMovie = null;
let analyzerRating = 0;
let modalRating = 0;
let sentimentStats = {
  positive: 0,
  negative: 0,
  total: 0
};
let sentimentHistory = []; // For line chart

// ============================================
// UTILITIES
// ============================================

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navHeight =
    document.querySelector(".navbar")?.offsetHeight ?? 64;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

  window.scrollTo({ top, behavior: "smooth" });
}

function setActiveNavLink(sectionId) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });
}

function normalizeNumber(value) {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

// ============================================
// THEME / DARK MODE
// ============================================

function applyThemeFromStorage() {
  const saved = localStorage.getItem("cine-theme");
  if (saved === "light") {
    document.body.classList.add("light-mode");
    themeIcon.textContent = "🌙";
  } else {
    document.body.classList.remove("light-mode");
    themeIcon.textContent = "🌞";
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains("light-mode");
  if (isLight) {
    document.body.classList.remove("light-mode");
    localStorage.setItem("cine-theme", "dark");
    themeIcon.textContent = "🌞";
  } else {
    document.body.classList.add("light-mode");
    localStorage.setItem("cine-theme", "light");
    themeIcon.textContent = "🌙";
  }
}

// ============================================
// STAR RATING WIDGET
// ============================================

function setupStarRating(containerId, onChange) {
  const container = document.getElementById(containerId);
  if (!container) return { getValue: () => 0, setValue: () => {} };

  const stars = Array.from(container.querySelectorAll("span"));
  let value = 0;
  let hoverValue = 0;

  function refresh() {
    stars.forEach((star) => {
      const v = Number(star.dataset.value);
      star.classList.toggle("active", v <= value);
      star.classList.toggle("hovered", hoverValue && v <= hoverValue);
    });
  }

  stars.forEach((star) => {
    const v = Number(star.dataset.value);
    star.addEventListener("mouseenter", () => {
      hoverValue = v;
      refresh();
    });
    star.addEventListener("mouseleave", () => {
      hoverValue = 0;
      refresh();
    });
    star.addEventListener("click", () => {
      value = v;
      refresh();
      onChange?.(value);
    });
  });

  return {
    getValue() {
      return value;
    },
    setValue(newVal) {
      value = newVal || 0;
      refresh();
      onChange?.(value);
    }
  };
}

// ============================================
// MOVIE RENDERING
// ============================================

function renderFeaturedMovies() {
  if (!moviesGrid) return;
  moviesGrid.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.id = movie.id;

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy" />
      <div class="movie-overlay-gradient"></div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-meta-line">
          <span>${movie.year}</span>
          <span>${movie.genres.slice(0, 2).join(" · ")}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openMovieModal(movie));
    moviesGrid.appendChild(card);
  });
}

function renderCategories() {
  if (!categoriesContainer) return;
  categoriesContainer.innerHTML = "";

  categories.forEach((cat) => {
    const catMovies = movies.filter((m) => m.category === cat);
    if (!catMovies.length) return;

    const block = document.createElement("div");
    block.className = "category-block";

    block.innerHTML = `
      <div class="category-header">
        <div class="category-title">${cat}</div>
      </div>
      <div class="category-scroller"></div>
    `;

    const scroller = block.querySelector(".category-scroller");

    catMovies.forEach((movie) => {
      const item = document.createElement("div");
      item.className = "category-card";
      item.dataset.id = movie.id;
      item.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}"
             class="category-poster" loading="lazy" />
        <div class="category-info">
          <div>${movie.title}</div>
          <div style="color: var(--text-secondary); font-size: .75rem;">
            ${movie.year} • ${movie.genres[0] || ""}
          </div>
        </div>
      `;
      item.addEventListener("click", () => openMovieModal(movie));
      scroller.appendChild(item);
    });

    categoriesContainer.appendChild(block);
  });
}

// ============================================
// TRENDING SECTION
// ============================================

function computeStaticTrending() {
  const sortedByScore = [...movies].sort(
    (a, b) => b.sentimentScore - a.sentimentScore
  );
  const topPositive = sortedByScore.slice(0, 3);
  const topNegative = [...sortedByScore].reverse().slice(0, 3);

  // Use static scores to seed stats
  const posCount = sortedByScore.filter((m) => m.sentimentScore >= 0.5).length;
  const negCount = sortedByScore.length - posCount;

  sentimentStats.positive = posCount;
  sentimentStats.negative = negCount;
  sentimentStats.total = sortedByScore.length;

  return { topPositive, topNegative };
}

function renderTrending() {
  const { topPositive, topNegative } = computeStaticTrending();

  const { positive, negative, total } = sentimentStats;
  const positivityPct = total ? Math.round((positive / total) * 100) : 0;

  if (overallPositivityEl) {
    overallPositivityEl.textContent = `${positivityPct}%`;
  }
  if (overallPositivityBar) {
    overallPositivityBar.style.width = `${positivityPct}%`;
  }
  if (overallCountsEl) {
    overallCountsEl.innerHTML = `
      <span>Positive: ${positive}</span>
      <span>Negative: ${negative}</span>
    `;
  }

  function renderList(container, items, isPositive) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach((movie) => {
      const row = document.createElement("div");
      row.className = "trending-item";
      const label = isPositive ? "Positive" : "Negative";
      const pct = Math.round(movie.sentimentScore * 100);
      row.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="trending-poster" loading="lazy" />
        <div class="trending-info">
          <div class="trending-title">${movie.title}</div>
          <div class="trending-score">${label} • ${pct}%</div>
        </div>
      `;
      row.addEventListener("click", () => openMovieModal(movie));
      container.appendChild(row);
    });
  }

  renderList(topPositiveList, topPositive, true);
  renderList(topNegativeList, topNegative, false);
}

function renderTrendingOverviewOnly() {
  const { positive, negative, total } = sentimentStats;
  if (!total) return;
  const positivityPct = Math.round((positive / total) * 100);

  if (overallPositivityEl) {
    overallPositivityEl.textContent = `${positivityPct}%`;
  }
  if (overallPositivityBar) {
    overallPositivityBar.style.width = `${positivityPct}%`;
  }
  if (overallCountsEl) {
    overallCountsEl.innerHTML = `
      <span>Positive: ${positive}</span>
      <span>Negative: ${negative}</span>
    `;
  }
}

// ============================================
// MODAL
// ============================================

function openMovieModal(movie) {
  currentMovie = movie;
  if (!movieModal) return;

  modalPoster.src = movie.poster;
  modalPoster.alt = movie.title;
  modalTitleEl.textContent = movie.title;
  modalYearEl.textContent = movie.year;
  modalGenresEl.textContent = movie.genres.join(" · ");
  modalDescriptionEl.textContent =
    movie.description || "No description available.";

  modalRatingControl.setValue(0);

  movieModal.classList.add("open");
  movieModal.setAttribute("aria-hidden", "false");
}

function closeMovieModal() {
  if (!movieModal) return;
  movieModal.classList.remove("open");
  movieModal.setAttribute("aria-hidden", "true");
}

function handleModalOutsideClick(e) {
  if (e.target === movieModal) {
    closeMovieModal();
  }
}

// ============================================
// ANALYZER & BACKEND INTEGRATION
// ============================================

const API_URL = "http://localhost:8080/predict";

function showError(message) {
  if (!errorBox) return;
  errorBox.textContent = `Error: ${message}`;
  errorBox.classList.add("active");
}

function hideError() {
  if (!errorBox) return;
  errorBox.classList.remove("active");
}

function hideResult() {
  if (!resultContainer) return;
  resultContainer.classList.remove("active");
}

function updateSentimentStats(isPositive) {
  if (isPositive) {
    sentimentStats.positive += 1;
  } else {
    sentimentStats.negative += 1;
  }
  sentimentStats.total += 1;

  renderTrendingOverviewOnly();
  updateChartsFromStats(isPositive);
}

async function analyzeSentiment(reviewText, sourceLabel) {
  try {
    if (predictBtn) predictBtn.disabled = true;
    if (buttonLoader) buttonLoader.classList.add("active");
    hideError();
    hideResult();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: reviewText })
    });

    if (!res.ok) {
      let msg = `Server error: ${res.status} ${res.statusText}`;
      try {
        const errData = await res.json();
        msg = errData.error || errData.message || msg;
      } catch {
        // ignore
      }
      throw new Error(msg);
    }

    const data = await res.json();
    displayResult(data, sourceLabel);
  } catch (err) {
    console.error("Error analyzing sentiment:", err);
    let msg = "Failed to connect to the backend. ";
    if (
      err.message.includes("Failed to fetch") ||
      err.message.includes("NetworkError")
    ) {
      msg += "Please make sure the server is running on http://localhost:8080";
    } else {
      msg += err.message;
    }
    showError(msg);
  } finally {
    if (predictBtn) predictBtn.disabled = false;
    if (buttonLoader) buttonLoader.classList.remove("active");
  }
}

function displayResult(data, sourceLabel) {
  if (!resultBox || !resultIcon || !resultValue) return;

  const sentimentValue = (data.sentiment || "").toString().toLowerCase();
  const predictionValue = normalizeNumber(data.prediction);
  const positiveProb = normalizeNumber(data.positiveProbability);
  const negativeProb = normalizeNumber(data.negativeProbability);
  const explicitConfidence = normalizeNumber(data.confidence);

  let isPositive;
  if (
    sentimentValue === "positive" ||
    sentimentValue === "pos" ||
    sentimentValue === "1"
  ) {
    isPositive = true;
  } else if (
    sentimentValue === "negative" ||
    sentimentValue === "neg" ||
    sentimentValue === "0"
  ) {
    isPositive = false;
  } else if (predictionValue !== null) {
    isPositive = predictionValue === 1;
  } else if (positiveProb !== null && negativeProb !== null) {
    isPositive = positiveProb >= negativeProb;
  } else {
    console.warn("Unable to determine sentiment, defaulting to negative.", data);
    isPositive = false;
  }

  resultBox.className = "result-box " + (isPositive ? "positive" : "negative");
  resultIcon.textContent = isPositive ? "✔️" : "❌";
  resultValue.textContent = isPositive ? "Positive" : "Negative";

  const resolvedConfidence =
    explicitConfidence ?? (isPositive ? positiveProb : negativeProb);
  if (resultConfidence) {
    if (resolvedConfidence !== null && !Number.isNaN(resolvedConfidence)) {
      resultConfidence.textContent = `Confidence: ${(resolvedConfidence *
        100).toFixed(2)}%`;
      resultConfidence.style.display = "block";
    } else {
      resultConfidence.textContent = "";
      resultConfidence.style.display = "none";
    }
  }

  if (resultContainer) {
    resultContainer.classList.add("active");
    setTimeout(() => {
      resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  const currentRating = analyzerRating || modalRating || 0;
  if (userRatingDisplay) {
    if (currentRating > 0) {
      userRatingDisplay.textContent = `Your Rating: ${"★".repeat(
        currentRating
      )}${"☆".repeat(5 - currentRating)}`;
    } else {
      userRatingDisplay.textContent = "Your Rating: (not set)";
    }
  }
  if (analysisSummary) {
    const src = sourceLabel || "Custom review";
    analysisSummary.textContent = `Our ML Analysis: ${
      isPositive ? "Positive" : "Negative"
    } from "${src}".`;
  }

  updateSentimentStats(isPositive);
}

// ============================================
// CHARTS
// ============================================

function initCharts() {
  const pieCtx = document.getElementById("sentimentPie")?.getContext("2d");
  const barCtx = document.getElementById("sentimentBar")?.getContext("2d");
  const lineCtx = document.getElementById("sentimentLine")?.getContext("2d");

  const { positive, negative } = sentimentStats;

  if (pieCtx) {
    pieChart = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Positive", "Negative"],
        datasets: [
          {
            data: [positive || 1, negative || 1],
            backgroundColor: ["#22c55e", "#ef4444"]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#e5e7eb", font: { size: 11 } }
          }
        }
      }
    });
  }

  if (barCtx) {
    const labels = movies.slice(0, 10).map((m) => m.title);
    const scores = movies.slice(0, 10).map((m) =>
      Math.round(m.sentimentScore * 100)
    );
    barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sentiment Intensity (%)",
            data: scores,
            backgroundColor: scores.map((s) =>
              s >= 50 ? "rgba(34,197,94,0.85)" : "rgba(248,113,113,0.85)"
            )
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: { color: "#9ca3af", font: { size: 9 } },
            grid: { display: false }
          },
          y: {
            ticks: { color: "#9ca3af", stepSize: 20 },
            grid: { color: "rgba(148,163,184,0.3)" },
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  if (lineCtx) {
    const labels = ["T‑1", "T‑2", "T‑3", "T‑4", "T‑5"];
    const values = [60, 55, 70, 65, 72];
    lineChart = new Chart(lineCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Positive rate (%)",
            data: values,
            borderColor: "#6366f1",
            backgroundColor: "rgba(79,70,229,0.2)",
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: { color: "#9ca3af" },
            grid: { color: "rgba(148,163,184,0.2)" }
          },
          y: {
            ticks: { color: "#9ca3af", stepSize: 20 },
            grid: { color: "rgba(148,163,184,0.2)" },
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    sentimentHistory = values.map((v, idx) => ({
      label: labels[idx],
      positivity: v
    }));
  }
}

function updateChartsFromStats() {
  if (!pieChart || !lineChart) return;

  const { positive, negative } = sentimentStats;
  pieChart.data.datasets[0].data = [positive || 1, negative || 1];
  pieChart.update();

  const positivityPct = sentimentStats.total
    ? Math.round((positive / sentimentStats.total) * 100)
    : 0;

  const label = `#${sentimentHistory.length + 1}`;
  sentimentHistory.push({ label, positivity: positivityPct });

  lineChart.data.labels.push(label);
  lineChart.data.datasets[0].data.push(positivityPct);
  if (lineChart.data.labels.length > 12) {
    lineChart.data.labels.shift();
    lineChart.data.datasets[0].data.shift();
  }
  lineChart.update();
}

// ============================================
// EVENT WIRING
// ============================================

function setupNav() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      scrollToSection(id);
      setActiveNavLink(id);
    });
  });

  window.addEventListener("scroll", () => {
    const navHeight =
      document.querySelector(".navbar")?.offsetHeight ?? 64;
    const sections = ["home", "trending", "browse", "analyze", "analytics", "about"];
    let current = "home";

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop - navHeight - 120;
      if (window.scrollY >= top) {
        current = id;
      }
    });

    setActiveNavLink(current);
  });
}

function setupHeroButtons() {
  heroAnalyzeBtn?.addEventListener("click", () => {
    scrollToSection("analyze");
  });
  heroBrowseBtn?.addEventListener("click", () => {
    scrollToSection("browse");
  });
}

function setupAnalyzerForm() {
  if (predictBtn) {
    predictBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const text = reviewInput ? reviewInput.value.trim() : "";
      if (!text) {
        showError("Please enter a review or select a movie card above.");
        return;
      }
      if (text.length < 10) {
        showError("Please enter a longer review (at least 10 characters).");
        return;
      }
      analyzeSentiment(text, "Custom review");
    });
  }

  if (reviewInput) {
    reviewInput.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        predictBtn?.click();
      }
    });
  }
}

function setupModalEvents() {
  modalCloseBtn?.addEventListener("click", closeMovieModal);
  movieModal?.addEventListener("click", handleModalOutsideClick);

  modalUseInAnalyzerBtn?.addEventListener("click", () => {
    if (!currentMovie || !reviewInput) return;
    reviewInput.value = currentMovie.review;
    scrollToSection("analyze");
    closeMovieModal();
  });

  modalAnalyzeBtn?.addEventListener("click", () => {
    if (!currentMovie) return;
    analyzeSentiment(currentMovie.review, currentMovie.title);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && movieModal?.classList.contains("open")) {
      closeMovieModal();
    }
  });
}

// ============================================
// STAR RATING INSTANCES
// ============================================

const analyzerRatingControl = setupStarRating("analyzerStarRating", (val) => {
  analyzerRating = val;
});

const modalRatingControl = setupStarRating("modalStarRating", (val) => {
  modalRating = val;
});

// ============================================
// INITIALIZATION
// ============================================

function initApp() {
  applyThemeFromStorage();
  renderFeaturedMovies();
  renderCategories();
  renderTrending();
  initCharts();

  setupNav();
  setupHeroButtons();
  setupAnalyzerForm();
  setupModalEvents();

  themeToggle?.addEventListener("click", toggleTheme);

  console.log("🎬 CineSentiment dashboard initialized");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

