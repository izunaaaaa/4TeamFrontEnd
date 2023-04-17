import React from "react";
import { Box, SkeletonCircle, SkeletonText, Flex } from "@chakra-ui/react";

const LetterSkeleton = () => {
  return (
    <>
      <Box padding={6} minW={"480px"} bg={"lightgray"}>
        <Box padding="6" boxShadow="md" bg="white" mb="5">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      </Box>
    </>
  );
};

export default LetterSkeleton;
