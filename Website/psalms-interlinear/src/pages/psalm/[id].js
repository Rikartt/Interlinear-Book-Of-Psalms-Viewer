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
const SUFFIX_INFO = {
  Sp1cs: {
    gloss: "my",
    desc: "Suffix: 1st person, Common, Singular"
  },
  Sp2ms: {
    gloss: "your (m. sg.)",
    desc: "Suffix: 2nd person, Masculine, Singular"
  },
  Sp2fs: {
    gloss: "your (f. sg.)",
    desc: "Suffix: 2nd person, Feminine, Singular"
  },
  Sp3ms: {
    gloss: "his",
    desc: "Suffix: 3rd person, Masculine, Singular"
  },
  Sp3fs: {
    gloss: "her",
    desc: "Suffix: 3rd person, Feminine, Singular"
  },
  Sp1cp: {
    gloss: "our",
    desc: "Suffix: 1st person, Common, Plural"
  },
  Sp2mp: {
    gloss: "your (m. pl.)",
    desc: "Suffix: 2nd person, Masculine, Plural"
  },
  Sp2fp: {
    gloss: "your (f. pl.)",
    desc: "Suffix: 2nd person, Feminine, Plural"
  },
  Sp3mp: {
    gloss: "their (m.)",
    desc: "Suffix: 3rd person, Masculine, Plural"
  },
  Sp3fp: {
    gloss: "their (f.)",
    desc: "Suffix: 3rd person, Feminine, Plural"
  },
  Sh: {
    gloss: "–",
    desc: "Suffix: Final Heh — typically marks feminine singular nouns"
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
  if (!tag.startsWith("H") && !tag.startsWith("S")) return null;
  if (tag.startsWith("S")) {
    return decodeSuffix(tag);
  }
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
  if (infoField == "morph") {
    return decodeMorph(wordObj.morph[idx])
  }
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
  if (!strongCode && SUFFIX_INFO.hasOwnProperty(wordObj.morph?.[idx])) {
  return SUFFIX_INFO[wordObj.morph[idx]]?.[infoField] ?? null;
  }
  // 3. Fallback
  return null;
}
function decodeSuffix(tag) {
  const person = {
    1: "1st person",
    2: "2nd person",
    3: "3rd person"
  }
  const gender = {
    m: "Masculine",
    f: "Feminine",
    c: "Common"
  }
  const number = {
    s: "Singular",
    p: "Plural"
  }
  if (tag === "Sh") return "Suffix: Final Heh — typically marks feminine singular nouns";
  const code = tag.slice(2);
  const desc = [];
  const chars = tag.split('');
  chars.forEach((char) => {
    if (gender[char]) desc.push(gender[char]);
    else if (number[char]) desc.push(number[char]);
  });
  return "Suffix: " + desc.filter(Boolean).join(", ");
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
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Psalms {psalm.psalm}</h1>
      {psalm.verses.map((v) => (
        <div key={v.verse} className="flex flex-col lg:flex-row md:justify-between mb-4">
          <div className="text-left font-serif" dangerouslySetInnerHTML={{ __html: v.english }}></div> 
          <div className="text-right font-hebrew text-lg break-words whitespace-pre-wrap leading-relaxed" dir="rtl"> 
            {v.hebrew.map((wordObj, i) => (
              <span key={i} className="group relative mx-1 hover:underline cursor-help hover:bg-white hover:text-black transition-colors duration-500">
                {wordObj.word.join("")}
                <span className="absolute top-full mb-1 hidden group-hover:block bg-white text-black text-xs px-6 py-2 rounded shadow-lg z-10 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug transition-colors duration-500">
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