import React from "react";
import { Box, Text } from "@chakra-ui/react";

const EmptyMsg = () => {
  return (
    <>
      {" "}
      <Box padding={6} maxW={"100vmin"} bg={"dce0e7"}>
        <Box padding="10" boxShadow="md" bg="white">
          <Text>쪽지를 보내거나 받으면 쪽지함이 생성됩니다.</Text>
        </Box>
      </Box>
    </>
  );
};

export default EmptyMsg;
