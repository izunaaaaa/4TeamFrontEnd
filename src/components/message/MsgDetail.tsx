import React, { useState } from "react";
import {
  Text,
  Box,
  HStack,
  useDisclosure,
  Button,
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
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { deleteLetters } from "api/axios/axiosSetting";
import useFormatDate from "./hook/useFormatDate";
import { useParams } from "react-router-dom";

const MsgDetail = ({
  text,
  is_sender,
  id,
  created_at,
  refetch,
  chatId,
}: any) => {
  //마우스 hover 상태 관리

  const { chatId } = useParams();
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


  const { mutateAsync: deleteMutation } = useMutation(
    (id: any) => deleteLetters(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["letters", Number(chatId)]);
        onClose();
      },
    }
  );


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
              onClick={async () => {
                deleteMutation(id);
                onClose();
                window.location.reload();
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
