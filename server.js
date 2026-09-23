import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Check API key configuration
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not defined.");
}

// Health check endpoint (useful for Render deployment monitoring)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Jalebi", timestamp: new Date().toISOString() });
});

// Gemini Search / Chat API route
app.post("/api/search", async (req, res) => {
  try {
    const currentApiKey = process.env.GEMINI_API_KEY;
    if (!currentApiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured on the server. Please set GEMINI_API_KEY in environment variables."
      });
    }

    const query = req.body?.q?.trim();
    if (!query) {
      return res.status(400).json({ error: "Missing or empty query." });
    }

    const genAI = new GoogleGenerativeAI(currentApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are Jalebi, a friendly and empathetic assistant.
Answer the user's question clearly, warmly, and helpfully.

User question: ${query}
    `;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text();

    if (!text) {
      return res.status(500).json({ error: "Empty response received from Gemini." });
    }

    res.json({ text });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message || error);

    const isRateLimit = error?.status === 429 || error?.message?.includes("quota") || error?.message?.includes("429");
    const safeErrorMessage = isRateLimit
      ? "Gemini rate limit exceeded. Please wait a moment and try again."
      : "Failed to communicate with Gemini AI. Please try again.";

    res.status(500).json({ error: safeErrorMessage });
  }
});

// Fallback route navigation for clean URLs
app.get("/chatbot", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chatbot.html"));
});

app.get("/journal", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "journal.html"));
});

app.get("/gratitude", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gratitude.html"));
});

// Root route serves public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Jalebi server running on port ${PORT}`);
});
