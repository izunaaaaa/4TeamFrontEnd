import React, { useEffect, useState } from "react";
import MsgRoom from "./MsgRoom";
import { Box } from "@chakra-ui/react";

const MobileMsg: React.FC = () => {
  const [marginLeft, setMarginLeft] = useState<number | string>(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setMarginLeft("20rem");
      } else {
        setMarginLeft(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box ml={marginLeft}>
      <MsgRoom />
    </Box>
  );
};

export default MobileMsg;
