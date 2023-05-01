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
  Input,
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
import {
  faPaperclip,
  faScissors,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { deleteLetters } from "api/axios/axiosSetting";
import { ChatId } from "interface/Interface";
import useFormatDate from "./hook/useFormatDate";

const MsgDetail = ({ text, is_sender, id, created_at }: any) => {
  //마우스 hover 상태 관리
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  //삭제 모달 관리
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 삭제 처리 로직
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteLetters, {
    onSuccess: () => {
      queryClient.invalidateQueries("letters");
      onClose();
    },
    onError: (error) => {
      console.error("에러!!", error);
    },
  });

  const formattedDate = useFormatDate(created_at);

  return (
    <>
      <HStack
        justifyContent={is_sender ? "flex-end" : "flex-start"}
        alignItems={"flex-end"}
      >
        <VStack justify={"end"}>
          {is_sender ? (
            <Box textAlign={"right"} mr={2}>
              {" "}
              <button onClick={onOpen}>
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </button>
              <Text fontSize={"sm"}>{formattedDate}</Text>
            </Box>
          ) : null}
        </VStack>

        <Box
          p="2"
          bgColor={is_sender ? "#99ccff" : "#fed9d8"}
          borderRadius="lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          maxW={"200px"}
        >
          <HStack>
            <Text>{text}</Text>
          </HStack>
        </Box>
        <VStack>
          {!is_sender ? (
            <Box ml={2} textAlign={"left"}>
              {" "}
              <button onClick={onOpen}>
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </button>
              <Text fontSize={"sm"}>{formattedDate}</Text>
            </Box>
          ) : null}
        </VStack>
      </HStack>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지를 삭제하시겠습니까?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            삭제한 쪽지는 개인 쪽지함에서만 삭제되고, 상대 쪽지함에서는 삭제되지
            않습니다.{" "}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                deleteMutation.mutate(id);
                onClose();
              }}
            >
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
};

export default MsgDetail;
