import React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import { Input, FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CreateIcon from "@mui/icons-material/Create";
export default function AddPost() {
  return (
    <div>
      <TextField
        id="standard-basic"
        label="제목"
        variant="standard"
        style={{ marginBottom: "10px" }}
      />
      <IconButton aria-label="upload picture" component="label" size="large">
        <input hidden accept="image/*" type="file" />
        <AddPhotoAlternateIcon />
      </IconButton>
      <IconButton>
        <CreateIcon />
      </IconButton>
      <ToggleButtonGroup
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <ToggleButtonGroup size="large" value="" aria-label="text alignment">
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButtonGroup size="large" aria-label="text formatting">
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </ToggleButtonGroup>

      <FormControl sx={{ m: 1, width: "50vw" }} variant="outlined">
        <Input type="text" multiline rows={15} />
      </FormControl>
    </div>
  );
}
