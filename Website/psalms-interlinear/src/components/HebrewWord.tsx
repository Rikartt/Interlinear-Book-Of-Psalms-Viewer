import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import decodeInfo from "@/lib/decodeInfo";
import decodeMorph from "@/lib/decodeMorph";
import addNikkud from "@/lib/addNikkud";

export default function HebrewWord({ wordObj }: { wordObj: any }) {
  if (!wordObj?.word) return null;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="mx-1 cursor-help hover:underline hover:bg-white hover:text-black transition-colors duration-500">
          {wordObj.word.join("")}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={4}
          className="bg-white text-black text-xs px-4 py-2 rounded shadow-lg z-50 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug"
        >
          {wordObj.word.map((_, idx) => (
            <div key={idx}>
              <b>{addNikkud(wordObj)[idx]}</b> :
              {["strong", "morph", "xlit", "pron", "derivation", "strongs_def", "gloss"].map((field) => {
                const val = decodeInfo(wordObj, idx, field);
                return val ? <div key={field}>• {val}</div> : null;
              })}
            </div>
          ))}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
