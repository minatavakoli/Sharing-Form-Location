import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { currentLocationMap } from "./atoms";

export const SelectedLocation = (props) => {
  const [currentLocation, setLocationsValue] =
    useRecoilState(currentLocationMap);

  const map = useMap();
  console.log(currentLocation.latlng);
  useEffect(() => {
    if (Object.keys(currentLocation).length) {
      if (map) {
        map.flyTo([currentLocation.latlng.lat, currentLocation.latlng.lng]);
      }
    }
  }, [currentLocation, map]);
  useMapEvents({
    click(e) {
      setLocationsValue({ latlng: e.latlng });
    },
  });

  return null;
};
