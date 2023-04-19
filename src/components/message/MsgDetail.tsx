import React, { useState } from "react";
import { Stack, Text, Box, Avatar, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faScissors } from "@fortawesome/free-solid-svg-icons";

export default function MsgDetail(props: any) {
  const [isHovering, setIsHovering] = useState(true);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // const { data } = props;
  // const handleDeleteData = () => {
  //   const newData = [...data];
  //   newData.splice(0, 1);
  // };
  return (
    <>
      <Box
        padding="6"
        boxShadow="xl"
        mb="5"
        bgColor={props.sender ? "#F7FE2E" : "white"}
        width={"50vmin"}
        cursor={"pointer"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Stack spacing={2}>
          <HStack>
            {" "}
            <FontAwesomeIcon icon={faPaperclip} />
          </HStack>

          <HStack>
            <Text as="b" color={props.receiver ? "#FF0080" : "#58ACFA"}>
              {props.receiver ? "From. " : "To. "}{" "}
            </Text>
            <Avatar size="xs"></Avatar>{" "}
          </HStack>
          <HStack>
            {/* {isHovering && (
              <button onClick={handleDeleteData}>
                <FontAwesomeIcon icon={faScissors} />
              </button>
            )} */}
            <Text as="ins">{props.description}</Text>
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
