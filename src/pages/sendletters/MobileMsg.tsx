import React from "react";
import MsgRoom from "./MsgRoom";
import { Box } from "@chakra-ui/react";

const isTablet = 767 < window.innerWidth;

const MobileMsg = () => {
  return (
    <Box ml={isTablet ? "20rem" : 0}>
      <MsgRoom />
    </Box>
  );
};

export default MobileMsg;
