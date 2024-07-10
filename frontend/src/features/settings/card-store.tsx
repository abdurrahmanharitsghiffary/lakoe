import { InputForm } from "../products/components/input/input-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputFileHidden from "@/components/ui/input-file-hidden";
import { RiImageAddLine } from "react-icons/ri";

// type TabType = "informasi" | "lokasi" | "template";
export function CardStore() {
  return (
    <>
      <div className="flex-col justify-center">
        <h1 className="m-4 font-bold text-xl">Informasi Toko</h1>
        <div className="flex justify-between">
          <div className="flex-col w-full">
            <InputForm label="Slogan" placeholder="Buat slogan untuk tokomu" />
            <InputForm label="Nama Toko" placeholder="Fesyen Store" />
          </div>
          <div className="m-3 w-full">
            <Label>Deskripsi</Label>
            <Textarea
              placeholder="Masukkan Deskripsi Tokomu"
              className="resize-none h-28"
            />
            <div className="text-end m-3">
              <Button className="bg-blue-500 text-white rounded-full ">
                Simpan
              </Button>
            </div>
          </div>
        </div>
        <h1 className="m-4 font-bold text-xl">Logo Toko</h1>
        <div className="m-4 border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
          <InputFileHidden>
            <RiImageAddLine size={50} className="text-gray-400 ms-4" />
            <p className="text-gray-400 ms-2">Unggah Foto</p>
          </InputFileHidden>
        </div>
        <div className="w-2/4 m-3">
          <p className="text-sm">
            Ukuran optimal foto 300 x 300 piksel dengan besar file: Maksimum 10
            Megabytes. Extension file yang diperbolehkan: JPG, JPENG, PNG
          </p>
        </div>
      </div>
    </>
  );
}
