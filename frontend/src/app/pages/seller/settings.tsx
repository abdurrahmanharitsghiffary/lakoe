import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardLocation } from "@/features/settings/components/card-location";
import { CardStore } from "@/features/settings/components/card-store";
import { CardTemplate } from "@/features/settings/components/card-template";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

type TabType = "informasi" | "lokasi" | "template";
export function SettingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const t = (searchParams.get("t") || "informasi") as TabType;
  const handleValueChange = (type: string) => {
    navigate({ search: "?t=" + type });
  };

  return (
    <>
      <Helmet>
        <title>Setting</title>
      </Helmet>
      <div className="flex justify-center">
        <Card className="w-full">
          <h1 className="m-4 font-bold text-xl">Fesyen Store</h1>
          <Tabs
            defaultValue="semua"
            onValueChange={handleValueChange}
            value={t}
          >
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="informasi"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Informasi
              </TabsTrigger>
              <TabsTrigger
                value="lokasi"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Lokasi
              </TabsTrigger>
              <TabsTrigger
                value="template"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Template Pesan
              </TabsTrigger>
            </TabsList>
            <TabsContent value="informasi">
              <CardStore />
            </TabsContent>
            <TabsContent value="lokasi">
              <CardLocation />
            </TabsContent>
            <TabsContent value="template">
              <CardTemplate />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
