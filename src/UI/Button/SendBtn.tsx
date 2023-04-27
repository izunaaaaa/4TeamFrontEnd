import { Button } from "@chakra-ui/react";
import { IoPaperPlaneOutline } from "react-icons/io5";

const SendBtn = (props: any) => {
  const userPk = props.userPk;
  const height = props.height;
  return (
    <Button
      paddingTop="3px"
      backgroundColor="transparent"
      h={height}
      onClick={() => console.log(userPk)}
    >
      <IoPaperPlaneOutline />
    </Button>
  );
};

export default SendBtn;
