import React from "react";
import { Stack, Text, Box, Avatar } from "@chakra-ui/react";
import { styled } from "@mui/material/styles";
import { MockCont } from "../../MsgMock";

export default function MsgComment(props: MockCont) {
  return (
    <>
      {" "}
      <Stack>
        {" "}
        <Text>{props.time}</Text>
      </Stack>
      <Box
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
          <Text>{props.content}</Text>
        </Stack>
      </Box>
    </>
  );
}
