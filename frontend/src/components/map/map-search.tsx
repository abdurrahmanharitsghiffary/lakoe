// import { useEffect } from "react";
// import L from "leaflet";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import { useMap } from "react-leaflet";

// export const SearchField = ({
//   setPosition,
// }: {
//   setPosition: (position: L.LatLng) => void;
// }) => {
//   const map = useMap();

//   useEffect(() => {
//     const provider = new OpenStreetMapProvider();
//     const searchControl = GeoSearchControl({
//       provider,
//       style: "bar",
//       showMarker: false,
//       showPopup: false,
//       marker: {
//         icon: new L.Icon.Default(),
//         draggable: true,
//       },
//       maxMarkers: 1,
//       retainZoomLevel: true,
//     });

//     map.addControl(searchControl);

//     map.on("geosearch/showlocation", (result: any) => {
//       const latlng = new L.LatLng(result.location.y, result.location.x);
//       setPosition(latlng);
//       map.flyTo(latlng, map.getZoom());
//     });

//     return () => {
//       map.removeControl(searchControl);
//     };
//   }, [map, setPosition]);

//   return null;
// };
