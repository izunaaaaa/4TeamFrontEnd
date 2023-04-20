import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  FormControl,
  Box,
  HStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import MsgDetail from "../../components/message/MsgDetail";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "react-query";
import { getLetters, postLetters } from "api/axios/axiosSetting";
import { useParams } from "react-router-dom";

export default function MsgRoom() {
  const { id } = useParams<{ id: string }>();

  //api 호출
  const { data } = useQuery(["letters", id], () => getLetters(Number(id)));
  const sendLetter = useMutation(["postLetters", id], (data: string) =>
    postLetters(Number(id), data)
  );

  //쪽지 모달 폼 관리
  const { register, handleSubmit } = useForm();
  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 쪽지 전송 기능
  const onSubmit = async (data: any) => {
    const sendContent = data.description.trim();
    if (sendContent === "") {
    } else {
      console.log(sendContent);
      sendLetter.mutate({ ...sendContent });
      onClose();
    }
  };

  return (
    <>
      <Box>
        {/* 주고받은 쪽지내역 */}
        {data?.map((letter: any, idx: any) => {
          return (
            <Box key={idx} mt={"5"} maxW={100}>
              <MsgDetail {...letter} />
            </Box>
          );
        })}
      </Box>

      <HStack onClick={onOpen} cursor="pointer" margin="2rem">
        <FontAwesomeIcon icon={faPaperPlane} size="xl" />
        <FontAwesomeIcon icon={faTrashCan} size="xl" />
      </HStack>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <FormControl onClick={handleSubmit(onSubmit)}>
            <ModalBody>
              <Textarea
                placeholder="보내실 내용을 입력해주세요"
                {...register("description")}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Send
              </Button>
              <Button color="black" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
}
