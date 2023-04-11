import React, { useState } from "react";
import { MockCont } from "../../MsgMock";
import { mockMsgCont } from "../../MsgMock";
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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import MsgDetail from "../../components/message/MsgDetail";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function MsgRoom() {
  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();
  //쪽지 모달 창 관리
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const sendmessage = data.message.trim();
    if (sendmessage === "") {
    } else {
      console.log(data);
      onClose();
    }
  };

  // 대화방 나가기
  // const handleDeleteRoom = (idx: number) => {

  // }

  return (
    <>
      {/* 주고받은 쪽지내역 */}
      {mockMsgCont?.map((msg: MockCont, idx) => {
        return (
          <Box key={idx}>
            <MsgDetail {...msg} />
          </Box>
        );
      })}
      <Flex justify={"space-around"}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="xl"
          onClick={onOpen}
          cursor={"pointer"}
        />
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="xl"
          cursor={"pointer"}
        />
      </Flex>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <FormControl>
            <ModalBody>
              <Textarea
                placeholder="보내실 내용을 입력해주세요"
                {...register("message")}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit(onSubmit)}
              >
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
