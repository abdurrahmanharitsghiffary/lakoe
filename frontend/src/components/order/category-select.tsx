"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useState } from "react";

export function ProductCategorySelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <MultiSelector values={value} onValuesChange={setValue}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Semua category" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          <MultiSelectorItem value="1">Item 1</MultiSelectorItem>
          <MultiSelectorItem value="2">Item 2</MultiSelectorItem>
          <MultiSelectorItem value="3">Item 3</MultiSelectorItem>
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
