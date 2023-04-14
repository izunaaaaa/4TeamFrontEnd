import React, { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Avatar,
  Flex,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { MockCont } from "../../MsgMock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faScissors } from "@fortawesome/free-solid-svg-icons";

export default function MsgDetail(props: MockCont) {
  const [isHovering, setIsHovering] = useState(false);

  const handleDeleteClick = () => {};

  return (
    <Flex justify={"space-evenly"}>
      <Stack my={10}>
        <Badge bgColor="#819FF7">{props.time}</Badge>
      </Stack>
      <Stack borderWidth="2px" borderColor="gray.200"></Stack>

      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Box
          padding="6"
          boxShadow="xl"
          mb="5"
          bgColor={props.user.isMe ? "#F7FE2E" : "white"}
          width={"50vmin"}
        >
          <Stack spacing={2}>
            <HStack>
              {" "}
              <FontAwesomeIcon icon={faPaperclip} />
            </HStack>

            <HStack>
              <Text as="b" color={props.user.isMe ? "#FF0080" : "#58ACFA"}>
                {props.user.isMe ? "From. " : "To. "}{" "}
              </Text>
              <Avatar size="xs">{props.user.avatar}</Avatar>{" "}
            </HStack>
            <HStack>
              {isHovering && (
                <FontAwesomeIcon
                  icon={faScissors}
                  onClick={handleDeleteClick}
                />
              )}{" "}
              <Text as="ins">{props.content}</Text>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
