import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { FiTruck } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { Typography } from "@/components/ui/typography";
import { RiAddFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { StoreAvatar } from "@/components/store/avatar";

export function ProductPage() {
  return (
    <div className="w-full gap-2 min-h-[100dvh] flex">
      <div className="w-[30%] px-14 max-h-[100dvh] flex items-center  min-h-[100dvh] h-full">
        <Carousel className="h-full w-full flex items-center">
          <CarouselContent className="aspect-square max-w-sm">
            <CarouselItem>
              <img
                src="https://media.istockphoto.com/id/182454992/id/foto/abu-abu-t-dengan-jalur-kliping.jpg?s=1024x1024&w=is&k=20&c=C9fQc7nYF6BSRBbHsr-2UCwk932MehaZsLA-Gr_Jvyw="
                alt=""
                className="w-full block rounded-lg h-full aspect-square object-cover object-center"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://media.istockphoto.com/id/482949611/id/foto/kaos-putih-kosong-depan-dengan-jalur-kliping.jpg?s=1024x1024&w=is&k=20&c=8oS0Jzo_ffjty_VlNrl1AnhG2oyJI0ofo9FfBTid4nI="
                alt=""
                className="w-full block rounded-lg h-full aspect-square object-cover object-center"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://media.istockphoto.com/id/831591150/id/foto/kaos-kuning-depan-dan-belakang-digunakan-sebagai-template-desain.jpg?s=1024x1024&w=is&k=20&c=sNy1IQvx2WHMY76hdMgJoVxl2w1TCz0ew9KCjOPexwg="
                alt=""
                className="w-full block rounded-lg h-full aspect-square object-cover object-center"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-[40%] flex flex-col gap-2 px-2 overflow-y-auto max-h-[100dvh] hide-scrollbar p-4">
        <Typography className="text-2xl font-bold">
          Baju tangan panjang
        </Typography>
        <Typography
          className="text-3xl font-bold
        "
        >
          Rp 100.100
        </Typography>
        <div className="flex gap-2 items-center">
          <p>Terjual 41+</p>•
          <p className="flex items-center gap-1">
            <FaStar className="text-yellow-300" />
            4.5 (10 Rating)
          </p>
        </div>
        <hr />

        <div className="flex flex-col gap-2">
          <p className="text-md">
            <span className="font-semibold">Pilih warna:</span> grey
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg">
              Grey
            </Button>
            <Button variant="lakoeOutline" className="rounded-lg">
              Red
            </Button>
            <Button variant="outline" className="rounded-lg">
              Tosca
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-md">
            <span className="font-semibold">Pilih ukuran:</span> XL
          </p>
          <div className="flex gap-2">
            <Button variant="lakoeOutline" className="rounded-lg">
              XL
            </Button>
            <Button variant="outline" className="rounded-lg">
              SM
            </Button>
            <Button variant="outline" className="rounded-lg">
              LG
            </Button>
          </div>
        </div>

        <hr />
        <p>
          <span className="font-semibold">Min. Pemesanan:</span>1 buah
        </p>
        <Typography className="text-xl font-semibold">Summary</Typography>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          aperiam quia quos facilis id ex explicabo, praesentium, totam maiores
          repellat minus doloremque aspernatur sed sint facere doloribus natus
          excepturi deleniti! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nobis praesentium ipsum incidunt quasi error iure laboriosam!
          Incidunt animi ullam omnis voluptatum maiores! Eius nisi deserunt
          deleniti, distinctio omnis accusamus praesentium.
        </p>
        <hr />
        <div className="flex gap-4 my-2 justify-between items-center">
          <StoreAvatar
            fallback="TokoPAEDI"
            name="TokoPAEDI"
            src="https://scontent.fcgk6-3.fna.fbcdn.net/v/t1.6435-9/102383476_808754649531510_5178216127481084694_n.jpg?stp=dst-jpg_p552x414&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Vj-OhdWfy6gQ7kNvgGX8vX9&_nc_ht=scontent.fcgk6-3.fna&oh=00_AYColpGtpN36oKhdrMULfpvD0s2-E11WtqL1L5-vpYT5iQ&oe=66C80387"
          />
          <Button variant="lakoeOutline">Follow</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="text-xl font-semibold">Pengiriman</Typography>
          <div className="flex items-center gap-2">
            <FiMapPin /> Dikirim Dari <strong>Jawa Barat</strong>
          </div>

          <div className="flex items-center gap-2">
            <FiTruck /> Ongkir reguler 8rb - 10rb
          </div>
        </div>
      </div>

      <div className="w-[30%] h-full max-h-[100dvh] min-h-[100dvh] flex items-center p-4">
        <Card className="w-full py-4">
          <CardContent className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Atur jumlah dan catatan</h2>
            <div className="flex gap-2 items-center">
              <img
                src="https://media.istockphoto.com/id/182454992/id/foto/abu-abu-t-dengan-jalur-kliping.jpg?s=1024x1024&w=is&k=20&c=C9fQc7nYF6BSRBbHsr-2UCwk932MehaZsLA-Gr_Jvyw="
                alt=""
                className="w-full block rounded-lg h-full aspect-square object-cover object-center max-w-[70px]"
              />
              <p className="font-semibold">Red, XL</p>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <div className="flex -space-x-px items-center">
                <Button variant="outline" className="rounded-r-none focus:z-10">
                  -
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none focus:z-10 p-0"
                >
                  <input
                    type="text"
                    value="10"
                    className=" outline-none h-full px-4 w-12"
                  />
                </Button>
                <Button variant="outline" className="rounded-l-none focus:z-10">
                  +
                </Button>
              </div>
              <span>
                <span className="font-semibold">Stock: </span>
                99
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="w-full flex justify-between text-lg">
              <p className="text-muted-foreground">Subtotal:</p>
              <p className="font-semibold">Rp 200.000</p>
            </div>
            <Button className="w-full">
              <RiAddFill />
              Keranjang
            </Button>
            <Button className="w-full" variant="outline">
              Beli langsung
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
