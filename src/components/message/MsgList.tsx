import React, { useState } from "react";
import {
  Divider,
  Text,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Note } from "../../MsgMock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const MsgList = (props: Note) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HStack>
              <Avatar src={props.avatar} />
              <VStack alignItems="start" spacing={0} ml={2}>
                <Text fontWeight="bold">{props.title}</Text>
                <Text fontSize="sm">{props.content}</Text>
              </VStack>
            </HStack>
            {isHovering && (
              <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteClick} />
            )}
          </Flex>
          <Divider />
        </Box>
      </VStack>
    </>
  );
};

export default MsgList;
