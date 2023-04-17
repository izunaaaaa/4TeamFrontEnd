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
import { Letterlists } from "interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MsgList = (props: Letterlists, onClick: () => void) => {
  return (
    <>
      <VStack spacing={2} w="100%" h="5rem">
        <Box w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            px={10}
            py={4}
          >
            <HStack>
              <Avatar />
              <VStack alignItems="start" spacing={0} ml={2}>
                <Text fontWeight="bold">{props.sender}</Text>
                <Text fontSize="sm">{props.updated_at}</Text>
              </VStack>
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </>
  );
};

export default MsgList;
