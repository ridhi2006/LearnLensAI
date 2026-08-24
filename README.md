# LearnLens AI 🎓✨

> **Turn YouTube Videos Into Personalized Learning Experiences.**

LearnLens AI is an intelligent educational platform that transforms educational YouTube videos into structured notes, interactive knowledge graphs, AI tutoring, assessments, and personalized learning roadmaps.

---

## 🌟 Key Features (V1)

1. **Video Intelligence**
   - Timestamp-synchronized interactive transcripts with keyword search.
   - Executive AI synthesis and key concept extraction.
   - Timestamp-aware Q&A drawer (e.g. asking what happened at `17:32`).

2. **Smart Study Kit**
   - High-yield **Cheat Sheets** (definitions, formulas, complexities, common mistakes, and code traces).
   - Interactive **Quiz** with **Easy**, **Medium**, and **Hard** difficulty levels, real-time scoring, and weak area detection.
   - Simulated **PDF Export** for offline studying.

3. **Interactive Knowledge Graph**
   - React Flow visual mapping of concepts, subtopics, and prerequisite dependencies.
   - Interactive slide-out drawer with concept definitions, logic traces, and direct video timestamp links.

4. **Knowledge Gap Detector & Learning Roadmap**
   - Automated diagnosis categorizing concepts into **Covered**, **Weak**, and **Missing / Recommended**.
   - Personalized vertical visual roadmap with status tracking and step-by-step learning triggers.

5. **Personalized AI Tutor + Interview Assessment**
   - 4 Pedagogical Modes: **Beginner**, **College**, **Revision**, and **Interview**.
   - ChatGPT/Perplexity-style conversational tutor with instant prompt pills (*"Explain Simply"*, *"Show Complexity"*, *"Give an Example"*).
   - Technical interview assessment evaluator with 4-metric rubric grading (*Concept Understanding*, *Complexity Analysis*, *Implementation*, *Problem Solving*).

6. **Learning History & Session Sharing**
   - Data Structures & Algorithms mastery tracking and study streak counters.
   - Shareable view-only session URLs (`/share/:shareId`) for peer and mentor collaboration.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), JavaScript, Tailwind CSS, Framer Motion, Lucide React, `@xyflow/react` (React Flow), Recharts, Axios, Canvas Confetti.
- **Design System**: Dark-first palette (`#070B14`, `#0B1120`, `#111827`, `#151D2F`) with Indigo/Violet (`#6366F1`/`#8B5CF6`) and Electric Cyan (`#22D3EE`) highlights.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LearnLensAI.git
   cd LearnLensAI
   ```

2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd FRONTEND
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
LearnLensAI/
├── FRONTEND/
│   ├── src/
│   │   ├── components/      # Common, Layout, Landing, Video, Transcript, Notes, Graph, Quiz, Tutor, Learning
│   │   ├── context/         # AuthContext, LearningContext, ToastContext
│   │   ├── data/            # Mock video catalogs, transcripts, quizzes, graphs & roadmaps
│   │   ├── pages/           # Landing, Login, Signup, Dashboard, Analyze, Workspace, Library, MyLearning, Settings, SharedSession
│   │   ├── services/        # Decoupled API & mock services ready for FastAPI backend
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── BACKEND/
├── DATABASE/
└── README.md
```

---

## 📄 License
MIT License. Built for smarter learning.
