import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Hint({side , align ,label , children}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent
           side={side}
           align={align}
           className='bg-black text-white p-2 rounded-lg border border-white/5'
        >
          <p className="text-sm font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
