import LocationForm from "./components/SharingLocationForm/LocationForm";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <LocationForm />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
