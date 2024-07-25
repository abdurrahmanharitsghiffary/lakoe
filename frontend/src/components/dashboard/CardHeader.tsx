import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { PiHandWithdraw } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";
import { PiExclamationMarkFill } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { useState } from "react";
import { DashboardDialogTarikCredit } from "../dialog/dasboard-dialog-tarikcredit";

function CardHeader() {
  const [isWihtdrawalCreditOpen, setIsWithdrawalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-4 p-[20px] mb-[-22px]">
      <div>
        <h1 className=" mr-4 text-[26px] font-bold mt-2">Credit Dashboard</h1>
      </div>
      <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full">
        <p className="mx-4">Current Balance</p>
        <h1 className="text-[26px] font-bold mx-4" style={{ color: "#0086b3" }}>
          Rp0{" "}
        </h1>
        <Button
          onClick={() => setIsWithdrawalOpen(true)}
          className=" mx-4 w-100 bg-lakoe-primary"
        >
          Tarik Credit
        </Button>
        <DashboardDialogTarikCredit
          isOpen={isWihtdrawalCreditOpen}
          onOpen={setIsWithdrawalOpen}
        />
      </Card>
      <div className="flex flex-row gap-4">
        <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full">
          <PiHandWithdraw className="mx-4 h-10 w-10 " color="#0086b3" />
          <p className="mx-4">Penarikan sedang dalam proses</p>
          <h1 className="text-[26px] font-bold mx-4 mt-9">Rp0 </h1>
        </Card>
        <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full">
          <FaMoneyBillWave className="mx-4 h-10 w-10" color="#0086b3" />
          <span className="mx-4 flex flex-row">
            Saldo Tertahan{" "}
            <PiExclamationMarkFill className="mx-1 h-5 w-5 mt-1" />{" "}
          </span>
          <span className="mx-4" style={{ color: "blue" }}>
            Lihat Semua
          </span>
          <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
        </Card>
        <Card className="flex flex-col bg-white h-auto gap-4 py-4 w-full">
          <RiBillFill className="mx-4 h-10 w-10" color="#0086b3" />
          <span className="mx-4">Tagihan Belum Dibayar</span>
          <span className="mx-4" style={{ color: "blue" }}>
            Lihat Semua
          </span>
          <h1 className="text-[26px] font-bold mx-4">Rp0 </h1>
        </Card>
      </div>
    </div>
  );
}

export default CardHeader;
