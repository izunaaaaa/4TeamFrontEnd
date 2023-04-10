import React from "react";
import {
  Divider,
  Text,
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Note } from "../../MsgMock";

const MsgList = (props: Note) => {
  return (
    <>
      <VStack spacing={2} w="100%" maxW="768px">
        <Box w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            px={2}
            py={1}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <HStack>
              <Avatar src={props.avatar} />
              <VStack alignItems="start" spacing={0} ml={2}>
                <Text fontWeight="bold">{props.title}</Text>
                <Text fontSize="sm">{props.content}</Text>
              </VStack>
            </HStack>
            {/* <Text fontSize="xs"> {props.content => 시간 데이터 넣기} </Text> */}
          </Flex>
          <Divider />
        </Box>
      </VStack>
    </>
  );
};

export default MsgList;
