import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SelectInput } from "../input/select-input";
import { useEffect, useRef, useState } from "react";
import { MapLeafleet } from "../map/leafleet";
import { getAddressFromLatLng } from "@/hooks/use-geocoding";
import L from "leaflet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import regionJson from "@/data/dataDaerah.json";
const region = regionJson as any[];
import { useLocation } from "@/hooks/use-location";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

export type Props = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddLocationDialog({ isOpen, onOpen }: Props) {
  // const [isPinpointOpen, setIsPinpointOpen] = useState(false);
  const [Position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const markerRef = useRef<L.Marker<any>>(null);
  const updatePosition = async (latlng: L.LatLng) => {
    setPosition(latlng);
    const address = await getAddressFromLatLng(latlng.lat, latlng.lng);
    setAddress(address);
  };

  useEffect(() => {
    const handleSuccess = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      const latLng = new L.LatLng(latitude, longitude);
      await updatePosition(latLng);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const coordinate = {
    lat: -6.3818,
    lng: 106.7496,
  };

  const postOptions = [
    { value: "jakarta", name: "154123" },
    { value: "depok", name: "19087" },
    { value: "bekasi", name: "12645" },
  ];

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedRegency("");
    setSelectedDistrict("");
  };

  const handleRegencyChange = (value: string) => {
    setSelectedRegency(value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const province = region.find((p) => p.id === selectedProvince);
  const regencies = province?.regencies || [];
  const districts = selectedRegency
    ? regencies.find((r) => r.id === selectedRegency)?.districts || []
    : [];

  const { register, handleSubmit, onSubmit, control, setValue } = useLocation();

  const handlePositionChange = (latlng: L.LatLng) => {
    setValue("latitude", latlng?.lat?.toString());
    setValue("longitude", latlng?.lng?.toString());
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Lokasi</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              label="Nama Lokasi"
              placeholder="Cth. Toko Amanda"
              {...register("name")}
            />

            <Input label="Address Phone" placeholder="" {...register("name")} />

            <Controller
              name="province"
              control={control}
              defaultValue={selectedProvince}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleProvinceChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Provinsi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Provinces</SelectLabel>
                      {region.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {selectedProvince && (
              <Controller
                name="city"
                control={control}
                defaultValue={selectedRegency}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRegencyChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a regency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Regencies</SelectLabel>
                        {regencies.map((regency) => (
                          <SelectItem key={regency.id} value={regency.id}>
                            {regency.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {selectedRegency && (
              <Controller
                name="district"
                control={control}
                defaultValue={selectedDistrict}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDistrictChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Districts</SelectLabel>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  label="Kode Pos"
                  placeHolder="Masukkan 5 digit kode pos"
                  options={postOptions}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />

            <div>
              <Label>Alamat Lengkap</Label>
              <Textarea
                placeholder="Tuliskan alamat lengkap toko"
                className="resize-none"
                {...register("address")}
              />
            </div>
            <div>
              <Label>Pinpoint Lokasi</Label>
              <p className="text-sm text-gray-400">
                Tandain lokasi untuk mempermudah permintaan pickup kurir
              </p>
              <MapLeafleet
                coordinate={coordinate}
                markerRef={markerRef}
                onUpdateAddress={setAddress}
                onUpdatePosition={handlePositionChange}
                position={Position}
                address={address}
              />
            </div>
            <DialogFooter>
              <Button variant={"outline"} className=" rounded-full ">
                Batal
              </Button>
              <Button
                variant="lakoePrimary"
                className="rounded-full"
                type="submit"
              >
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

{
  /* <Popover open={open2} onOpenChange={setIsOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-full justify-between"
              >
                {value
                  ? provinces.find((province) => province.name === value)?.name
                  : "Cari Provinsi..."}
                <TiArrowSortedDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari Provinsi..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {provinces.map((province: any) => (
                    <CommandItem
                      key={province.name}
                      value={province.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setIsOpen2(false);
                      }}
                    >
                      {province.name}
                      <FaCheck
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === province.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={open3} onOpenChange={setIsOpen3}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open3}
                className="w-full justify-between"
              >
                {value
                  ? regencies.find((city) => city.name === value)?.name
                  : "Cari Kota..."}
                <TiArrowSortedDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari Provinsi..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {regencies.map((city: any) => (
                    <CommandItem
                      key={city.name}
                      value={city.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setIsOpen3(false);
                      }}
                    >
                      {city.name}
                      <FaCheck
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === city.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover> */
}
// const cities = [
//   { value: "jakarta", name: "Jakarta" },
//   { value: "depok", name: "Depok" },
//   { value: "bekasi", name: "Bekasi" },
// ];

// const [open2, setIsOpen2] = useState(false);
// const [open3, setIsOpen3] = useState(false);
// const [value, setValue] = useState("");
