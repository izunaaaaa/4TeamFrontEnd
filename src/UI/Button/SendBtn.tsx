import { Button } from "@chakra-ui/react";
import SendMsg from "components/message/SendMsg";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useState } from "react";

interface SendBtnProps {
  userPk: number;
  height?: string;
}

function SendBtn({ userPk, height }: SendBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Button
      paddingTop="3px"
      backgroundColor="transparent"
      h={height}
      onClick={onOpen}
    >
      <IoPaperPlaneOutline />
      <SendMsg isOpen={isOpen} onClose={onClose} receiver={userPk} />
    </Button>
  );
}

export default SendBtn;
