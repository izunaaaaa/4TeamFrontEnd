import React from "react";
import MsgRoom from "./MsgRoom";
import { Box } from "@chakra-ui/react";

const MobileMsg = () => {
  const isMobile = window.innerWidth <= 480; // 현재 브라우저 창의 너비가 480px 이하인지 확인하는 변수
  const mt = isMobile ? "8rem" : "0"; // isMobile 값에 따라 mt 값 결정

  return (
    <Box mt={mt}>
      <MsgRoom />
    </Box>
  );
};

export default MobileMsg;
