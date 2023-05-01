import React from "react";
import MsgRoom from "./MsgRoom";
import { Box } from "@chakra-ui/react";

const MobileMsg = () => {
  const isMobile = window.innerWidth < 768; // 현재 브라우저 창의 너비가 480px 이하인지 확인하는 변수
  const ml = isMobile ? 0 : "20rem";

  return (
    <Box ml={ml}>
      <MsgRoom />
    </Box>
  );
};

export default MobileMsg;
