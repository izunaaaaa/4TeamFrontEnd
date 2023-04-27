import { Button } from "@chakra-ui/react";
import SendMsg from "components/message/SendMsg";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSendMsg } from "components/message/hook/useSendMsg";
import { useState } from "react";

const SendBtn = (props: any) => {
  const userPk = props.userPk;
   const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const height = props.height;
  return (
    <Button
      paddingTop="3px"
      backgroundColor="transparent"
      h={height}
     onClick={onOpen}}
    >

      <IoPaperPlaneOutline />
      <SendMsg isOpen={isOpen} onClose={onClose} receiver={userPk} />
    </Button>
  );
};

export default SendBtn;
