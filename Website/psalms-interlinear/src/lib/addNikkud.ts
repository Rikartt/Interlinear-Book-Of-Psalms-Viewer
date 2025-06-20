export default function addNikkud(wordObj) {
  return wordObj.word.map((w, idx) => {
    if (wordObj.lemma[idx] == null) return wordObj.word[idx];
    return wordObj.lemma[idx]; 
  });
}