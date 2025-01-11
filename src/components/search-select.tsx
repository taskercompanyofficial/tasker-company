"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"

interface Item {
  value: string
  label: string
}

interface SearchSelectProps {
  items: Item[]
  label: string
  placeholder?: string
  description?: string
  onChange: (value: string) => void
  customizable?: boolean// Add new prop for custom item handling
}

export function SearchSelect({
  items,
  label,
  placeholder = "Select an item",
  description,
  onChange,
  customizable = true,
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isAddingCustom, setIsAddingCustom] = React.useState(false)
  const [customValue, setCustomValue] = React.useState("")

  const handleSelect = React.useCallback((currentValue: string) => {
    setValue(currentValue)
    onChange(currentValue)
    setOpen(false)
  }, [onChange])

  const handleAddCustom = () => {
    if (customValue.trim()) {
      setCustomValue("")
      setIsAddingCustom(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}hjkkh</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            id={label}
          >
            {value
              ? items.find((item) => item.value === value)?.label || placeholder
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))
              ) : (
                <CommandItem disabled>No items available</CommandItem>
              )}
            </CommandGroup>
            {customizable && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  {!isAddingCustom ? (
                    <CommandItem onSelect={() => setIsAddingCustom(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add custom option
                    </CommandItem>
                  ) : (
                    <div className="flex items-center gap-2 p-2">
                      <Input
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Enter custom value..."
                        className="h-8"
                      />
                      <Button
                        size="sm"
                        onClick={handleAddCustom}
                        disabled={!customValue.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </CommandGroup>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
