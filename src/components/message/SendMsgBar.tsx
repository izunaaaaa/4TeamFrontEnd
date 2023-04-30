import React from "react";
import { useSendMsg } from "./hook/useSendMsg";
import {
  Input,
  Button,
  Box,
  Grid,
  Flex,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";

const SendMsgBar = ({ receiver }: any) => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  const { register, handleSubmit, onSubmit, reset } = useSendMsg(
    onSuccess,
    receiver
  );

  function onSuccess() {
    reset();
  }

  return (
    <Grid
      ml={10}
      w={"70vmin"}
      bg={"white"}
      position={"fixed"}
      bottom={0}
      right={130}
      textAlign={"end"}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex" }}>
        <InputGroup size="md">
          <Input type="number" value={receiver} readOnly />
          <Input
            type="text"
            placeholder="보내실 내용을 입력해주세요"
            {...register("text")}
            mr={3}
          />
          <Button type="submit">Send</Button>
          {/* <InputRightElement width="4.5rem" mr={3}>
            <Button type="submit">Send</Button>
          </InputRightElement> */}
        </InputGroup>
      </form>
    </Grid>
  );
};

export default SendMsgBar;
