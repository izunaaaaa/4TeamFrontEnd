import React from "react";
import { VStack, HStack, Circle, Box, Badge } from "@chakra-ui/react";
import { Chattings } from "interface/Interface";

function TimeStepper({ user, created_at, messages }: Chattings) {
  const isLastItem = !created_at; // created_at이 없으면 마지막 아이템으로 처리합니다.

  return (
    <VStack spacing={7} alignItems="center" mt={10}>
      <Circle
        size="30px"
        bg={isLastItem ? "#3A01DF" : "lightgray"}
        color="white"
        fontWeight="bold"
        fontSize="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px solid white"
      />

      {!isLastItem && (
        <Box
          height="60px"
          borderLeftWidth="2px"
          borderColor="gray.200"
          marginLeft="15px"
        />
      )}
    </VStack>
  );
}

export default TimeStepper;
