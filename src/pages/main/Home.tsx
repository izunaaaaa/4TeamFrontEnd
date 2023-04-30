import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Flex margin=" var(--nav-medium-height) 0px 0px var(--nav-medium-width)">
      <Img
        margin="0 auto"
        w="60%"
        src="https://velog.velcdn.com/images/view_coding/post/96f6b4e2-defc-4609-8519-2a2146f44b64/image.png"
      />
    </Flex>
  );
};

export default Home;
