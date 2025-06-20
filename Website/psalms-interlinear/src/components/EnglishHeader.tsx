import * as Tooltip from '@radix-ui/react-tooltip';
export default function EnglishVerse ({v}: {v: any}) {
  if (v.header == "") return null
  return (
          <Tooltip.Root>
              <Tooltip.Trigger><span className="font-bold mb-1 block cursor-help">{v.header}</span></Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content>
                  <span className="bg-white text-black text-sm px-4 py-2 rounded shadow-lg z-50 w-max max-w-xs whitespace-normal text-left space-y-1 leading-snug">
                    Header
                  </span>
                  <Tooltip.Arrow className="fill-white"/>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>)}