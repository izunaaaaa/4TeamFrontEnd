import React from "react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LetterSkeleton = () => {
  return (
    <>
      <Box padding={6} minW={"70vmin"} bg={"lightgray"}>
        <Box padding="10" boxShadow="md" bg="white" mt="5rem">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      </Box>
    </>
  );
};

export default LetterSkeleton;
