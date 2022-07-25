import { atom } from "recoil";

export const currentLocationMap = atom({
  key: "currentLocationMap",
  default: {},
});

export const locationDetailList = atom({
  key: "locationDetailList",
  default: [],
});