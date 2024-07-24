import { InputForm } from "@/features/products/components/input/input-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SelectInput } from "../input/select-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { MapLeafleet } from "../map/leafleet";
import { getAddressFromLatLng } from "@/hooks/use-geocoding";
import L from "leaflet";

export type Props = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddLocationDialog({ isOpen, onOpen }: Props) {
  // const [isPinpointOpen, setIsPinpointOpen] = useState(false);
  const [Position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const markerRef = useRef<L.Marker<any>>(null);
  console.log(Position, "POSITION");
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

  // const onMapClick = async (e: L.LeafletMouseEvent) => {
  //   const latlng = e.latlng;
  //   await updatePosition(latlng)
  // };

  const coordinate = {
    lat: -6.3818,
    lng: 106.7496,
  };

  const postOptions = [
    { value: "jakarta", name: "154123" },
    { value: "depok", name: "19087" },
    { value: "bekasi", name: "12645" },
  ];

  const cities = [
    { value: "jakarta", name: "Jakarta" },
    { value: "depok", name: "Depok" },
    { value: "bekasi", name: "Bekasi" },
  ];

  const [open2, setIsOpen2] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Lokasi</DialogTitle>
          </DialogHeader>

          <InputForm
            label="Nama Lokasi"
            placeholder="Cth. Toko Amanda"
            focus={"lakoePrimary"}
            isRequired
          />

          <Popover open={open2} onOpenChange={setIsOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-full justify-between"
              >
                {value
                  ? cities.find((city) => city.value === value)?.name
                  : "Cari Kota/Kecamatan..."}
                <TiArrowSortedDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setIsOpen2(false);
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
          </Popover>

          <SelectInput
            label="Kode Pos"
            placeHolder="Masukkan 5 digit kode pos"
            options={postOptions}
          />

          <div>
            <Label>Alamat Lengkap</Label>
            <Textarea
              placeholder="Tuliskan alamat lengkap toko"
              className="resize-none"
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
              onUpdatePosition={setPosition}
              position={Position}
              address={address}
            />
          </div>
          <DialogFooter>
            <Button variant={"outline"} className=" rounded-full ">
              Batal
            </Button>
            <Button variant="lakoePrimary" className="rounded-full">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
