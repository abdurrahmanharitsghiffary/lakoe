import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

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

  const handleSwitchChange = (courier: Courier) => (checked: boolean) => {
    console.log("Switch clicked for:", courier);
    setSelectedCouriers({
      ...selectedCouriers,
      [courier]: checked,
    });
  };

  return (
    <div>
      <Typography variant={"h2"}>Pengiriman</Typography>
      <Typography variant={"p"}>
        Atur kurir yang ingin kamu sediakan di tokomu
      </Typography>

      <div className="flex justify-center">
        <div>
          {/* J&T Express */}
          <div className="flex justify-center items-center pt-5 ">
            <Card className="h-[120px] w-[500px] flex items-center ">
              <div className="flex flex-row items-center w-[2100px] justify-between ">
                <div className="flex flex-row w-full">
                  <img
                    src="/assets/logo-logistic/j&t.svg"
                    className="w-[120px] m-5 mt-6"
                  />
                  <div className="flex flex-col w-full justify-center">
                    <CardTitle>J&T</CardTitle>
                    <CardDescription>Next Day Reguler</CardDescription>
                  </div>
                </div>
                <div className="flex float-right">
                  <Switch
                    id="jnt"
                    className="ml-10 data-[state=checked]:bg-lakoe-primary"
                    checked={selectedCouriers.jnt}
                    onCheckedChange={handleSwitchChange("jnt")}
                  />
                </div>
              </div>

              <div className="relative w-full pr-2">
                <div
                  className="flex justify-end items-center w-full cursor-pointer"
                  onClick={toggle("jnt")}
                >
                  <motion.span
                    className="relative"
                    style={{ transformOrigin: "center" }}
                    animate={{ rotate: isOpen.jnt ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoIosArrowUp className="w-5 h-5 m-5" />
                  </motion.span>
                </div>

                {isOpen.jnt && (
                  <div className="absolute flex-col font-semibold">
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Same Day</p>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Next Day</p>
                      </label>
                    </div>
                  </div>
                )}
              </div>

            </Card>
          </div>

          {/* JNE */}
          <div className="flex justify-center items-center pt-5">
            <Card className="h-[120px] w-[500px] flex items-center ">
              <div className="flex flex-row items-center w-[2100px] justify-between ">
                <div className="flex flex-row w-full">
                  <img
                    src="/assets/logo-logistic/jne.svg"
                    className="w-[120px] m-5 mt-6"
                  />
                  <div className="flex flex-col w-full justify-center">
                    <CardTitle>JNE</CardTitle>
                    <CardDescription>Next Day Reguler</CardDescription>
                  </div>
                </div>
                <div className="flex float-right">
                  <Switch
                    id="jnt"
                    className="ml-10 data-[state=checked]:bg-lakoe-primary"
                    checked={selectedCouriers.jne}
                    onCheckedChange={handleSwitchChange("jne")}
                  />
                </div>
              </div>
              <div className="relative w-full pr-2">
                <div
                  className="flex justify-end items-center w-full cursor-pointer"
                  onClick={toggle("jne")}
                >
                  <motion.span
                    className="relative"
                    style={{ transformOrigin: "center" }}
                    animate={{ rotate: isOpen.jne ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoIosArrowUp className="w-5 h-5 m-5" />
                  </motion.span>
                </div>

                {isOpen.jne && (
                  <div className="flex-col absolute font-semibold">
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Same Day</p>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Next Day</p>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sicepat */}
          <div className="flex justify-center items-center pt-5">
            <Card className="h-[120px] w-[500px] flex items-center ">
              <div className="flex flex-row items-center w-[2100px] justify-between ">
                <div className="flex flex-row w-full">
                  <img
                    src="/assets/logo-logistic/sicepat.svg"
                    className="w-[120px] m-5 mt-6"
                  />
                  <div className="flex flex-col w-full justify-center">
                    <CardTitle>SiCepat</CardTitle>
                    <CardDescription>Next Day Reguler</CardDescription>
                  </div>
                </div>
                <div className="flex float-right">
                  <Switch
                    id="sicepat"
                    className="ml-10 data-[state=checked]:bg-lakoe-primary"
                    checked={selectedCouriers.sicepat}
                    onCheckedChange={handleSwitchChange("sicepat")}
                  />
                </div>
              </div>
              <div className="relative w-full pr-2">
                <div
                  className="flex justify-end items-center w-full cursor-pointer"
                  onClick={toggle("sicepat")}
                >
                  <motion.span
                    className="relative"
                    style={{ transformOrigin: "center" }}
                    animate={{ rotate: isOpen.sicepat ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoIosArrowUp className="w-5 h-5 m-5" />
                  </motion.span>
                </div>

                {isOpen.sicepat && (
                  <div className="flex-col absolute font-semibold">
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Same Day</p>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Next Day</p>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Tambahan untuk kurir lainnya */}
          <div className="ml-3 mt-2">
            {/* Grab */}
            <div className="flex justify-center items-center pt-5">
              <Card className="h-[120px] w-[500px] flex items-center ">
                <div className="flex flex-row items-center w-[2100px] justify-between ">
                  <div className="flex flex-row w-full">
                    <img
                      src="/assets/logo-logistic/grab.png"
                      className="w-[120px] m-5 mt-6"
                    />
                    <div className="flex flex-col w-full justify-center">
                      <CardTitle>Grab</CardTitle>
                      <CardDescription>Next Day Reguler</CardDescription>
                    </div>
                  </div>
                  <div className="flex float-right">
                    <Switch
                      id="grab"
                      className="ml-10 data-[state=checked]:bg-lakoe-primary"
                      checked={selectedCouriers.grab}
                      onCheckedChange={handleSwitchChange("grab")}
                    />
                  </div>
                </div>
                <div className="relative w-full pr-2">
                  <div
                    className="flex justify-end items-center w-full cursor-pointer"
                    onClick={toggle("grab")}
                  >
                    <motion.span
                      className="relative"
                      style={{ transformOrigin: "center" }}
                      animate={{ rotate: isOpen.grab ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoIosArrowUp className="w-5 h-5 m-5" />
                    </motion.span>
                  </div>

                  {isOpen.grab && (
                    <div className="flex-col absolute font-semibold">
                      <div className="mt-3">
                        <label className="flex items-center">
                          <input type="checkbox" />
                          <p>Same Day</p>
                        </label>
                      </div>
                      <div className="mt-3">
                        <label className="flex items-center">
                          <input type="checkbox" />
                          <p>Next Day</p>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Gosend */}
            <div className="flex justify-center items-center pt-5">
              <Card className="w-full flex flex-col items-center border-2">
                <div className="w-full flex items-center">
                  <div className="flex flex-1 items-center">
                    <img
                      src="/assets/logo-logistic/gosent.png"
                      className="w-[120px] m-5 mt-6"
                    />

                    <div className="flex flex-col w-full justify-center">
                      <CardTitle>Gosend</CardTitle>
                      <CardDescription>Next Day Reguler</CardDescription>
                    </div>
                  </div>

                  <div className="flex float-right">
                    <Switch
                      id="gosend"
                      className="data-[state=checked]:bg-lakoe-primary ml-10"
                      checked={selectedCouriers.gosend}
                      onCheckedChange={handleSwitchChange("gosend")}
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={toggle("gosend")}
                  >
                    <motion.span
                      className="relative"
                      style={{ transformOrigin: "center" }}
                      animate={{ rotate: isOpen.gosend ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoIosArrowUp className="w-5 h-5 m-5" />
                    </motion.span>
                  </div>
                </div>
                {isOpen.gosend && (
                  <div className="w-full flex-col font-semibold p-4">
                    <div className="mt-3">
                      <input type="checkbox" />
                      <p>Same Day</p>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <p>Next Day</p>
                      </label>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
