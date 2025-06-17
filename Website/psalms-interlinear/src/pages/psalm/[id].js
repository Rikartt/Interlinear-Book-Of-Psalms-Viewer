import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// src/pages/something.js
//function addnikkud(t) {
  //t.word.map((w, idx) => {
    //if ({word.lemma[idx]} == null) return;
  //});
//}
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
  if (!tag.startsWith("H")) return;

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
                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-white text-black text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                  {wordObj.word.map((w, idx) => (
                    <div key={idx} className="text wrap">
                      <b>{wordObj.lemma[idx]} {w}</b> — {wordObj.strong[idx]} • {decodeMorph(wordObj.morph[idx])} • {wordObj.xlit[idx]} • {wordObj.pron[idx]} • {wordObj.derivation[idx]} • {wordObj.strongs_def[idx]} • {wordObj.gloss[idx]}
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