import React, { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Avatar,
  HStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* 쪽지 내역 */}
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
            {isHovering && (
              <button onClick={onOpen}>
                <FontAwesomeIcon icon={faScissors} />
              </button>
            )}
            <Text as="ins">{props.description}</Text>
          </HStack>
        </Stack>
      </Box>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지를 삭제하시겠습니까?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>내용</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
