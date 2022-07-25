import React, { useEffect, useRef, useState } from "react";
import { MapContainer as LeafletMap, Marker, TileLayer } from "react-leaflet";

import MapWrapper from "../map/MapWrapper";
import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentLocationMap, locationDetailList } from "../map/atoms";
import axiosService from "../map/utils/axiosService";
import { useClickAway, useDebounce } from "react-use";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { SelectedLocation } from "../map/SelectedLocation";

function LocationForm() {
  const [uploadLogo, setUploadLogo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const setLocationsListData = useSetRecoilState(locationDetailList);
  const [locationsValue, setLocationsValue] =
    useRecoilState(currentLocationMap);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationResponse, setLocationResponse] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const toast = useToast();
  const initialValues = {
    locationType: "",
  };
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [locationTitle, setLocationTitle] = useState("");

  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowLocationOptions(false);
  });

  const onSubmit = (values) => {
    if (!Object.keys(locationsValue).length) {
      toast({
        title: "🚫",
        description: "لطفاْ موقعیت خود را مشخص کنید",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setLocationsListData((prev) => [
      ...prev,
      {
        name: locationTitle,
        locationType: values.locationType,
        uploadLogo: logoUrl,
        locationList: locationsValue,
      },
    ]);
    toast({
      title: "🤗 ",
      description: "اطلاعات شما با موفقیت ثبت شد",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setLocationsValue({});
    setUploadLogo("");
    setLogoUrl("");
  };
  const validationSchema = Yup.object({
    locationType: Yup.string().required("Required!"),
    // locationName: Yup.string().required("Required"),
  });

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    1000,
    [searchQuery]
  );
  async function handleSearch() {
    const response = await axiosService.get(
      `locations?&input=${debouncedSearchQuery}&location=35.77720679936965%2C51.43170482834989&platform=pwa`
    );
    setShowLocationOptions(true);
    setLocationResponse(response.data.object);
  }
  console.log(locationResponse);
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  function handleInputLogoChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    setUploadLogo(e.target.value);
    reader.onloadend = () => {
      const resultStr = reader.result;
      const base64String = resultStr.replace("data:", "").replace(/^.+,/, "");
      setLogoUrl(base64String);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log(formik.values);
        return (
          <Form onSubmit={formik.handleSubmit}>
            <VStack
              spacing={4}
              align="stretch"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              p="48px 0"
            >
              <VStack
                spacing={4}
                align="stretch"
                height="90%"
                border="1px solid #65a0d2"
                backgroundColor="rgb(255, 255, 255)"
                borderRadius="8px"
              >
                <Box
                  height="38px"
                  bottom="0"
                  bg="#65a0d2"
                  borderRadius="6px 6px 0 0"
                  borderStyle="solid"
                >
                  <Text
                    fontSize="16px"
                    fontWeight="bold"
                    color="#fff"
                    p="5px 0 0 12px"
                  >
                    Share location
                  </Text>
                </Box>

                <Box p="10px">
                  <Box>
                    <Flex justify="center" align="center" w="full">
                      <FormControl>
                        <FormLabel fontSize="14px"> Location name: </FormLabel>
                        <Input
                          textAlign="right"
                          fontFamily={"Courier"}
                          onChange={(e) => {
                            formik.handleChange(e);
                            setSearchQuery(e.target.value);
                          }}
                          value={formik.values.locationName}
                          name="locationName"
                        />
                        {showLocationOptions ? (
                          <Box
                            ref={ref}
                            fontFamily={"Courier"}
                            bg="#e8f0fe"
                            position="absolute"
                            mt="5px"
                            width="100%"
                            height="200px"
                            zIndex="10000"
                            overflowY="auto"
                          >
                            {locationResponse.map((item, i) => (
                              <Box
                                borderBottom="1px solid #b4b4b4"
                                cursor={"pointer"}
                                padding="5px"
                                textAlign={"right"}
                                key={`option-${i}`}
                                onClick={() => {
                                  setLocationTitle(item.title);
                                  setShowLocationOptions(false);
                                  setLocationsValue({
                                    latlng: {
                                      lat: item.lat,
                                      lng: item.lng,
                                    },
                                  });
                                }}
                              >
                                {item.title}
                              </Box>
                            ))}
                          </Box>
                        ) : null}
                        {/* <AutoComplete
                          openOnFocus
                          onChange={(_, item) => {
                            setName(item.value);
                            setLocationsValue({
                              latlng: {
                                lat: item.originalValue.lat,
                                lng: item.originalValue.lng,
                              },
                            });
                          }}
                        >
                          <AutoCompleteInput
                            variant="filled"
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                            }}
                          />
                          <AutoCompleteList>
                            {locationResponse.map((item, i) => (
                              <AutoCompleteItem
                                key={`option-${i}`}
                                value={item}
                              >
                                {item.tilte}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete> */}
                      </FormControl>
                    </Flex>
                  </Box>

                  <Box>
                    <FormControl mt="20px">
                      <FormLabel fontSize="14px">Location on map:</FormLabel>
                      <Box type="text">
                        <LeafletMap
                          style={{ width: "100%", height: "200px" }}
                          center={[35.689198, 51.388973]}
                          zoom={10}
                        >
                          {locationsValue.latlng && (
                            <Marker position={locationsValue.latlng}></Marker>
                          )}
                          <SelectedLocation />
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        </LeafletMap>
                      </Box>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl mt="20px">
                      <FormLabel fontSize="14px">Location type:</FormLabel>
                      <Select
                        placeholder="select"
                        onChange={formik.handleChange}
                        value={formik.values.locationType}
                        name="locationType"
                      >
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                      </Select>
                    </FormControl>
                  </Box>

                  {formik.errors.locationType && formik.touched.locationType ? (
                    <Alert my="2" status="error">
                      {formik.errors.locationType}
                    </Alert>
                  ) : null}

                  <Box>
                    <FormControl>
                      <FormLabel mt="20px" fontSize="14px">
                        Logo:
                      </FormLabel>
                      <Input
                        type="file"
                        value={uploadLogo}
                        onChange={handleInputLogoChange}
                        name="logoUrl"
                      />

                      {logoUrl && (
                        <Flex justifyContent="center">
                          <Image
                            width="200px"
                            p=" 5px 0"
                            src={"data:image/png;base64," + logoUrl}
                            alt=""
                          ></Image>
                        </Flex>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </VStack>

              <Box>
                <Box width="100%" justifyContent="space-between" p="8px 0 0 0">
                  <Button
                    justifyContent="center"
                    backgroundColor=" #999999"
                    border=" 1px solid #999999"
                    color=" #fff"
                    width="70px"
                    height="34px"
                    borderRadius="5px"
                    cursor="pointer"
                    alignItems="center"
                    fontSize="14px"
                    fontWeight="bold"
                    margin=" 0 10px 0 0"
                    onClick={() => {
                      setUploadLogo("");
                      setLogoUrl("");
                      formik.resetForm({
                        values: {
                          locationName: "",
                          locationType: "",
                        },
                      });
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    justifyContent="center"
                    backgroundColor=" #5dbfde"
                    border=" 1px solid #5dbfde"
                    color=" #fff"
                    width="70px"
                    height="34px"
                    borderRadius="5px"
                    cursor="pointer"
                    alignItems="center"
                    fontSize="14px"
                    fontWeight="bold"
                    margin=" 0 2px 0 0"
                    disabled={Object.keys(formik.errors).length}
                  >
                    Save
                  </Button>
                </Box>
              </Box>

              <Box>
                <Box width="100vw" height="500px">
                  <Box>
                    <MapWrapper />
                  </Box>
                </Box>
              </Box>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LocationForm;
