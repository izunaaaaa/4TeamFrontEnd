import { useSendMsg } from "./hook/useSendMsg";
import {
  Input,
  Button,
  Grid,
  InputGroup,
  useMediaQuery,
} from "@chakra-ui/react";

const SendMsgBar = ({ refetch, receiver }: any) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  const { register, handleSubmit, onSubmit } = useSendMsg(refetch, receiver);


  return (
    <Grid
      w={"60vmin"}
      bg={"white"}
      position={"fixed"}
      bottom={3}
      ml={isMobile ? "6rem" : 0}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex" }}>
        <InputGroup size="md">
          <Input type="hidden" value={receiver} readOnly />
          <Input
            type="text"
            placeholder="보내실 내용을 입력해주세요"
            {...register("text")}
            mr={3}
          />
          <Button type="submit">Send</Button>
        </InputGroup>
      </form>
    </Grid>
  );
};

export default SendMsgBar;
