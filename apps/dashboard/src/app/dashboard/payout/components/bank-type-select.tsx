import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BankTypeSelect({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void;
  defaultValue: string;
}) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Payment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Payment Types</SelectLabel>
          <SelectItem value="Kbz Pay">Kbz Pay</SelectItem>
          <SelectItem value="Aya Pay">Aya Pay</SelectItem>
          <SelectItem value="Wave Pay">Wave Pay</SelectItem>
          <SelectItem value="Mytel Pay">Mytel Pay</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
