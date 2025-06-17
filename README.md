# 📖 Intralinear Book of Psalms Viewer

This project is a modern web-based viewer for the Book of Psalms, inspired by Quran.com. It displays Hebrew verses aligned with their English translations and provides rich linguistic metadata, including:

- Strong’s Concordance numbers
- Morphological tags
- Transliteration
- Word-level glosses

The project aims to serve students of Biblical Hebrew with a highly readable and interactive presentation of the Psalms.

---

## 🗂 Project Structure

```
BOOK-OF-PSALMS/
├── transformer.py                  # Python script to build enriched JSON
├── public/
│   └── data/
│       └── psalms/
│           └── psalm1.json → psalm150.json
├── Website/
│   └── psalms-interlinear/        # Next.js frontend
│       ├── pages/
│       │   └── psalm/
│       │       └── [id].js        # Dynamic Psalm viewer
│       ├── public/                # Static assets
│       ├── styles/                # Optional Tailwind config or CSS modules
│       └── ...
└── strongs-master/                # Dictionary + gloss sources
```

---

## 🧠 Features

- 🧾 Hebrew + English side-by-side
- 🧩 Morpheme-aware tooltips for Strong’s, morphology, and gloss
- 🔤 Transliteration and parsing
- 🛠 Data transformation via Python

---

## 🚀 How to Run the Frontend

### 1. Install dependencies

```bash
cd Website/psalms-interlinear
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Now open [`http://localhost:3000`](http://localhost:3000) to view it.

---

## 🛠 Data Pipeline

The `transformer.py` script builds the enriched Psalm data by combining:

- Hebrew word segmentation, Strong’s numbers, and morphology
- English translation (KJV)
- Strong’s Hebrew dictionary (JS/JSON)

### To generate the JSON files:

```bash
python transformer.py
# Output will be placed in /transformeroutput
```

Move the output files into:

```
Website/psalms-interlinear/public/data/psalms/
```

---

## 📚 Data Sources

- **Hebrew**: (https://github.com/jordanhudgens/hebrew-bible-json)
- **English (KJV)**: https://github.com/thiagobodruk/bible
- **Strong’s Dictionary**: https://github.com/openscriptures/strongs

---

## 📈 Roadmap

- [ ] Add verse audio support
- [ ] Add search by Strong’s number or lemma
- [ ] Expand beyond Psalms to full Tanakh
- [ ] Integrate grammatical parsing (mood, stem, etc.)
- [ ] Add verse bookmarking and linking

---

## 🪪 License

MIT — feel free to fork, remix, or use for your own Biblical study tools.

---

## 🙏 Acknowledgments

Special thanks to:
- OpenScriptures for foundational data
- Quran.com for UI inspiration
- You, for exploring the Psalms deeply.
