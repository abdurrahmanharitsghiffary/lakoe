import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IoMdPin } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AddLocationDialog } from "@/components/dialog/add-location-dialog";
import { useState } from "react";
import { DeleteLocationDialog } from "@/components/dialog/delete-location-dialog";

export function CardLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <>
      <div className="flex-col justify-center">
        <div className="flex justify-between">
          <div>
            <h1 className="m-4 font-bold text-xl">Lokasi Toko</h1>
            <p className="text-sm text-gray-400 m-4">
              Alamat ini digunakan sebagai alamat pengirimanmu
            </p>
          </div>
          <div className="m-3">
            <Button
              onClick={() => setIsOpen(true)}
              variant="lakoePrimary"
              className="rounded-full"
            >
              Tambah Lokasi
            </Button>
          </div>
        </div>
        <Card className="m-4">
          <div className="flex justify-between">
            <div className=" m-4">
              <h3>Nama Lokasi</h3>
              <h3>Alamat</h3>
              <h3>Kota/Kecamatan</h3>
              <h3>Kode Pos</h3>
              <h3>Pinpoint</h3>
            </div>
            <div className="m-4 ">
              <div className="flex">
                <h3 className="font-semibold">Fesyen Store</h3>
                <h3 className="bg-green-600 text-white rounded-lg px-2 ms-4">
                  Alamat Utama
                </h3>
              </div>
              <h3>Jl. Elang No. 1 Ciputat Timur</h3>
              <h3>Kota Tangerang Selatan</h3>
              <h3>15413</h3>
              <div className="flex mt-2">
                <IoMdPin fill="blue" className="m-1" />
                <h3 className="text-blue-700 font-bold">Sudah Pinpoint</h3>
              </div>
            </div>
            <div className="flex gap-3 m-4 ">
              <Button
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
                className="rounded-full "
              >
                <FaRegTrashAlt size={15} />
              </Button>
              <Button variant={"outline"} className="rounded-full ">
                <FaRegEdit size={15} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <AddLocationDialog isOpen={isOpen} onOpen={setIsOpen} />
      <DeleteLocationDialog isOpen={isOpen2} onOpen={setIsOpen2} />
    </>
  );
}
