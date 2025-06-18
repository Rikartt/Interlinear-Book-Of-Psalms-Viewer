import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// src/pages/something.js
const PREFIX_INFO = {
  Hb: {
    gloss: "in / by / with",
    xlit: "b",
    strongs_def: "Preposition: in, by, with (inseparable prefix)",
    lemma: "ב",
    morph: "Preposition"
  },
  Hc: {
    gloss: "and",
    xlit: "v",
    strongs_def: "Conjunction: and (inseparable prefix)",
    lemma: "ו",
    morph: "Conjunction"
  },
  Hd: {
    gloss: "the",
    xlit: "ha",
    strongs_def: "Definite article: the (inseparable prefix)",
    lemma: "ה",
    morph: "Article"
  },
  Hk: {
    gloss: "like / as",
    xlit: "k",
    strongs_def: "Comparative prefix: like, as (inseparable prefix)",
    lemma: "כ",
    morph: "Preposition (Comparative)"
  },
  Hl: {
    gloss: "to / for",
    xlit: "l",
    strongs_def: "Preposition: to, for (inseparable prefix)",
    lemma: "ל",
    morph: "Preposition"
  }
};

function addNikkud(wordObj) {
  return wordObj.word.map((w, idx) => {
    if (wordObj.lemma[idx] == null) return wordObj.word[idx];
    return wordObj.lemma[idx]; 
  });
}
function decodeMorph(tag) {
  const pos = {
    N: "Noun",
    V: "Verb",
    A: "Adjective",
    P: "Pronoun",
    R: "Preposition",
    D: "Adverb",
    C: "Conjunction",
    T: "Article",
    I: "Interjection"
  };

  const gender = {
    m: "Masculine",
    f: "Feminine",
    c: "Common"
  };

  const number = {
    s: "Singular",
    d: "Dual",
    p: "Plural"
  };

  const state = {
    a: "Absolute",
    c: "Construct",
    d: "Determined"
  };
  
  if (tag == null ) return "Unknown";
  if (!tag.startsWith("H")) return null;

  const code = tag.slice(1); // remove H
  const [type, ...rest] = code;

  const desc = [pos[type]];

  rest.forEach((char) => {
    if (gender[char]) desc.push(gender[char]);
    else if (number[char]) desc.push(number[char]);
    else if (state[char]) desc.push(state[char]);
  });

  return desc.filter(Boolean).join(", ");
}
function decodeInfo(wordObj, idx, infoField) {
  const strongCode = wordObj.strong?.[idx] ?? null;

  // 1. Try to get the requested field directly
  const fieldArray = wordObj[infoField];
  if (Array.isArray(fieldArray) && fieldArray[idx] != null) {
    return fieldArray[idx];
  }

  // 2. If strong code is a known prefix, return its specific infoField
  if (strongCode && PREFIX_INFO.hasOwnProperty(strongCode)) {
    const prefixEntry = PREFIX_INFO[strongCode];
    return prefixEntry?.[infoField] ?? null;
  }

  // 3. Fallback
  return null;
}



export default function PsalmPage() {
  const router = useRouter()
  const { id } = router.query
  const [psalm, setPsalm] = useState(null)
  useEffect(() => {
    if (!id) return;
    fetch(`/data/psalms/Psalm${id}.json`)
      .then((res) => res.json())
      .then((data) => setPsalm(data))
  }, [id])
  if (!psalm) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Psalm {psalm.psalm}</h1>
      {psalm.verses.map((v) => (
        <div key={v.verse} className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-left font-serif">{v.english}</div>
          <div className="text-right font-hebrew"> 
            {v.hebrew.map((wordObj, i) => (
              <span key={i} className="group relative mx-1 hover:underline cursor-help">
                {wordObj.word.join("")}
                <span className="absolute top-full mb-1 hidden group-hover:block bg-white text-black text-xs px-6 py-2 rounded shadow-lg z-10 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug">
                  {wordObj.word.map((w, idx) => (
                    <div key={idx} className="text wrap">
                      <b>{addNikkud(wordObj)[idx]}</b> :
                        {['strong', 'morph', 'xlit', 'pron', 'derivation', 'strongs_def', 'gloss'].map(field =>
                          decodeInfo(wordObj, idx, field) !== null && (
                            <div key={field}>• {decodeInfo(wordObj, idx, field)}</div>
                          )
                        )}
                    </div>
                  ))}
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}