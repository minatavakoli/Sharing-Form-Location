import LocationForm from "./components/SharingLocationForm/LocationForm";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import VideoForm from "./components/VideoRecordingForm/VideoForm";

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        {/* <LocationForm /> */}
        <VideoForm closeOnOverlay={true} visibleOverlay={true} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
