# 🍥 Jalebi — Gentle Emotional Support & AI Companion

Jalebi is a compassionate emotional companion web application designed to support mental wellness through AI-powered conversations, mindful journaling, and daily gratitude tracking.

---

## ✨ Features

- **🤖 AI Chatbot**: Real-time supportive conversations powered by Google Gemini (`gemini-2.5-flash`), with dark mode and voice speech-to-text.
- **🔍 Jalebi Search Assistant**: Instant answers and gentle guidance on the home page via the backend Gemini API.
- **📓 Reflective Journal**: Write and store personal reflections and thoughts locally with timestamps.
- **🌟 Gratitude Jar**: Collect and revisit moments of joy and appreciation.
- **📱 Fully Responsive Design**: Flawlessly optimized across all device widths from 320px mobile screens to large desktop monitors.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage for private, client-side journal and gratitude notes
- **Deployment Platform**: Render (Web Service) & GitHub

---

## 🏗️ Production Architecture

```
Browser (Client)
      ↓ (relative paths: /api/search)
Render (Hosting Platform)
      ↓
Node.js / Express Server (Static files + API proxy)
      ↓ (secure server-side request with GEMINI_API_KEY)
Google Gemini API
```

---

## 🚀 Local Setup & Development

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repository-url>
cd jalebi
npm install
```

### 3. Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```
Open `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

### 4. Running the Server Locally
```bash
npm start
```
Once running, open your browser and navigate to:
```
http://localhost:3000
```

---

## ☁️ How to Deploy on Render

### Step 1: Push your project to GitHub
Ensure you have initialized git and committed all files (your `.env` is automatically ignored):
```bash
git init
git add .
git commit -m "feat: prepare Jalebi for production deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Create a Web Service on Render
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.

### Step 3: Configure Settings
- **Name**: `jalebi` (or your preferred name)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### Step 4: Add Environment Variables
In the **Environment Variables** section on Render, add:
- Key: `GEMINI_API_KEY`
- Value: `your_gemini_api_key_here`

*(Note: Render will automatically set `PORT`, which `server.js` listens to via `process.env.PORT`)*

### Step 5: Deploy
Click **Create Web Service**. Render will install dependencies, launch the server, and provide you with a live HTTPS URL (e.g., `https://jalebi.onrender.com`).

---

## 🔒 Security & Privacy Notes

- **Zero Client-Side Secrets**: The `GEMINI_API_KEY` is kept strictly on the Node.js backend (`process.env.GEMINI_API_KEY`) and is never sent to the browser.
- **Git Protection**: `.env` and `.env.*` are ignored by `.gitignore` to prevent leaking API keys into public repositories.
- **Content Security**: User inputs in the journal and gratitude jar use safe DOM text nodes (`textContent`) to prevent Cross-Site Scripting (XSS).
- **Same-Origin Requests**: The frontend uses relative API endpoints (`/api/search`), avoiding permissive cross-origin sharing policies.
