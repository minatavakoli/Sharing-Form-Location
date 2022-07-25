import React from "react";
import { MapComponent } from "./Map";
import styles from "./styles/app.module.css";

const MapWrapper = ({ dataWeather }) => {
  return (
    <div className={styles.wrapperGlobal}>
      <div className={styles.wrapperMap}>
        <MapComponent />
      </div>
    </div>
  );
};

export default MapWrapper;
