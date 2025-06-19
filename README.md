# 📖 Intralinear Book of Psalms Viewer

This project is a modern web-based viewer for the Book of Psalms, inspired, initially, by *Quran.com*. It displays Hebrew verses aligned with their English translations and provides rich linguistic metadata, including:

- Strong’s Concordance numbers
- Morphological tags
- Transliteration
- Word-level glosses

The project aims to serve students of Biblical Hebrew with a highly readable and interactive presentation of the Psalms, a sort of parallel to *Quran.com*. Made by an enthusiast of the Hebrew language and the eloquence of the Psalms and greater Tanakh, for such people.

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

- [ ] Add nikkud to the UI (Currently only present for root morphemes in the tooltips)
- [X] Add hover info for prefixes like ה , ו, ב , that is , "the", "and", and "in/by/with"
- [ ] Add nikkud support for prefixes (and suffixes) like the aforementioned
- [X] Add support for 'Headers' like 'For the director of music. A psalm of David.' in psalm 140
- [X] Build suffix/pronoun logic
- [X] Add scaling for smaller displays
- [X] Add next/previous psalm button
- [ ] Add mobile support for the tooltips
- [ ] Expand beyond Psalms to full Tanakh
- [ ] Add German language support (using the same source as the KJV)
- [ ] Add Spanish language support
- [ ] Add verse audio support
- [ ] Add search by Strong’s number or lemma
- [ ] Integrate grammatical parsing (mood, stem, etc.)
- [ ] Add verse bookmarking and linking

---

## 🪪 License

This project is, as of now, **not open source**.

All code, data, and content in this repository are ©Rikard Blennhem and may not be used, copied, modified, or distributed without explicit written permission.

Personal and educational viewing of this repository is allowed.  
Commercial use, redistribution, or public deployment is **strictly prohibited** without a license.

If you're interested in using this project commercially or contributing to a licensed version, contact me directly.

---

## 🙏 Acknowledgments

Special thanks to:
- OpenScriptures for foundational data
- Quran.com for UI inspiration
- You, for exploring the Psalms deeply.
