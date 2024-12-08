import { TabItem, Tabs } from "@/components/tabs";
import { Card } from "@/components/ui/card";
import { CardLocation } from "@/features/settings/components/card-location";
import { CardStore } from "@/features/settings/components/card-store";
import { CardTemplate } from "@/features/settings/components/card-template";
import { Helmet } from "react-helmet-async";

const tabItems: TabItem[] = [
  { label: "Informasi", value: "informasi", content: <CardStore /> },
  { value: "lokasi", label: "Lokasi", content: <CardLocation /> },
  { label: "Template Pesan", value: "template", content: <CardTemplate /> },
];

export function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Setting</title>
      </Helmet>
      <div className="flex justify-center">
        <Card className="w-full">
          <h1 className="m-4 font-bold text-xl">Fesyen Store</h1>
          <Tabs items={tabItems} defaultValue="informasi" />
        </Card>
      </div>
    </>
  );
}
