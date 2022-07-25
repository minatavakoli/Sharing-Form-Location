import { Icon } from "leaflet";
import React, { useEffect } from "react";
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useRecoilValue } from "recoil";
import { locationDetailList } from "./atoms";

export const MapComponent = () => {
  return (
    <LeafletMap
      style={{ width: "100%", height: 500 }}
      center={[35.689198, 51.388973]}
      zoom={10}
    >
      <MarkerMap />
    </LeafletMap>
  );
};

export function MarkerMap() {
  const locationListDetail = useRecoilValue(locationDetailList);

  const map = useMap();

  useEffect(() => {
    if (locationListDetail.length) {
      const lastlocation = locationListDetail.at(-1);
      if (map) {
        map.flyTo([
          lastlocation.locationList.latlng.lat,
          lastlocation.locationList.latlng.lng,
        ]);
      }
    }
  }, [locationListDetail, map]);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {locationListDetail.map((item, i) => {
        const icon = new Icon({
          iconUrl: item.uploadLogo
            ? "data:image/png;base64," + item.uploadLogo
            : "/markerIcon.png",
          iconSize: item.uploadLogo ? [50, 50] : undefined,
        });

        return (
          <Marker key={i} position={item?.locationList?.latlng} icon={icon}>
            <Popup>
              name: {item?.name}
              <br />
              lat: {item?.locationList?.latlng?.lat}
              <br />
              lng: {item?.locationList?.latlng?.lng}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
