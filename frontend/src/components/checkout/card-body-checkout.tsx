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
import { useFormContext, Controller } from "react-hook-form";
import { FormCheckout } from "@/validator/checkout-validator";

interface CardBodyProps {
  onInputChange: (name: keyof FormCheckout, value: string) => void;
  formData: FormCheckout;
}

export function CardBodyCheckout({ onInputChange, formData }: CardBodyProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormCheckout>();
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
                    type="text"
                    {...register("recipientName")}
                    value={formData.recipientName}
                    className="text-lg h-12 mb-4 mx-3 w-100"
                  />
                  {errors.recipientName && (
                    <p className="ml-4 text-red-500 mt-[-10px] mb-3">
                      {errors.recipientName.message}
                    </p>
                  )}
                </>

                <>
                  <Label className="text-lg px-4 mb-[-10px]">No HP</Label>
                  <Input
                    id="telephone"
                    className="text-lg h-12 mb-4 mx-3 w-100"
                    placeholder="Masukkan No Telp yang Valid"
                    startAdornment="+62"
                    type="text"
                    {...register("telephone")}
                    value={formData.telephone}
                  />
                  {errors.telephone && (
                    <p className="ml-4 text-red-500 mt-[-15px] mb-3">
                      {errors.telephone.message}
                    </p>
                  )}
                </>
                <div className="flex-col px-3 mb-4">
                  <>
                    <Label
                      htmlFor="subDistrict"
                      className="text-lg px-1 mb-[-10px]"
                    >
                      Kecamatan
                    </Label>
                    <Controller
                      name="subDistrict"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                            onInputChange("subDistrict", value);
                          }}
                          value={formData.subDistrict}
                        >
                          <SelectTrigger className="text-lg h-12">
                            <SelectValue placeholder="Select Kecamatan" />
                          </SelectTrigger>
                          <SelectContent className="text-lg">
                            <SelectItem value="kecamatan1" className="text-lg">
                              Ciputat
                            </SelectItem>
                            <SelectItem value="kecamatan2" className="text-lg">
                              Jombang
                            </SelectItem>
                            {/* Add more options as needed */}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subDistrict && (
                      <p className="text-red-500 mb-3">
                        {errors.subDistrict.message}
                      </p>
                    )}
                  </>
                </div>

                <div className="flex-col px-3 mb-4">
                  <>
                    <Label htmlFor="ward" className="text-lg px-1 mb-[-10px]">
                      Kelurahan
                    </Label>
                    <Controller
                      name="ward"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                            onInputChange("ward", value);
                          }}
                          value={formData.ward}
                        >
                          <SelectTrigger className="text-lg h-12">
                            <SelectValue placeholder="Select Kelurahan" />
                          </SelectTrigger>
                          <SelectContent className="text-lg">
                            <SelectItem value="kelurahan1" className="text-lg">
                              Ciputat
                            </SelectItem>
                            <SelectItem value="kelurahan2" className="text-lg">
                              Jombang
                            </SelectItem>
                            {/* Add more options as needed */}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.ward && (
                      <p className="text-red-500 mb-3">{errors.ward.message}</p>
                    )}
                  </>
                </div>
                <div className="flex-col px-3 mb-4">
                  <>
                    <Label htmlFor="cities" className="text-lg px-1 mb-[-10px]">
                      Kota
                    </Label>
                    <Controller
                      name="cities"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                            onInputChange("cities", value);
                          }}
                          value={formData.cities}
                        >
                          <SelectTrigger className="text-lg h-12">
                            <SelectValue placeholder="Select Kota" />
                          </SelectTrigger>
                          <SelectContent className="text-lg">
                            <SelectItem value="kota1" className="text-lg">
                              Ciputat
                            </SelectItem>
                            <SelectItem value="kota2" className="text-lg">
                              Jombang
                            </SelectItem>
                            {/* Add more options as needed */}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.cities && (
                      <p className="text-red-500 mb-3">
                        {errors.cities.message}
                      </p>
                    )}
                  </>
                </div>
                <div className="flex-col px-3 mb-4">
                  <>
                    <Label
                      htmlFor="provinci"
                      className="text-lg px-1 mb-[-10px]"
                    >
                      Provinsi
                    </Label>
                    <Controller
                      name="province"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                            onInputChange("province", value);
                          }}
                          value={formData.province}
                        >
                          <SelectTrigger className="text-lg h-12">
                            <SelectValue placeholder="Select Province" />
                          </SelectTrigger>
                          <SelectContent className="text-lg">
                            <SelectItem value="Province1" className="text-lg">
                              Ciputat
                            </SelectItem>
                            <SelectItem value="Province2" className="text-lg">
                              Jombang
                            </SelectItem>
                            {/* Add more options as needed */}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.province && (
                      <p className="text-red-500 mb-3">
                        {errors.province.message}
                      </p>
                    )}
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
                      value={formData.addressDetails}
                      onChange={(e) =>
                        onInputChange("addressDetails", e.target.value)
                      }
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
