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
import { croppedImg } from "./hook/GetCroppedImg";

const CropUploadImg = (props: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      //   console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  console.log(props.previewImg);

  return (
    <>
      <div className={styles.cropImg}>
        <DialogContent
          sx={{
            backgroundColor: "#333",
            height: "200px",
          }}
        >
          <Cropper
            image={props.previewImg}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropAreaChange={(croppedArea: any) => {
              setCroppedArea(croppedArea);
            }}
          />
        </DialogContent>
      </div>
      <DialogActions>
        <div className={styles.sliderDiv}>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e: any) => {
              setZoom(e.target.value);
            }}
          />
        </div>
      </DialogActions>
      <button
        onClick={() => {
          croppedImg(props.previewImg, croppedArea);
        }}
      >
        확인
      </button>
    </>
  );
};

export default CropUploadImg;
