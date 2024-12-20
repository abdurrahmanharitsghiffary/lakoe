import { FaLocationDot } from "react-icons/fa6";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./location-marker";
import { RefObject } from "react";

type MapLeafleetProps = {
  coordinate: {
    lat: number;
    lng: number;
  };
  address?: string;
  position: L.LatLng | null;
  onUpdatePosition: (latlng: L.LatLng) => void;
  onUpdateAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  markerRef: RefObject<L.Marker<any>>;
};

export function MapLeafleet({
  coordinate,
  markerRef,
  onUpdateAddress,
  onUpdatePosition,
  position,
  address,
}: MapLeafleetProps) {
  return (
    <div className="mt-5">
      <div>
        <MapContainer
          center={[coordinate?.lat, coordinate?.lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "55vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            onUpdatePosition={onUpdatePosition}
            onUpdateAddress={onUpdateAddress}
            markerRef={markerRef}
          />
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
  );
}
