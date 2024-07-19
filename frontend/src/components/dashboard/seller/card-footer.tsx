import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa6";
import { TbCreditCardRefund } from "react-icons/tb";
import { MdAddCard } from "react-icons/md";
import { PiExclamationMarkFill } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { LiaMoneyCheckSolid } from "react-icons/lia";

export function CardFooter() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-[20px] font-bold mx-4">Reporting Period</h1>
          <Button variant="outline" className="rounded-full mx-4">
            <FaRegCalendarAlt className="mx-2 h-4 w-4" />
            DD/MM/YY
          </Button>
        </div>
        <div className="flex flex-row gap-4 mx-4">
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <GiCheckMark className="mx-4 h-10 w-10 " color="#0086b3" />
            <p className="mx-4">Penarikan Selesai</p>
            <h1 className="text-[26px] font-bold mx-4">Rp0</h1>
          </Card>
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <FaMoneyBillTrendUp className="mx-4 h-10 w-10" color="#0086b3" />
            <span className="mx-4 flex flex-row">Pendapatan COD </span>
            <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
          </Card>
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <TbMoneybag className="mx-4 h-10 w-10" color="#0086b3" />
            <span className="mx-4">Cashback Pengiriman</span>
            <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
          </Card>
        </div>
        <div className="flex flex-row gap-4 mx-4">
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <FaCreditCard className="mx-4 h-10 w-10 " color="#0086b3" />
            <p className="mx-4">Pendapatan E-Payments</p>
            <h1 className="text-[26px] font-bold mx-4">Rp0</h1>
          </Card>
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <TbCreditCardRefund className="mx-4 h-10 w-10" color="#0086b3" />
            <span className="mx-4 flex flex-row">Refund Biaya Pengiriman </span>
            <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
          </Card>
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <MdAddCard className="mx-4 h-10 w-10" color="#0086b3" />
            <span className="mx-4">Kredit Lainnya</span>
            <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
          </Card>
        </div>
        <div className="flex flex-row gap-4 mx-4">
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <LiaMoneyCheckSolid className="mx-4 h-10 w-10 " color="#0086b3" />
            <p className="flex flex-row mx-4">
              Klaim Pengiriman{" "}
              <PiExclamationMarkFill className="mx-1 h-5 w-5 mt-1" />
            </p>
            <h1 className="text-[26px] font-bold mx-4">Rp0</h1>
          </Card>
          <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full shadow-md">
            <RiBillFill className="mx-4 h-10 w-10" color="#0086b3" />
            <span className="mx-4 flex flex-row">Pembayaran Penagihan</span>
            <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
          </Card>
        </div>
      </Card>
    </div>
  );
}
