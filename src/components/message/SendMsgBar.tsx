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
      ml={10}
      w={"70vmin"}
      bg={"white"}
      position={"fixed"}
      bottom={0}
      right={0}
      textAlign={"end"}
      templateColumns="1fr 2fr auto"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          {...register("receiver")}
          value={receiver}
          gridColumn={1}
        />
        <Input
          type="text"
          placeholder="보내실 내용을 입력해주세요"
          {...register("text")}
          gridColumn={2}
        />
        <Button type="submit" gridColumn={3}>
          Send
        </Button>
      </form>
    </Grid>
    // <Grid
    //   ml={10}
    //   w={"70vmin"}
    //   bg={"white"}
    //   position={"fixed"}
    //   bottom={0}
    //   right={130}
    //   textAlign={"end"}
    // >
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     {/* <InputGroup size="md"> */}
    //     <Input type="hidden" {...register("receiver")} value={receiver} />
    //     <Input
    //       type="text"
    //       placeholder="보내실 내용을 입력해주세요"
    //       {...register("text")}
    //     />
    //     <Button type="submit">Send</Button>
    //     {/* <InputRightElement width="4.5rem" mr={3}>
    //         <Button type="submit">Send</Button>
    //       </InputRightElement>
    //     </InputGroup> */}
    //   </form>
    // </Grid>
  );
};

export default SendMsgBar;
