import React, { useState } from "react";
import { Stack, Text, Box, Avatar, HStack } from "@chakra-ui/react";
import { MockCont } from "../../MsgMock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faScissors } from "@fortawesome/free-solid-svg-icons";

export default function MsgDetail(props: any, onClick: () => void) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
      <Box
        padding="6"
        boxShadow="xl"
        mb="5"
        bgColor={props.sender ? "#F7FE2E" : "white"}
        width={"50vmin"}
        cursor={"pointer"}
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
            {isHovering && (
              <FontAwesomeIcon icon={faScissors} onClick={onClick} />
            )}
            <Text as="ins">{props.description}</Text>
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
