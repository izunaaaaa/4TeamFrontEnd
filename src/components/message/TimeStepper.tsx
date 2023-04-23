import React from "react";
import { VStack, HStack, Circle, Box, Badge } from "@chakra-ui/react";
import { ChatId } from "interface/Interface";

interface StepperProps extends ChatId {
  nextData: boolean;
}

const TimeStepper = ({
  sender,
  room,
  text,
  is_sender,
  nextData,
}: StepperProps) => {
  return (
    <VStack spacing={7} alignItems="center" mt={"5.2rem"}>
      <Circle
        size="30px"
        bg={nextData ? "lightgray" : "blue"}
        color="white"
        fontWeight="bold"
        fontSize="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px solid white"
      />

      {nextData && (
        <Box
          height="60px"
          borderLeftWidth="2px"
          borderColor="gray.200"
          marginLeft="15px"
        />
      )}
    </VStack>
  );
};

export default TimeStepper;
