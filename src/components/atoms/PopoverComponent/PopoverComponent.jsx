import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users } from 'lucide-react'

function PopoverComponent({title}) {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Users />
            <Button variant="outline"> {title} </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Input
              
              placeholder='Enter name of workspace'
            />
        </PopoverContent>
    </Popover>
  )
}

export default PopoverComponent