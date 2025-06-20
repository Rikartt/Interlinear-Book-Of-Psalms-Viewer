export default function decodeSuffix({tag}) {
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