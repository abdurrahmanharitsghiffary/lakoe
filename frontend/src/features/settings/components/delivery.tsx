import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { motion } from "framer-motion";
import couriersData from "@/data/courier.json";
import { useGetMe } from "@/features/me/api/me-api";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// interface Courier {
//   courierCode: string;
//   courierServiceName: string;
//   description: string;
//   courierServiceCode: string;
// }

// const courier: Courier[] = couriers;
type Courier = "jnt" | "jne" | "sicepat" | "tiki" | "grab" | "gosend";

export function Delivery() {
  const [isOpen, setIsOpen] = useState<{
    [key in Courier]: boolean;
  }>({
    jnt: false,
    jne: false,
    sicepat: false,
    tiki: false,
    grab: false,
    gosend: false,
  });

  const toggle = (courier: Courier) => () => {
    setIsOpen((prev) => ({
      ...prev,
      [courier]: !prev[courier],
    }));
  };

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

  const { data } = useGetMe();
  const storeId = data?.data?.storeId;

  const couriers = couriersData as {
    courierCode: Courier;
    courierServiceName: string;
    courierServiceCode: string;
    description: string;
  }[];

  const handleSwitchChange = (courier: Courier) => async (checked: boolean) => {
    console.log("Switch clicked for:", courier);

    setSelectedCouriers((prev) => {
      const updated = { ...prev, [courier]: checked };
      return updated;
    });

    try {
      const selectedCourier = couriers.find((c) => c.courierCode === courier);

      if (!selectedCourier) {
        console.error("Courier not found:", courier);
        return;
      }
      if (checked) {
        await axios.put(`/stores/${storeId}/couriers`, {
          courierServices: [
            {
              courierCode: selectedCourier.courierCode,
              courierServiceName: selectedCourier.courierServiceName,
              courierServiceCode: selectedCourier.courierServiceCode,
            },
          ],
        });
        console.log("Courier added:", courier);
      } else {
        await axios.delete(`/stores/${storeId}/couriers/${courier}`);
        console.log("Courier removed:", courier);
      }
    } catch (error) {
      console.error("Error updating courier:", error);
    }
  };

  const renderCard = (
    courier: Courier,
    logo: string,
    title: string,
    service: string,
    description: string
  ) => (
    <div className="flex justify-center items-center pt-5">
      <Card className="h-[120px] w-[500px] flex items-center">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row w-full items-center">
            <img src={logo} className="w-[120px] m-5 mt-6" />
            <div className="flex flex-col w-full justify-center">
              <div className="flex">
                <CardTitle className="text-lg capitalize">{title}</CardTitle>
                <h1 className="mx-3">-</h1>
                <CardTitle className="text-lg">{service}</CardTitle>
              </div>
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

  const filteredCourier = couriers.filter(
    (courier) => courier.courierServiceCode === "reg"
  );

  return (
    <div>
      <Typography variant={"h2"}>Pengiriman</Typography>
      <Typography variant={"p"}>
        Atur kurir yang ingin kamu sediakan di tokomu
      </Typography>
      <div className="flex flex-col items-center">
        {filteredCourier.map((courier) =>
          renderCard(
            courier.courierCode as Courier,
            `/assets/logo-logistic/${courier.courierCode}.svg`,
            courier.courierCode,
            courier.courierServiceName,
            courier.description
          )
        )}
      </div>
    </div>
  );
}

// const { data } = useGetMe();
// const storeId = data?.data?.storeId;

// const url = checked
//   ? `/stores/${storeId}/couriers`
//   : `/stores/${storeId}/couriers/${code}`;
// const options = {
//   method: checked ? "POST" : "DELETE",
//   url: url,
//   data: checked ? { code: courier } : undefined,
// };
