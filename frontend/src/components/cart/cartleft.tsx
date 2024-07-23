import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { FaRegCircleCheck, FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BiSolidDiscount } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { formatRupiah } from "@/utils/format-currency";

interface CartsProps {
  name: string;
  image: string;
  price: number;
  count: number;
  variant: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function CartLeft({name,image,price,count,variant,onDecrement,onIncrement}:CartsProps) {
  
  return (
    <div className="flex flex-col w-full px-6">
      <h1 className="text-[30px] mt-10 my-6 ml-4">Keranjang</h1>
      <div className="flex flex-row w-full mt-6">
        <div className="basis-3/4">
          <Card className="mx-4 rounded-xl">
            <Table className="bg-white text-xl w-[1240px] mt-2">
              <TableHeader>
                <TableRow className="text-[15px] hover:bg-white">
                  <TableHead className="pt-3 pb-4">
                    <span className="px-1">PRODUK</span>
                  </TableHead>
                  <TableHead className="pt-3 pb-4">HARGA</TableHead>
                  <TableHead className="pt-3 pb-4">JUMLAH</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow className="text-2xl">
                    <TableCell>
                      <div className="flex flex-row gap-2 px-1 py-1">
                        <img
                          src={image}
                          alt=""
                          className="h-[110px] w-[110px]"
                        />
                        <div className="flex flex-col px-3 my-[-6px]">
                          {name}
                          <span className="text-lg">{variant}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium align-top ml-[30px]">
                      {formatRupiah(price)}
                    </TableCell>
                    <TableCell className="align-top flex">
                      <Button
                        variant={"outline"}
                        className="px-2 border-blue-500"
                      >
                        <FaTrash className="h-5 w-5" color="blue" />
                      </Button>
                      <div className="flex flex-row gap-2 ml-3 w-[60px]">
                        <Button
                          variant={"outline"}
                          className="px-2 border-blue-500"
                          onClick={onDecrement}
                          disabled={count <= 1}
                        >
                          <FaMinus className="h-5 w-5" color="blue" />
                        </Button>
                        <Input
                          name="jumlah"
                          className="w-10 text-lg text-right hover:border-black"
                          value={count}
                          readOnly
                        />
                        <Button
                          variant={"outline"}
                          className="px-2 border-blue-500"
                          onClick={onIncrement}
                        >
                          <FaPlus className="h-5 w-5" color="blue" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <div className="flex flex-row px-4 border-t-2 text-lg py-4 gap-4">
              <Label className="text-lg font-normal mt-2">Catatan:</Label>

              <div className="flex flex-col w-[400px] items-end">
                <Input
                  placeholder="Tulis Catatan/intruksi pesananmu"
                  className="text-lg  rounded-[10px] py-6 w-[400px]"
                />
                <span className="text-lg mt-2">0/150</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="basis-1/4">
          <Card className="mr-4 rounded-xl border-blue-500">
            <Button className="border-b-2 bg-transparent text-black hover:bg-white rounded-xl w-full flex justify-between py-8">
              <div className="flex flex-row w-100 ">
                <div className="flex flex-row w-full items-center gap-4">
                  <BiSolidDiscount className="h-7 w-7" color="blue" />
                  <p className="text-lg">Gunakan / Masukkan Voucher</p>
                </div>
              </div>
              <div className="flex flex-row py-3 items-center">
                <IoIosArrowForward className="h-5 w-5" />
              </div>
            </Button>
            <div className="flex flex-col px-4 py-4">
                <span className="text-[22px] font-bold">Ringkasan Pesanan</span>
                <div className="flex flex-row justify-between text-lg py-3">
                    <span>Subtotal</span>
                    <span>Rp.510000</span>
                </div>
                <div className="border-[1px]"></div>
                <div className="flex flex-row justify-between text-[22px] font-bold py-3">
                    <span>Total</span>
                    <span>Rp.510000</span>
                </div>
            </div>
          </Card>
          <Button className="bg-blue-500 w-[370px] text-xl py-6 my-4 drop-shadow-lg hover:bg-blue-400 space-x-3 ">
                <span><FaRegCircleCheck className="h-6 w-6"/></span>
                <span>Checkout</span>
                
          </Button>
        </div>
      </div>
    </div>
  );
}
