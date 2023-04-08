import React from "react";
import { Stack, Paper, Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MockCont } from "../../MsgMock";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MsgComment(props: MockCont) {
  return (
    <>
      {" "}
      <Stack>
        {" "}
        <Typography>{props.time}</Typography>
      </Stack>
      <Item
        sx={{
          width: "15rem",
          textAlign: "end",
          my: 1,
          p: 2,
        }}
      >
        {" "}
        <Stack spacing={2} direction="row">
          <Avatar>{props.user.avatar}</Avatar>
          <Typography>{props.content}</Typography>
        </Stack>
      </Item>
    </>
  );
}
