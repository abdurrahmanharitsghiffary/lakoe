import { getAllSearchParams } from "@/utils/get-all-search-param";
import {
  TabsList,
  TabsTrigger,
  Tabs as ShadcnTabs,
} from "@radix-ui/react-tabs";
import { LayoutGroup, motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TabsContent } from "./ui/tabs";

export type TabItem = {
  label: string;
  value: string;
  leftBadge?: string;
  content?: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  onValueChange?: (type: string) => void;
  value?: string;
  defaultValue?: string;
};

export function Tabs({ items, onValueChange, value, defaultValue }: TabsProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleValueChange = (type: string) => {
    if (onValueChange) {
      onValueChange(type);
      return;
    }
    searchParams.set("tab", type);
    navigate({
      search: "?" + getAllSearchParams(searchParams),
    });
  };

  const tab = searchParams.get("tab") || defaultValue;

  const v = value || tab;

  return (
    <ShadcnTabs
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      value={v}
    >
      <LayoutGroup id={Date.now().toString()}>
        <TabsList className="rounded-none border-b bg-transparent p-0 flex overflow-x-auto hide-scrollbar">
          {items.map((item) => (
            <TabsTrigger
              value={item.value}
              className="relative rounded-none border-b-4 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 items-center"
            >
              <div className="w-full flex gap-2 items-center">
                {item.leftBadge && Number(item.leftBadge) > 0 && (
                  <span className="text-white block rounded-full p-[0.5px] px-2 bg-lakoe-primary">
                    {item.leftBadge}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
                {item.value === v && (
                  <motion.span
                    layoutId="underline"
                    style={{
                      borderRadius: 50,
                      height: 3,
                      insetInline: 0,
                      position: "absolute",
                      bottom: 0,
                    }}
                    className="bg-lakoe-primary"
                  ></motion.span>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((item) => (
          <TabsContent value={item.value}>{item.content}</TabsContent>
        ))}
      </LayoutGroup>
    </ShadcnTabs>
  );
}
