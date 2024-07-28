import { getAddressFromLatLng } from "@/hooks/use-geocoding";
import { RefObject } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { SearchField } from "./map-search";

export function LocationMarker({
  position,
  onUpdatePosition,
  onUpdateAddress,
  markerRef,
}: {
  position: L.LatLng | null;
  onUpdatePosition: (latlng: L.LatLng) => void;
  onUpdateAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  markerRef: RefObject<L.Marker<any>>;
}) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      onUpdatePosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const updatePosition = async (latlng: L.LatLng) => {
    onUpdatePosition(latlng);
    console.log(latlng, "LAT LNG");
    const address = await getAddressFromLatLng(latlng?.lat, latlng?.lng);

    onUpdateAddress(address);
  };

  const onDragEnd = async () => {
    const marker = markerRef?.current;
    if (marker != null) {
      const latlng = marker.getLatLng();
      await updatePosition(latlng);
    }
  };

  return position === null ? null : (
    <>
      <SearchField setPosition={updatePosition} />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: onDragEnd,
        }}
        ref={markerRef}
      >
        <Popup>
          <span>
            Latitude: {position?.lat}, Longitude: {position?.lng}
          </span>
        </Popup>
      </Marker>
    </>
  );
}
