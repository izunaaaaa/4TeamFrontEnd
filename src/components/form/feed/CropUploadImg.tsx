import React, { useCallback, useRef, useState } from "react";
import styles from "./CropUploadImg.module.scss";
import croppedImg from "./hook/GetCroppedImg";
import Cropper from "react-easy-crop";
import { CropAttribute } from "interface/Interface";
import {
  Button,
  ButtonGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCrop,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const CropUploadImg = (props: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropAttribute>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  console.log(zoom);

  /**이미지 */
  const previewImg = useRef<any>("");

  /**crop한 속성값 */
  const onCropComplete = useCallback(
    (croppedArea: CropAttribute, croppedAreaPixels: CropAttribute) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  /**이미지 크롭하기 */
  const generateDownload = async (imageSrc: string, crop: CropAttribute) => {
    if (!crop || !imageSrc) {
      return;
    }
    const canvas = await croppedImg(imageSrc, crop);

    const jpegFile = canvas?.toDataURL("image/jpeg");

    previewImg.current = jpegFile;
    props.getCroppedImg(previewImg.current);

    props.onClose();
  };

  return (
    <>
      <div className={styles.cropImg}>
        <Cropper
          image={props.previewImg}
          aspect={8 / 9}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "75%",
              backgroundColor: "black",
            },
          }}
        />
      </div>

      <div className={styles.sliderDiv}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          style={{ color: "skyblue" }}
        />
        <div className={styles.slider}>
          <Slider
            value={zoom}
            aria-label="Zoom"
            min={1}
            max={3}
            step={0.1}
            onChange={(e: any) => {
              setZoom(e);
              console.log(e);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </div>
      <ButtonGroup
        textAlign={"center"}
        alignItems="center"
        display="flex"
        justifyContent="center"
        paddingBottom={3}
      >
        <Button
          leftIcon={<FontAwesomeIcon icon={faBackward} />}
          colorScheme="red"
          onClick={() => window.location.reload()}
        >
          취소
        </Button>
        <Button
          colorScheme="twitter"
          leftIcon={<FontAwesomeIcon icon={faCrop} />}
          onClick={() => {
            generateDownload(props.previewImg, croppedArea);
          }}
        >
          <p>크롭</p>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CropUploadImg;
