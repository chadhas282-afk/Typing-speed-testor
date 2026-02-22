
---

# 🤖 CyberType Express

**CyberType Express** is a high-performance, cyberpunk-themed terminal typing application. It’s designed for speed, precision, and a seamless developer-centric aesthetic, featuring real-time stat tracking and a dynamic word engine.

## 🚀 Features

* **Real-time Analytics**: Track your **WPM** (Words Per Minute) and **Accuracy** percentage as you type.
* **Dynamic Word Engine**: Fetches a massive library of 1,000 words from a JSON database or falls back to a hardcoded "matrix" set if offline.
* **Customizable Sessions**:
* Preset durations: 15s, 30s, and 60s.
* **Custom Time**: Input your own specific duration for personalized training.


* **Visual Feedback**:
* **Green**: Correct characters.
* **Red Highlight**: Mistakes.
* **Blue Underline**: Active cursor position with a blinking animation.


* **Responsive Design**: A glassmorphism UI built with **JetBrains Mono** for that authentic terminal feel.

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (Custom Variables & Animations).
* **Logic**: Vanilla JavaScript (ES6+).
* **Data**: JSON-based word bank.
* **Typography**: Google Fonts (JetBrains Mono).

## 📂 File Structure

```text
├── index.html      # Structure & UI Layout
├── style.css       # Cyberpunk styling & Animations
├── script.js       # Typing engine & Logic
└── words.json      # 1,000-word dictionary

```

## ⚙️ How It Works

1. **Initialization**: Upon clicking "Initialize," the engine loads the `words.json` file.
2. **The Loop**: The app generates a randomized passage. As you type into a hidden `textarea`, the engine compares your input against the generated spans in real-time.
3. **End Sequence**: Once the timer hits zero, the test terminates, displaying your final score and mistake count.
4. **Reboot**: Users can instantly restart the test at any time using the ⟳ (Restart) icon or the "Reboot Test" button.

## 🔧 Installation

1. Clone or download the project files.
2. Ensure `index.html`, `style.css`, `script.js`, and `words.json` are in the same directory.
3. **Important**: Because the app uses the `fetch()` API to load words, it should be run via a local server (e.g., Live Server in VS Code) to avoid CORS policy restrictions.

---

> **Developer Note:** The WPM is calculated using the standard formula:
> (CorrectStrokes / 5) / TimeElapsed