// https://r.jina.ai/https://about.google/

fetch("https://r.jina.ai/https://about.google/") // api for the get request
  .then((response) => response.json())
  .then((data) => console.log(data));