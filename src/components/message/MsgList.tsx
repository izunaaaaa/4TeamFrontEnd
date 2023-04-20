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
import { faScissors, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Chattings } from "interface/Interface";

const MsgList = (props: Chattings) => {
  return (
    <>
      <VStack spacing={2} h="5rem" maxW={"500px"}>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            px={10}
            py={4}
          >
            <HStack>
              <VStack alignItems="start" spacing={0} ml={2}>
                <Text> {props.messages.sender.email}</Text>
              </VStack>
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </>
  );
};

export default MsgList;
