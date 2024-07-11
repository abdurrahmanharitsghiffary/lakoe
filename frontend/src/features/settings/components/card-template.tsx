import { ButtonPrimary } from "@/components/button/btn-primary";
import { AddTemplateDialog } from "@/components/dialog/add-template-dialog";
import { DeleteTemplateDialog } from "@/components/dialog/delete-template-dialog";
import { UpdateTemplateDialog } from "@/components/dialog/update-template-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export function CardTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <>
      <div className="flex-col justify-center">
        <div className="flex justify-between">
          <h1 className="m-4 font-bold text-xl">Daftar Template Pesan</h1>
          <ButtonPrimary
            onClick={() => setIsOpen(true)}
            className="rounded-full m-4"
          >
            Buat Template
          </ButtonPrimary>
        </div>
        <Card className="m-4">
          <div className="flex justify-between">
            <div className="m-4">
              <h2 className="font-semibold text-lg">
                Pesan Konfirmasi Pesanan
              </h2>
              <p>
                Halo terima kasih telah berbelanja di Fesyen Store. Berikut
                rincian pesanan Anda
              </p>
              <ul className="list-disc ms-8">
                <li>Nama Produk:[Nama Produk]</li>
                <li>Jumlah:[Jumlah]</li>
                <li>
                  Total Harga:[Total Harga] Mohon konfirmasi pesanan anda.
                  Terima kasih
                </li>
              </ul>
            </div>

            <div className="flex gap-3 m-4 ">
              <Button
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
                className="rounded-full "
              >
                <FaRegTrashAlt size={15} />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setIsOpen3(true)}
                className="rounded-full  "
              >
                <FaRegEdit size={15} />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="m-4">
          <div className="flex justify-between">
            <div className="m-4">
              <h2 className="font-semibold text-lg">Pesan Promo</h2>
              <p>
                Hei Fesyen Store sedang mengadakan promo spesial! Dapatkan
                diskon[Presentase Diskon]% untuk pembelian diatas [Jumlah
                Minimum Pembelian]. Segera kunjungi Toko Kami dan manfaatkan
                promo ini!!
              </p>
            </div>

            <div className="flex gap-3 m-4 ">
              <Button
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
                className="rounded-full "
              >
                <FaRegTrashAlt size={15} />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setIsOpen3(true)}
                className="rounded-full  "
              >
                <FaRegEdit size={15} />
              </Button>
            </div>
          </div>
        </Card>
        <Card className="m-4">
          <div className="flex justify-between">
            <div className="m-4">
              <h2 className="font-semibold text-lg">Pesan Pembayaran</h2>
              <p>
                Halo Fesyen Store Pesanan anda sudah siap. Mohon segera lakukan
                pembayaran sebesar [Total Pembayaran] ke nomor rekening [Nomor
                Rekening] a/n [Nama Pemilik Rekening]. Setelah pembayaran
                dikonfirmasi. Pesanan segera kami proses
              </p>
            </div>

            <div className="flex gap-3 m-4 ">
              <Button
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
                className="rounded-full "
              >
                <FaRegTrashAlt size={15} />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setIsOpen3(true)}
                className="rounded-full  "
              >
                <FaRegEdit size={15} />
              </Button>
            </div>
          </div>
        </Card>
        <Card className="m-4">
          <div className="flex justify-between">
            <div className="m-4">
              <h2 className="font-semibold text-lg">Pesan Follow Up</h2>
              <p>
                Hai [Nama Customer], kami ingin tahu apakah Anda puas dengan
                pesanan anda dari Fesyen Store. Jika anda memiliki pertanyaan
                atau umpan balik, jangan ragu untuk menghubungi kami. Kami
                selalu siap membantu
              </p>
            </div>

            <div className="flex gap-3 m-4 ">
              <Button
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
                className="rounded-full "
              >
                <FaRegTrashAlt size={15} />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setIsOpen3(true)}
                className="rounded-full  "
              >
                <FaRegEdit size={15} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <AddTemplateDialog isOpen={isOpen} onOpen={setIsOpen} />
      <DeleteTemplateDialog isOpen={isOpen2} onOpen={setIsOpen2} />
      <UpdateTemplateDialog isOpen={isOpen3} onOpen={setIsOpen3} />
    </>
  );
}
