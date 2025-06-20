import {SUFFIX_INFO} from "@/lib/SUFFIX_INFO";
import {PREFIX_INFO} from "@/lib/PREFIX_INFO";
import decodeMorph from "@/lib/decodeMorph";

export default function decodeInfo(wordObj, idx, infoField) {
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