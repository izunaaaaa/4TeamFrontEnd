import { Button } from "@chakra-ui/react";
import { IoPaperPlaneOutline } from "react-icons/io5";

const SendBtn = (props: any) => {
  const userPk = props.userPk;
  return (
    <Button
      paddingTop="3px"
      backgroundColor="transparent"
      onClick={() => console.log(userPk)}
    >
      <IoPaperPlaneOutline />
    </Button>
  );
};

export default SendBtn;
