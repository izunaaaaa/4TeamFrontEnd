import React from "react";
import { Stack, Text, Box, Avatar } from "@chakra-ui/react";
import { MockCont } from "../../MsgMock";
import { Card, Checkbox } from "@chakra-ui/react";

export default function MsgDetail(props: MockCont) {
  return (
    <>
      {" "}
      <Stack>
        {" "}
        <Text mt={"3rem"}>{props.time}</Text>
      </Stack>
      <Card
        sx={{
          width: "22rem",
          my: 4,
          p: 5,
          pb: 10,
          // border: "1px solid red",
          borderRadius: "5%",
        }}
      >
        {" "}
        <Stack spacing={2} direction="row">
          <Checkbox size="sm" colorScheme="blue" mr={3} />

          <Avatar mr={0}>{props.user.avatar}</Avatar>
          <Text>{props.content}</Text>
        </Stack>
      </Card>
    </>
  );
}
