import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LuChevronsUpDown } from "react-icons/lu";
import { CheckIcon } from "@radix-ui/react-icons";

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  error?: string;
  className?: string;
  width?: "auto" | "full";
}

export default function SearchSelect({
  options,
  value,
  onChange,
  label,
  description,
  error,
  className,
  width = "auto",
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-1 pt-1", className)}>
      {label && (
        <Label
          className={cn("flex items-center gap-1", error && "text-red-500")}
        >
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between bg-background",
              width === "full" ? "w-full" : "w-[250px]",
            )}
          >
            <span className="line-clamp-1 text-left">
              {value
                ? options.find((option) => option.value === value)?.label
                : `Select ${label.toLowerCase()}...`}
            </span>
            <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0",
            width === "full"
              ? "w-[--radix-popover-trigger-width]"
              : "w-[250px]",
          )}
          align="start"
        >
          <Command className="w-full">
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="border-none focus:ring-0"
            />
            <CommandList className="max-h-[200px] overflow-y-auto">
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.value} - {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
