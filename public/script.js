document
  .getElementById("url-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlInput = document.getElementById("url");
    const promptForm = document.getElementById("prompt-form");
    const responseContent = document.getElementById("response-content");
    const debugContent = document.getElementById("debug-content");

    const url = urlInput.value;

    responseContent.textContent = "Fetching data...";
    responseContent.classList.add("typing-animation");

    const response = await fetch("/fetch-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (response.ok) {
      const data = await response.json();
      responseContent.classList.remove("typing-animation");
      responseContent.textContent = "Data fetched. You can now ask questions.";
      promptForm.classList.remove("hidden");
      debugContent.textContent = JSON.stringify(data, null, 2);
    } else {
      responseContent.classList.remove("typing-animation");
      responseContent.textContent = "Failed to fetch data. Please try again.";
    }
  });

document
  .getElementById("prompt-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const promptInput = document.getElementById("prompt");
    const responseContent = document.getElementById("response-content");
    const debugContent = document.getElementById("debug-content");

    const prompt = promptInput.value;
    const preData = debugContent.textContent;

    responseContent.textContent = "";
    responseContent.classList.add("typing-animation");

    const response = await fetch("/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, preData }),
    });

    if (response.ok) {
      const data = await response.json();
      responseContent.classList.remove("typing-animation");
      displayText(responseContent, data.answer);
    } else {
      responseContent.classList.remove("typing-animation");
      responseContent.textContent =
        "Failed to generate response. Please try again.";
    }
  });

function displayText(element, text) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      element.scrollTop = element.scrollHeight; // Auto-scroll
      index++;
      setTimeout(type, 20); // Adjust typing speed here
    }
  }

  type();
}
