import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import { SearchField } from "../map/map-search";
// import { FlyToButton } from "../map/map-fly-to-location";
import { useState, useRef, useEffect } from "react";
import { getAddressFromLatLng } from "@/hooks/use-geocoding";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PiExclamationMarkDuotone } from "react-icons/pi";
import { MdLocationOff } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
// import { ClickMap } from "../map/map-click";

export function PinpointCheckout() {
  const [isPinpointOpen, setIsPinpointOpen] = useState(false);
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

  // const onMapClick = async (e: L.LeafletMouseEvent) => {
  //   const latlng = e.latlng;
  //   await updatePosition(latlng)
  // };

  const onDragEnd = async () => {
    const marker = markerRef.current;
    if (marker != null) {
      const latlng = marker.getLatLng();
      await updatePosition(latlng);
    }
  };

  const coordinate = {
    lat: -6.3818,
    lng: 106.7496,
  };

  return (
    <div className="flex-col px-3 mb-4">
      <Label className="text-lg px-1 mb-[-10px]">Pin Alamat</Label>
      <Card className="flex w-full h-auto bg-gray-100">
        <div className="flex flex-row px-2 py-4 justify-between w-full ">
          {!Position ? (
            <>
              <div className="flex flex-row items-center gap-1">
                <MdLocationOff color="gray" className="h-6 w-6 " />
                <p>Belum Pinpoint</p>
              </div>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsPinpointOpen(true)}
                className="border-blue-300"
              >
                <span className="text-blue-300 text-lg">Tandai Pinpoint</span>
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-2">
                <MdLocationOn color="blue" className="h-6 w-6" />
                <p>{address}</p>
              </div>
              <Button
                variant={"outline"}
                onClick={() => setIsPinpointOpen(true)}
                className="border-blue-300"
              >
                <span className="text-blue-300 text-lg">Tandai Pinpoint</span>
              </Button>
            </>
          )}
          <Dialog
            open={isPinpointOpen}
            onOpenChange={(open) => {
              setIsPinpointOpen(open);
            }}
          >
            <DialogContent className="flex-col sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex justify-center text-2xl w-full">
                  Ubah Pinpoint
                </DialogTitle>
                <div className="border-b-2 w-full"></div>
                <DialogDescription className="flex w-100 text-lg">
                  <Card className="flex flex-row w-full h-auto my-5 bg-indigo-300 py-3 gap-4 ">
                    <PiExclamationMarkDuotone />
                    <p className="text-sm">
                      Pastikan Pinpoint lokasi kamu sama dengan alamat yang kamu
                      tulis
                    </p>
                  </Card>
                </DialogDescription>
                <div className="mt-5">
                  <div>
                    <MapContainer
                      center={[coordinate.lat, coordinate.lng]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: "55vh", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {Position && (
                        <>
                          <Marker
                            position={Position}
                            draggable={true}
                            eventHandlers={{
                              dragend: onDragEnd,
                            }}
                            ref={markerRef}
                          >
                            <Popup>
                              <span>
                                Latitude: {Position.lat.toFixed(5)}, Longitude:{" "}
                                {Position.lng.toFixed(5)}
                              </span>
                            </Popup>
                          </Marker>
                          {/* <FlyToButton position={Position} /> */}
                        </>
                      )}
                      {/* <SearchField setPosition={updatePosition} /> */}
                      {/* <ClickMap onClick={onMapClick}/> */}
                    </MapContainer>
                    <div className="mt-6 py-4 flex flex-row gap-2">
                      <FaLocationDot
                        className="h-6 w-6"
                        color="blue
                    "
                      />

                      <span className="text-lg mt-[-4px]">{address}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <div className="flex flex-row w-full justify-center gap-4 py-3">
                  <Button variant={"outline"} className="py-6">
                    <p className="text-lg">Kembali</p>
                  </Button>
                  <Button
                    className="bg-lakoe-primary py-6"
                    onClick={() => {
                      setIsPinpointOpen(false);
                      setAddress(address);
                    }}
                  >
                    <p className="text-lg">Pilih Lokasi</p>
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
