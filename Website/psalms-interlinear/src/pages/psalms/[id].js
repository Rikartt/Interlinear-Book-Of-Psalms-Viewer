import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Tooltip from '@radix-ui/react-tooltip';
import Link from 'next/link';
import decodeInfo from "@/lib/decodeInfo"; // adjust path as needed
import decodeMorph from "@/lib/decodeMorph";
import addNikkud from "@/lib/addNikkud";
import HebrewWord from "@/components/HebrewWord"
import EnglishHeader from "@/components/EnglishHeader"
// src/pages/something.js
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
  const [hasPrev, setHasPrev] = useState(false);
const [hasNext, setHasNext] = useState(false);

useEffect(() => {
  if (!id) return;

  const prevId = Number(id) - 1;
  const nextId = Number(id) + 1;

  const checkExistence = async () => {
    try {
      const [prevRes, nextRes] = await Promise.all([
        fetch(`/data/psalms/Psalm${prevId}.json`),
        fetch(`/data/psalms/Psalm${nextId}.json`)
      ]);
      setHasPrev(prevRes.ok);
      setHasNext(nextRes.ok);
    } catch {
      setHasPrev(false);
      setHasNext(false);
    }
  };

  checkExistence();
}, [id]);

  if (!psalm) return <div>Loading...</div>
  return (
    <Tooltip.Provider delayDuration={150}>
    <div className="p-20">
      <div className="flex justify-between items-center mb-4">
      {(hasPrev) && <div className="flex justify-between items-center mb-4"><Link href={`/psalms/${Number(id) - 1}`}>
            <Tooltip.Root>
              <Tooltip.Trigger><span className="text-4xl">•</span></Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content>
                  <span className="bg-white text-black text-sm px-4 py-2 rounded shadow-lg z-50 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug">
                    Previous Chapter
                  </span>
                  <Tooltip.Arrow className="fill-white"/>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
      </Link></div>}
      {(hasNext) && <div className="text-right break-words leading-relaxed lg:flex-row"><Link href={`/psalms/${Number(id) + 1}`}>
            <Tooltip.Root>
              <Tooltip.Trigger><span className="text-4xl">•</span></Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content>
                  <span className="bg-white text-black text-sm px-4 py-2 rounded shadow-lg z-50 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug">
                    Next Chapter
                  </span>
                  <Tooltip.Arrow className="fill-white"/>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
      </Link></div>}
      </div>
      <h1 className="text-2xl font-bold mb-4">Psalms {psalm.psalm}</h1>
      {psalm.verses.map((v) => (
        <div key={v.verse} className="md:justify-between mb-6">
          <EnglishHeader v={v} />
          <div className="flex flex-col lg:flex-row justify-between gap-x-4">
          <div className="text-left font-serif" dangerouslySetInnerHTML={{ __html: v.english }}></div> 
          <div className="text-right font-hebrew text-lg break-words whitespace-pre-wrap leading-relaxed" dir="rtl"> 
            {v.hebrew.map((wordObj, i) => (
              <HebrewWord key={i} wordObj={wordObj} />
            ))}
          </div>
          </div>
        </div>
      ))}
    </div>
    </Tooltip.Provider>
  );
}