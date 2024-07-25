import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type Courier = "jnt" | "jne" | "sicepat" | "tiki" | "grab" | "gosend";

export function Delivery() {
  // const [isOpen, setIsOpen] = useState<{
  //   [key in Courier]: boolean;
  // }>({
  //   jnt: false,
  //   jne: false,
  //   sicepat: false,
  //   tiki: false,
  //   grab: false,
  //   gosend: false,
  // });

  // const toggle = (courier: Courier) => () => {
  //   setIsOpen((prev) => ({
  //     ...prev,
  //     [courier]: !prev[courier],
  //   }));
  // };

  const [selectedCouriers, setSelectedCouriers] = useState<{
    [key in Courier]: boolean;
  }>({
    jnt: false,
    jne: false,
    sicepat: false,
    tiki: false,
    grab: false,
    gosend: false,
  });

  const handleSwitchChange = (courier: Courier) => (checked: boolean) => {
    console.log("Switch clicked for:", courier);
    setSelectedCouriers({
      ...selectedCouriers,
      [courier]: checked,
    });
  };

  const renderCard = (
    courier: Courier,
    logo: string,
    title: string,
    description: string
  ) => (
    <div className="flex justify-center items-center pt-5">
      <Card className="h-[120px] w-[500px] flex items-center">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row w-full items-center">
            <img src={logo} className="w-[120px] m-5 mt-6" />
            <div className="flex flex-col w-full justify-center">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Switch
            id={courier}
            className="ml-5 data-[state=checked]:bg-lakoe-primary mr-7"
            checked={selectedCouriers[courier]}
            onCheckedChange={handleSwitchChange(courier)}
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <Typography variant={"h2"}>Pengiriman</Typography>
      <Typography variant={"p"}>
        Atur kurir yang ingin kamu sediakan di tokomu
      </Typography>
      <div className="flex flex-col items-center">
        {renderCard(
          "jnt",
          "/assets/logo-logistic/j&t.svg",
          "J&T",
          "Next Day Reguler"
        )}
        {renderCard(
          "jne",
          "/assets/logo-logistic/jne.svg",
          "JNE",
          "Next Day Reguler"
        )}
        {renderCard(
          "sicepat",
          "/assets/logo-logistic/sicepat.svg",
          "SiCepat",
          "Next Day Reguler"
        )}
        {renderCard(
          "grab",
          "/assets/logo-logistic/grab.png",
          "Grab",
          "Next Day Reguler"
        )}
        {renderCard(
          "gosend",
          "/assets/logo-logistic/gosent.png",
          "Gosend",
          "Next Day Reguler"
        )}
      </div>
    </div>
  );
}
