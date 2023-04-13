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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Letterlists } from "interface/Interface";

const MsgList = (props: Letterlists) => {
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
      <VStack spacing={2} w="100%" h="5rem">
        <Box w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            px={10}
            py={4}
            _hover={{ bg: "#848484", cursor: "pointer" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HStack>
              <Avatar />
              <VStack alignItems="start" spacing={0} ml={2}>
                <Text fontWeight="bold">{props.sender}</Text>
                <Text fontSize="sm">{props.receiver}</Text>
              </VStack>
            </HStack>
            <Text>{props.update_at}</Text>
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
