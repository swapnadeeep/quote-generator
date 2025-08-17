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
    const fallbackQuotes = [
      { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", tag: "technology" },
      { text: "Programs must be written for people to read.", author: "Harold Abelson", tag: "wisdom" },
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson", tag: "inspirational" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House", tag: "life" }
    ];
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const quote = fallbackQuotes[randomIndex];
    quoteText.textContent = `"${quote.text}"`;
    authorText.textContent = `— ${quote.author}`;
    categoryTag.textContent = `Category: ${quote.tag}`;
  }
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
