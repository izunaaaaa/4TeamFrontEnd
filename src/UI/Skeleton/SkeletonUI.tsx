import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import styles from "./Skeleton.module.scss";

const SkeletonUI = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      // width={{ lg: "40%", md: "40%", base: "80%" }}
      width="500px"
      height="500px"
      margin="30px 5% 30px 15%"
    >
      <div className={styles.skeletonName}>
        <SkeletonCircle size="10" />
        <Skeleton height="18px" width="60%" margin="10px 0 0 10px" />
      </div>
      <Skeleton height="300px" margin="10px 5px 5px 0"></Skeleton>
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="5" />
    </Box>
  );
};

export default SkeletonUI;
