import React from "react";
import { Box, SkeletonCircle, SkeletonText, Flex } from "@chakra-ui/react";

const LetterSkeleton = () => {
  return (
    <>
      <Box padding={6} maxW={"100vmin"} bg={"lightgray"}>
        <Box padding="6" boxShadow="md" bg="white" mb="5">
          <SkeletonCircle size="10" />
          <SkeletonText
            mt="3rem"
            noOfLines={4}
            spacing="4"
            skeletonHeight="2"
          />
        </Box>
      </Box>
    </>
  );
};

export default LetterSkeleton;
