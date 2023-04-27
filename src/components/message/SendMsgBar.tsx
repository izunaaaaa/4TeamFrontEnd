import React from "react";
import { useSendMsg } from "./hook/useSendMsg";
import {
  Input,
  Button,
  Box,
  Grid,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";

const SendMsgBar = ({ receiver }: any) => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  const { register, handleSubmit, onSubmit, reset } = useSendMsg(onSuccess);

  function onSuccess() {
    reset();
  }

  return (
    <Grid
      position={"fixed"}
      bottom={0}
      as={"div"}
      templateColumns={"6fr 1fr"}
      alignItems="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="lg" w={isMobile ? "43vw" : "90vw"} mx="auto">
          <Input type="hidden" {...register("receiver")} value={receiver} />
          <Input
            type="text"
            placeholder="보내실 내용을 입력해주세요"
            {...register("text")}
          />
          <InputRightElement width="4.5rem" mr={3}>
            <Button type="submit">Send</Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Grid>
  );
};

export default SendMsgBar;
