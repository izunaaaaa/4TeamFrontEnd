import React from "react";
import { VStack, HStack, Circle, Box, Badge } from "@chakra-ui/react";
import { ChatId } from "interface/Interface";

interface StepperProps extends ChatId {
  nextData: boolean;
}

const TimeStepper = ({ text, is_sender, id, nextData }: StepperProps) => {
  return (
    <Box>
      <VStack alignItems="center" mt={14}>
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
          marginBottom="3rem"
        />

        {nextData && (
          <Box
            height="70px"
            borderLeftWidth="2px"
            borderColor="gray.200"
            marginLeft="15px"
            marginTop="3rem"
          />
        )}
      </VStack>
    </Box>
  );
};

export default TimeStepper;
