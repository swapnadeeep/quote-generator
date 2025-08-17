const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const categoryTag = document.getElementById("category-tag");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const categorySelect = document.getElementById("category");

async function getQuote() {
  let category = categorySelect.value;

  if (category === "random") {
    const categories = ["inspirational", "life", "technology", "wisdom", "friendship"];
    category = categories[Math.floor(Math.random() * categories.length)];
  }

  try {
    const response = await fetch(`https://api.quotable.io/random?tags=${category}`);
    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `— ${data.author}`;
    categoryTag.textContent = `Category: ${category}`;
  } catch (error) {
const fallbackQuotes = {
  Technology: [
    { content: "Programs must be written for people to read.", author: "Harold Abelson" },
    { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { content: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  ],
  Motivation: [
    { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { content: "Great things never come from comfort zones.", author: "Unknown" },
  ],
  Happiness: [
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Count your age by friends, not years.", author: "John Lennon" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "Happiness is not something readymade. It comes from your actions.", author: "Dalai Lama" },
  ],
  Life: [
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Life is what happens when you’re busy making other plans.", author: "John Lennon" },
    { content: "Do not take life too seriously. You will never get out of it alive.", author: "Elbert Hubbard" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  ]
};

// Fallback function
function useFallbackQuote(category = "Motivation") {
  const quotes = fallbackQuotes[category] || fallbackQuotes.Motivation;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(randomQuote.content, randomQuote.author, category);
}


// Copy button logic
copyQuoteBtn.addEventListener("click", () => {
    const textToCopy = `${quoteText.textContent} ${authorText.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast();
    });
  });
  
  function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 2500);
  }
  


newQuoteBtn.addEventListener("click", getQuote);

