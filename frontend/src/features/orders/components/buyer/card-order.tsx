import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { IoBagHandleOutline, IoPersonOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function CardOrderBuyer() {
  const [count, setCount] = useState(0);
  const [focused, setFocus] = useState<number | null>(null);

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount < 1 ? 0 : prevCount - 1));
  };

  const variants = [
    { id: 1, value: "Merah" },
    { id: 2, value: "Kuning" },
    { id: 3, value: "Hijau" },
    { id: 4, value: "Biru" },
  ];

  return (
    <>
      <div className="w-full flex ">
        <Avatar className="m-3">
          <AvatarImage src="https://i.pinimg.com/736x/8f/8a/1a/8f8a1a8271cc85d85452ada01dc34d92.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <div className="m-auto mt-20 flex justify-center ">
          <div className="w-2/4">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1609011809547-fec587101c8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-lg "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://images.unsplash.com/photo-1609011809547-fec587101c8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full rounded-lg "
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://images.unsplash.com/photo-1609011809547-fec587101c8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full rounded-lg "
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="w-2/4 m-3 ">
              <h1 className="text-xl font-semibold mb-4 ">
                Produk Baru Dilihat
              </h1>
              <img
                className="rounded-lg"
                src="https://images.unsplash.com/photo-1609011809547-fec587101c8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <h2 className="text-lg ">Sepatu Baru</h2>
              <h2 className="text-lg ">Rp. 200.000</h2>
            </div>
          </div>

          <div className="w-2/5 flex-col m-4">
            <h1 className="text-2xl font-bold ">Sepatu Baru</h1>

            <div className="flex-col">
              <div className="flex my-4 justify-between">
                <h1 className="text-lg font-semibold">Harga</h1>
                <h1 className="text-2xl font-semibold">Rp. 200.000</h1>
              </div>

              <div className="flex my-4 justify-between">
                <h1 className="text-lg font-semibold">Jumlah</h1>
                <div className="flex gap-2">
                  <Button onClick={handleDecrement} variant={"outline"}>
                    -
                  </Button>
                  <input
                    type="text"
                    className="flex-1  text-center placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 max-w-10 rounded-lg  outline outline-1 outline-slate-500"
                    placeholder={count.toString()}
                  />
                  <Button
                    onClick={() => setCount(count + 1)}
                    variant={"outline"}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 ms-56 mt-10">
                {variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={"outline"}
                    isFocused={focused === variant.id}
                    onClick={() => setFocus(variant.id)}
                  >
                    {variant.value}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 mt-10">
                <Button className="ms-56" variant={"outline"}>
                  Beli Langsung
                </Button>
                <Button variant={"lakoePrimary"}>
                  Keranjang{" "}
                  <IoIosArrowRoundForward size={20} className="my-3 ms-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 m-3">
          <IoBagHandleOutline size={30} />
          <IoPersonOutline size={30} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Lihat Partner Pembayaran & Logistik
            </AccordionTrigger>
            <div className="flex ">
              <AccordionContent>
                <h2 className="text-lg font-semibold">Partner Pembayaran</h2>
                <div className="w-3/4 grid grid-cols-3 gap-4">
                  <img className="w-14" src="/assets/logo-payment/bca.svg" />
                  <img
                    className="w-14 mt-3"
                    src="/assets/logo-payment/ovo.svg"
                  />
                  <img
                    className="w-14 mt-3"
                    src="/assets/logo-payment/bni.svg"
                  />
                  <img className="w-14" src="/assets/logo-payment/bri.svg" />
                  <img
                    className="w-14"
                    src="/assets/logo-payment/mandiri.svg"
                  />
                </div>
              </AccordionContent>

              <AccordionContent>
                <h2 className="text-lg font-semibold">Partner Logistik</h2>
                <div className="w-3/4 grid grid-cols-3 gap-4 mt-3">
                  <img className="w-14" src="/assets/logo-logistic/j&t.svg" />
                  <img className="w-14" src="/assets/logo-logistic/jne.svg" />
                  <img
                    className="w-14"
                    src="/assets/logo-logistic/sicepat.svg"
                  />
                  <img className="w-14" src="/assets/logo-logistic/tiki.svg" />
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
