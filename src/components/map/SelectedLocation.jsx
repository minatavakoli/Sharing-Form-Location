import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { currentLocationMap } from "./atoms";

export const SelectedLocation = (props) => {
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationMap);

  const map = useMap();

  useEffect(() => {
    if (Object.keys(currentLocation).length) {
      if (map) {
        map.flyTo([currentLocation.latlng.lat, currentLocation.latlng.lng]);
      }
    }
  }, [currentLocation, map]);

  useMapEvents({
    click(e) {
      setCurrentLocation({ latlng: e.latlng });
    },
  });

  return null;
};
