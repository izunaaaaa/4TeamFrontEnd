import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Box, DialogActions, DialogContent } from "@mui/material";

import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import styles from "./CropUploadImg.module.scss";

const CropUploadImg = (props: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAreaPixel, setCropAreaPixel] = useState(null);
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  return (
    <>
      <DialogContent
        sx={{
          backgroundColor: "#333",
          height: 400,
          width: "auto",
        }}
      >
        <Cropper
          //   image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          image={props.previewImg}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </DialogContent>
      <DialogActions>
        <div className={styles.sliderDiv}>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={0}
            onChange={(val) => {
              setZoom(val);

              console.log(val);
            }}
            max={5}
            min={1}
            step={0.3}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </DialogActions>
    </>
  );
};

export default CropUploadImg;
