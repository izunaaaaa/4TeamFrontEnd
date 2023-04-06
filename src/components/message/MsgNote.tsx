import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightgray",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MsgNote = () => {
  return (
    <div>
      <Stack direction="column" sx={{ width: 200 }} spacing={2}>
        <Item>안녕하세요</Item>
        <Item>안녕하세요</Item>
        <Item>안녕하세요</Item>
      </Stack>
    </div>
  );
};

export default MsgNote;
