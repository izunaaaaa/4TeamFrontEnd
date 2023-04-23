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
import { ChatList } from "interface/Interface";
import { Link } from "react-router-dom";

const MsgList = ({ receiver, created_at }: ChatList) => {
  return (
    <>
      <Box px={5} py={5}>
        <HStack>
          <Text>{receiver}</Text>
        </HStack>

        <Text my={3}>{created_at}</Text>
      </Box>
    </>
  );
};

export default MsgList;
