import React from "react";
import { Box, Circle, Text } from "@chakra-ui/react";

const LetterSkeleton = () => {
  return (
    <>
      <Box padding={6} maxW={"100vmin"} bg={"lightgray"}>
        <Box padding="6" boxShadow="md" bg="white" mb="5">
          <Circle size="10" />
          <Text>쪽지를 보내거나 받으면 쪽지함이 생성됩니다.</Text>
        </Box>
      </Box>
    </>
  );
};

export default LetterSkeleton;
