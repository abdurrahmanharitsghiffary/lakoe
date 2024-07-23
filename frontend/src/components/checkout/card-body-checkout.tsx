import { useAddCheckout } from "@/hooks/use-add-checkout";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
// import {
//   FormControl,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { PinpointCheckout } from "./pinpoint-checkout";

export function CardBodyCheckout() {
  const { register, errors } = useAddCheckout();
  return (
    <div className="flex w-full mt-4">
      <Card className="flex w-full h-auto py-4">
        <div className="flex-col px-4 w-full">
          <h1 className="text-2xl font-bold mx-3"> Alamat Pengiriman</h1>
          <form>
            <div className="flex w-full">
              <div className="flex-col w-[880px] mt-4">
                <>
                  <Label className="text-lg px-4 mb-[-10px]">
                    Nama Penerima
                  </Label>
                  <Input
                    id="recipientName"
                    placeholder="Masukkan Nama Anda"
                    {...register("recipientName")}
                    className="text-lg h-12 mb-4 mx-3 w-100"
                  />
                  {errors.recipientName && (
                    <p>{errors.recipientName.message}</p>
                  )}
                </>

                <>
                  <Label className="text-lg px-4 mb-[-10px]">No HP</Label>
                  <Input
                    id="telephone"
                    className="text-lg h-12 mb-4 mx-3 w-100"
                    placeholder="Masukkan No Telp yang Valid"
                    startAdornment="+62"
                    {...register("telephone")}
                  />
                  {errors.telephone && <p>{errors.telephone.message}</p>}
                </>
                <div className="flex-col px-3 mb-4">
                  <>
                    <Label
                      htmlFor="subDistrict"
                      className="text-lg px-1 mb-[-10px]"
                    >
                      Kecamatan
                    </Label>
                    <Select>
                      <SelectTrigger className="text-lg h-12">
                        <SelectValue
                          {...register("subDistrict")}
                          id="subDistrict"
                          placeholder="Pilih Kecamatan"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-lg" value="Ciputat">
                          Ciputat
                        </SelectItem>
                        <SelectItem className="text-lg" value="Pondok Ranji">
                          Pondok Ranji
                        </SelectItem>
                        <SelectItem className="text-lg" value="Pondok Aran">
                          Pondok Aren
                        </SelectItem>
                        <SelectItem className="text-lg" value="Serpong">
                          Serpong
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subDistrict && <p>{errors.subDistrict.message}</p>}
                  </>
                </div>

                <div className="flex-col px-3 mb-4">
                  <>
                    <Label htmlFor="ward" className="text-lg px-1 mb-[-10px]">
                      Kelurahan
                    </Label>
                    <Select>
                      <SelectTrigger className="text-lg h-12">
                        <SelectValue
                          id="ward"
                          placeholder="Pilih Kelurahan"
                          {...register("ward")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-lg" value="Jombang">
                          Jombang
                        </SelectItem>
                        <SelectItem className="text-lg" value="Pondok Ranji">
                          Pondok Ranji
                        </SelectItem>
                        <SelectItem className="text-lg" value="Pondok Aren">
                          Pondok Aren
                        </SelectItem>
                        <SelectItem className="text-lg" value="Serpong">
                          Serpong
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.ward && <p>{errors.ward.message}</p>}
                  </>
                </div>
                <div className="flex-col px-3 mb-4">
                  <>
                    <Label className="text-lg px-1 mb-[-10px]">
                      Detail Alamat
                    </Label>
                    <Textarea
                      id="addressDetails"
                      {...register("addressDetails")}
                      placeholder="Isi dengan nama jalan, nomor rumah, nomor gedung, lantai atau nomor unit"
                      className="text-lg h-12"
                    />
                  </>
                </div>
                <PinpointCheckout />
                <div className="flex-col px-3 mb-4">
                  <Checkbox id="terms" className="h-5 w-5" />
                  <label
                    htmlFor="terms"
                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2 my-4"
                  >
                    Simpan dan Informai Akun Ini dan daftar Akun
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
