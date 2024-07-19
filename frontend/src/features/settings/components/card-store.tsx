import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputForm } from "@/features/products/components/input/input-form";
import { Button } from "@/components/ui/button";
import { ProductFileInput } from "@/components/input/product-input";

export function CardStore() {
  return (
    <div className="flex-col justify-center m-4">
      <h1 className="font-bold text-xl mb-4">Informasi Toko</h1>
      <div className="flex justify-between">
        <div className="flex flex-col w-full gap-2 mr-4">
          <InputForm
            label="Slogan"
            placeholder="Buat slogan untuk tokomu"
            focus={"lakoePrimary"}
          />
          <InputForm
            label="Nama Toko"
            placeholder="Fesyen Store"
            focus={"lakoePrimary"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label>Deskripsi</Label>
          <Textarea
            placeholder="Masukkan Deskripsi Tokomu"
            className="resize-none h-28"
          />
          <div className="text-end m-3">
            <Button variant="lakoePrimary" className="rounded-full">
              Simpan
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-xl">Logo Toko</h1>
        <ProductFileInput classNames={{ wrapper: "w-36" }} />
        <div className="w-2/4">
          <p className="text-sm">
            Ukuran optimal foto 300 x 300 piksel dengan besar file: Maksimum 10
            Megabytes. Extension file yang diperbolehkan: JPG, JPENG, PNG
          </p>
        </div>
      </div>
    </div>
  );
}
