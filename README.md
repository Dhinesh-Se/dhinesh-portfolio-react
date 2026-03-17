# Dhinesh Portfolio (React + Vite)

A cinematic, interactive personal portfolio built with **React** and **Vite**.

This site showcases Dhinesh's full-stack engineering profile with movie-style visuals, animated storytelling elements, and developer-focused UI interactions.

---

## ✨ Highlights

- **Matrix Rain Background** with toggle support.
- **Cinematic Dialogue Ticker** (movie quote rotation).
- **Responsive Navigation** with a mobile hamburger menu.
- **Command Palette** (⌘K / Ctrl+K) for quick actions.
- **Animated Sections** for About, Skills, Experience, Projects, Achievements, and Contact.
- **Download CV** CTA and social/contact links.

---

## 📱 Mobile behavior

Recent mobile-focused updates include:

- Matrix effect is **enabled by default on mobile** (`< 768px`).
- Matrix toggle is available directly in the **mobile top bar** (not hidden only inside menu).
- Cinematic dialogue ticker is visible on mobile without opening the hamburger menu.

---

## 🧩 Component structure

The app is still centered around `src/App.jsx`, with key UI pieces extracted into reusable components:

- `src/components/TopNavigation.jsx` – desktop/mobile nav, matrix toggle, mobile menu.
- `src/components/MovieTicker.jsx` – cinematic quote/dialogue ticker.

---

## 🚀 Run locally

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## 🛠 Tech stack

- React
- Vite
- JavaScript (JSX)
- CSS (inline + stylesheet)

---

## 📁 Project files

- `src/App.jsx` – main portfolio page and section content.
- `src/components/TopNavigation.jsx` – extracted top navigation component.
- `src/components/MovieTicker.jsx` – extracted movie dialogue ticker component.
- `src/main.jsx` – React entry point.

---

## 📄 License

Personal portfolio project.
