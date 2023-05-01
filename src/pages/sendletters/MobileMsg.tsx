import React from "react";
import MsgRoom from "./MsgRoom";
import { Box } from "@chakra-ui/react";

const MobileMsg = () => {
  const isMobile =
    window.innerWidth < 480 ? "0" : window.innerWidth < 769 ? "15rem" : "23rem";

  return (
    <Box ml={isMobile}>
      <MsgRoom />
    </Box>
  );
};

export default MobileMsg;
