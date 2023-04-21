import React from "react";
import {
  Divider,
  Text,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Chattings } from "interface/Interface";
import { Link } from "react-router-dom";

const MsgList = ({ user, created_at, messages }: Chattings) => {
  const avatarUrl = messages.sender?.avatar || "https://bit.ly/broken-link";

  return (
    <>
      <Box px={5} py={5}>
        <Flex justify={"space-between"}>
          <HStack>
            <Avatar src={avatarUrl} />
            <Text>{messages.text}</Text>
          </HStack>

          <Text my={3}>{created_at}</Text>
        </Flex>{" "}
      </Box>
    </>
  );
};

export default MsgList;
