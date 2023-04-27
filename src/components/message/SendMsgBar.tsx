import React from "react";
import { useSendMsg } from "./hook/useSendMsg";
import {
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const SendMsgBar = ({ receiver }: any) => {
  const { register, handleSubmit, onSubmit, reset } = useSendMsg(onSuccess);

  function onSuccess() {
    reset();
  }

  return (
    <Box
      bottom="0"
      right="20"
      position={"fixed"}
      bgColor="white"
      borderTop="1px solid #E2E8F0"
      px={3}
      py={2}
      zIndex="1"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="lg" w={"40vw"} mx="auto">
          <Input type="hidden" {...register("receiver")} value={receiver} />
          <Input
            type="text"
            placeholder="보내실 내용을 입력해주세요"
            {...register("text")}
          />
          <InputRightElement width="4.5rem">
            <Button type="submit">Send</Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default SendMsgBar;
