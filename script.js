// =============================
// QUOTE GENERATOR SCRIPT
// =============================

// Big fallback database (50+ quotes, grouped by category)
const fallbackQuotes = {
  Inspirational: [
    { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { content: "Great things never come from comfort zones.", author: "Unknown" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Dream it. Wish it. Do it.", author: "Unknown" },
    { content: "Little things make big days.", author: "Unknown" },
    { content: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { content: "Don’t wait for opportunity. Create it.", author: "Unknown" },
  ],
  Life: [
    { content: "Life is what happens when you’re busy making other plans.", author: "John Lennon" },
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Do not take life too seriously. You will never get out of it alive.", author: "Elbert Hubbard" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { content: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
    { content: "Good friends, good books, and a sleepy conscience: this is the ideal life.", author: "Mark Twain" },
    { content: "Difficulties in life don’t come to destroy you, but to help you realize your hidden potential.", author: "Unknown" },
    { content: "Life is short, and it is up to you to make it sweet.", author: "Sarah Louise Delany" },
  ],
  Technology: [
    { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { content: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { content: "The science of today is the technology of tomorrow.", author: "Edward Teller" },
    { content: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { content: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { content: "The advance of technology is based on making it fit in so that you don’t really notice it.", author: "Bill Gates" },
    { content: "Technology like art is a soaring exercise of the human imagination.", author: "Daniel Bell" },
  ],
  Happiness: [
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Count your age by friends, not years.", author: "John Lennon" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "Happiness is not something readymade. It comes from your actions.", author: "Dalai Lama" },
    { content: "The most important thing is to enjoy your life—to be happy.", author: "Audrey Hepburn" },
    { content: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
    { content: "Count your blessings, not your problems.", author: "Unknown" },
    { content: "Happiness is a direction, not a place.", author: "Sydney J. Harris" },
  ],
  Wisdom: [
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { content: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix" },
    { content: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { content: "Wise men speak because they have something to say; fools because they have to say something.", author: "Plato" },
    { content: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { content: "Honesty is the first chapter in the book of wisdom.", author: "Thomas Jefferson" },
    { content: "A fool thinks himself to be wise, but a wise man knows himself to be a fool.", author: "William Shakespeare" },
  ],
  Friendship: [
    { content: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson" },
    { content: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" },
    { content: "Friendship is born at that moment when one person says to another, ‘What! You too? I thought I was the only one.’", author: "C.S. Lewis" },
    { content: "A friend to all is a friend to none.", author: "Aristotle" },
    { content: "The greatest gift of life is friendship, and I have received it.", author: "Hubert H. Humphrey" },
    { content: "True friendship comes when the silence between two people is comfortable.", author: "David Tyson" },
    { content: "Friends are the siblings God never gave us.", author: "Mencius" },
    { content: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
  ],
  Success: [
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Opportunities don’t happen. You create them.", author: "Chris Grosser" },
    { content: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { content: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
    { content: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
    { content: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { content: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.", author: "Colin Powell" },
  ]
};

// =============================
// DOM Elements
// =============================
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const categorySelect = document.getElementById("category");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const toast = document.getElementById("toast");

// =============================
// Display Quote
// =============================
function displayQuote(content, author, category) {
  quoteText.textContent = `"${content}"`;
  authorText.textContent = `— ${author}`;
}

// =============================
// Use Fallback Quote
// =============================
function useFallbackQuote(category = "Inspirational") {
  let quotes;

  if (category.toLowerCase() === "random") {
    // merge all categories into one big array
    quotes = Object.values(fallbackQuotes).flat();
  } else {
    quotes = fallbackQuotes[category] || fallbackQuotes.Inspirational;
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(randomQuote.content, randomQuote.author, category);
}

// =============================
// Fetch Quote from API with retry
// =============================
async function fetchQuote(category = "") {
  let apiUrl = category
    ? `https://api.quotable.io/random?tags=${category}&_=${Date.now()}`
    : `https://api.quotable.io/random?_=${Date.now()}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) throw new Error("Bad response");

    const data = await response.json();
    displayQuote(data.content, data.author, category || "General");
  } catch (error) {
    console.warn("First try failed, retrying...", error);
    try {
      const retryResponse = await fetch(apiUrl, { cache: "no-store" });
      const retryData = await retryResponse.json();
      displayQuote(retryData.content, retryData.author, category || "General");
    } catch (retryError) {
      console.error("Both fetch attempts failed:", retryError);
      useFallbackQuote(category);
    }
  }
}

// =============================
// Copy to clipboard
// =============================
function copyQuote() {
  const textToCopy = `${quoteText.textContent} ${authorText.textContent}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  });
}

// =============================
// Event Listeners (Desktop + Mobile)
// =============================
function addButtonEvents(button, handler) {
  button.addEventListener("click", handler);
  button.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handler();
  });
}

addButtonEvents(newQuoteBtn, () => fetchQuote(categorySelect.value));
addButtonEvents(copyQuoteBtn, copyQuote);

// On load
fetchQuote();

