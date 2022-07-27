import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import VideoRecorder from "react-video-recorder/lib/video-recorder";
import example from "../../assets/video/example.mp4";
import { useOutsideAlerter } from "./hooks";
function VideoForm({ closeOnOverlay, visibleOverlay }) {
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isVideoSampleOpen, setIsVideoSampleOpen] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState("");
  const wrapperRef = useRef(null);
  const videoModalRef = useRef(null);

  useOutsideAlerter(wrapperRef, () => {
    if (closeOnOverlay) {
      setIsVideoSampleOpen(false);
    }
  });

  useOutsideAlerter(videoModalRef, () => {
    if (closeOnOverlay) {
      setIsRecorderOpen(false);
    }
  });

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsVideoSampleOpen(false);
        setIsRecorderOpen(false);
      }
    }

    document.addEventListener("keydown", function (event) {
      handleKeyDown(event);
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleRecordingComplete(videoBlob) {
    const urlCreator = window.URL || window.webkitURL;
    const videoUrl = urlCreator.createObjectURL(videoBlob);
    setRecordedVideo(videoUrl);
    setIsRecorderOpen(false);
    setIsVideoSampleOpen(false);
  }

  return (
    <VStack
      // spacing={4}
      align="stretch"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my="50px"
    >
      <VStack
        bg="#f00"
        w={["90%", "500px"]}
        height="500px"
        spacing={4}
        align="stretch"
        border="1px solid #65a0d2"
        backgroundColor="rgb(255, 255, 255)"
        borderRadius="8px"
      >
        <Box bottom="0" borderStyle="solid" my="20px">
          <Text
            mt="20px"
            fontFamily="IRANSans"
            textAlign="center"
            fontSize={["12px", "16px"]}
            fontWeight="bold"
          >
            مانند ویدیو نمونه از سفیر یک ویدیو بگیر
            <br />
            توی ویدیو سفیر باید کارت ملیشو دستش بگیره و جمله زیر رو بخونه
          </Text>
        </Box>

        <Box p="10px">
          <Box
            border="1px solid #c3c3c3"
            justifyContent="center"
            display="flex"
            w={["80%", "85%"]}
            height="60px"
            margin="auto"
            borderRadius="10px"
          >
            <Text
              mt="16px"
              justifyContent="center"
              textAlign="center"
              fontSize={["12px", "16px"]}
              fontFamily="IRANSans"
            >
              اینجانب بهزاد کیماسی، تمامی قوانین الوپیک را قبول دارم
            </Text>
          </Box>
          <Box my="60px" display="flex" justifyContent="space-around">
            <Button
              w={["110px", "140px"]}
              height="100px"
              border="1px solid #a7cffc"
              color="#000000"
              colorScheme="whiteAlpha"
              fontSize="16px"
              fontFamily="IRANSans"
              onClick={() => setIsVideoSampleOpen(true)}
            >
              ویدیو نمونه
            </Button>

            <Button
              w={["110px", "140px"]}
              height="100px"
              border="1px solid #a7cffc"
              color="#000000"
              colorScheme="whiteAlpha"
              fontSize="16px"
              fontFamily="IRANSans"
              onClick={() => setIsRecorderOpen(true)}
            >
              گرفتن ویدیو
            </Button>
          </Box>

          <Button
            fontFamily="IRANSans"
            margin="auto"
            display="flex"
            type="submit"
            colorScheme="blue"
            color=" #fff"
            height="40px"
            width="40%"
            borderRadius="5px"
            cursor="pointer"
            alignItems="center"
            fontSize="14px"
            fontWeight="bold"
          >
            ثبت و ادامه
          </Button>
        </Box>
        {isRecorderOpen ? (
          <Box
            position="fixed"
            zIndex="0"
            w={["90%", "600px"]}
            height={["500px", "500px"]}
            top={["50%", "50%"]}
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
            boxShadow={
              visibleOverlay ? "0px 0px 0px 1000px rgba(0,0,0,0.5)" : null
            }
            ref={videoModalRef}
          >
            <VideoRecorder onRecordingComplete={handleRecordingComplete} />

            <Button
              onClick={() => setIsRecorderOpen(false)}
              justifyContent="center"
              display="flex"
              alignItems="center"
              margin="auto"
              colorScheme="red"
            >
              Cancel
            </Button>
          </Box>
        ) : null}

        {isVideoSampleOpen ? (
          <Box
            position="fixed"
            zIndex="0"
            w={["90%", "90%"]}
            top={["50%", "50%"]}
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            boxShadow={
              visibleOverlay ? "0px 0px 0px 1000px rgba(0,0,0,0.5)" : null
            }
            ref={wrapperRef}
          >
            <Box>
              <video controls src={example}></video>
              {!closeOnOverlay && (
                <Button
                  justifyContent="center"
                  display="flex"
                  alignItems="center"
                  w="100%"
                  colorScheme="red"
                  onClick={() => setIsVideoSampleOpen(false)}
                  borderRadius="0px"
                >
                  Close
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </VStack>
      {recordedVideo && (
        <Box position="relative" zIndex="-1">
          <video
            style={{ marginTop: "20px" }}
            width="320"
            height="240"
            controls
            src={recordedVideo}
          ></video>
        </Box>
      )}
    </VStack>
  );
}

export default VideoForm;
