# 🛰️ ISS Mission Control & News Intelligence
**An Advanced Orbital Analytics Dashboard**

## 🚀 Overview
This project is a high-performance, real-time dashboard designed to track the International Space Station (ISS) while providing global space-sector news intelligence. Built for the End-Semester Examination, it integrates orbital mechanics (Haversine Formula), real-time telemetry, and AI-driven analysis.

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Intelligence**: Mistral-7B-Instruct-v0.2 (via Hugging Face Inference API)
- **Mapping**: Leaflet.js with custom Voyager tiles
- **Analytics**: Recharts for velocity and news distribution
- **Animations**: Framer Motion for premium UI transitions

## ✨ Key Features
- **Real-Time Telemetry**: Tracks ISS position every 20 seconds with automatic API failover.
- **Orbital Mechanics**: Implements the **Haversine Formula** to calculate real-time speed from coordinate shifts.
- **AI Mission Assistant**: A dashboard-aware chatbot powered by **Mistral-7B** for technical summaries.
- **Global News Hub**: Integrated Spaceflight News feed with interactive data visualization.
- **Resilient UI**: "Simulation Mode" ensures the dashboard remains active even during API rate-limiting or outages.

## 📦 Installation & Setup
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Environment Variables**: Create a `.env` file and add:
   ```env
   VITE_AI_TOKEN=your_huggingface_token
   VITE_NEWS_API_KEY=optional_key
   ```
4. **Run Dev Server**: `npm run dev`

## 👨‍💻 Submission Details
- **LLM Model**: Mistral-7B-Instruct-v0.2 (Chosen for high technical accuracy and efficiency).
- **Core Algorithm**: Haversine Formula for spherical distance calculation.
