import React, { useState } from "react";
import MsgComment from "../../components/message/MsgComment";
import { MockCont } from "../../MsgMock";
import { mockMsgCont } from "../../MsgMock";
import { Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MsgModal from "../../components/message/MsgModal";

export default function MsgRoom() {
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const handleOpenMsg = () => {
    setIsOpenMsg(true);
    console.log("!!!!");
  };

  const hanleCloseMsg = () => {
    setIsOpenMsg(false);
    console.log("????");
  };

  return (
    <>
      {mockMsgCont?.map((msg: MockCont, idx) => {
        return (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MsgComment {...msg} />
          </Box>
        );
      })}
      <Button onClick={handleOpenMsg}>
        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        <MsgModal />
      </Button>
    </>
  );
}
