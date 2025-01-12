"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Choice = {
  value: string;
  label: string;
};

type PropType = {
  choices: Array<Choice>;
  setChoiceValue: (arg: string) => void;
};

export const Combobox: React.FC<PropType> = ({ choices, setChoiceValue }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-0"
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label
            : "Velg konto..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Søk etter konto..." className="h-9" />
          <CommandList>
            <CommandEmpty>Ingen kontoer funnet.</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={(currentValue) => {
                    setChoiceValue(currentValue === value ? "" : currentValue);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {choice.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === choice.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
