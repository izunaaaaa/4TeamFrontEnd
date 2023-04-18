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
import { postUploadUrl } from "api/axios/axiosSetting";
import { useMutation } from "react-query";

const CropUploadImg = (props: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropAttribute>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const { mutate: postUploadUrlHandler, data } = useMutation((img: any) =>
    postUploadUrl(img)
  );

  /**이미지 */
  const previewImg = useRef("");

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

    canvas?.toBlob((blob: any) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const file = new File([previewUrl], "image.jpeg", { type: "image/jpeg" });

      previewImg.current = previewUrl;
      props.getCroppedImg(previewImg.current);
      postUploadUrlHandler(file);
    }, "image/jpeg");

    const jpegFile = canvas?.toDataURL("image/jpeg");

    //   const myFile = new File([myBlob], 'image.jpeg', {
    //     type: myBlob.type,
    // });

    // console.log(data, previewImg.current);
    // props.onClose();
  };

  return (
    <>
      <div className={styles.cropImg}>
        <Cropper
          image={props.previewImg}
          aspect={6 / 7}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "83%",
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
            aria-label="Zoom"
            min={1}
            max={3}
            step={0.1}
            onChange={(e: any) => {
              setZoom(e);
            }}
            defaultValue={0}
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
