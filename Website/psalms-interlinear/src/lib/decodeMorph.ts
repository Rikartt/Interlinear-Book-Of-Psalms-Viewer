import decodeSuffix from "@/lib/decodeSuffix"; // adjust path as needed
export default function decodeMorph({tag}) {
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