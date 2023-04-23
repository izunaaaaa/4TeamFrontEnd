import React, { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Avatar,
  HStack,
  useDisclosure,
  Button,
  Badge,
  Flex,
  VStack,
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
import { useMutation } from "react-query";
import { deleteLetters } from "api/axios/axiosSetting";
import { ChatId } from "interface/Interface";

const MsgDetail = ({ sender, room, text, is_sender }: ChatId) => {
  const [isHovering, setIsHovering] = useState(true);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const deleteChat = useMutation(["deleteLetters"], deleteLetters)

  return (
    <Flex>
      {/* 쪽지 내역 */}
      <Box
        mt={10}
        padding="6"
        boxShadow="xl"
        bgColor={is_sender ? "#F7FE2E" : "white"}
        w={"20vw"}
        h={"25vh"}
        cursor={"pointer"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Stack spacing={2}>
          <HStack>
            <FontAwesomeIcon icon={faPaperclip} />
          </HStack>
          <HStack>
            <Avatar size="xs" />

            <Text fontWeight={600} color={is_sender ? "blue" : "red"}>
              {is_sender ? "To. " : "From. "}
            </Text>
          </HStack>
          <HStack>
            {isHovering && (
              <button onClick={onOpen}>
                <FontAwesomeIcon icon={faScissors} />
              </button>
            )}
            <Text as="ins">{text}</Text>
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
            <Button colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MsgDetail;
