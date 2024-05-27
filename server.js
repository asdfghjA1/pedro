const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;
const jinaApiKey =
  "jina_6a983216aa4749d0871e230033a580f0lRG_DelzI1YicSYLYE7ST_ov5AyX";

app.use(bodyParser.json());
app.use(express.static("public"));
app.post("/fetch-data", async (req, res) => {
  const { url } = req.body;
  try {
    const fetch = (await import("node-fetch")).default;
    const apiUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});


app.post("/ask-question", async (req, res) => {
  const { prompt, preData } = req.body;
  const context = `Things to know: ${preData}`;
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt, { context });
    const response = await result.response;
    const answer = await response.text();
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
