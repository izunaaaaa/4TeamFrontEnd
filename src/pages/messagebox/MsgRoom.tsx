import React, { useState } from "react";
import { MockCont } from "../../MsgMock";
import { mockMsgCont } from "../../MsgMock";
import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import MsgDetail from "../../components/message/MsgDetail";

export default function MsgRoom() {
  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();
  //쪽지 내용 폼 관리
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const sendmessage = data.message.trim();
    if (sendmessage === "") {
      onClose();
    } else {
      console.log(data);
    }
  };

  return (
    <>
      {/* 쪽지내역 */}
      {mockMsgCont?.map((msg: MockCont, idx) => {
        return (
          <Flex key={idx} justify={"space-around"}>
            <MsgDetail {...msg} />
          </Flex>
        );
      })}
      <Button onClick={onOpen}>
        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
      </Button>
      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <ModalBody>
            <FormControl>
              <Textarea placeholder="보내실 내용을 입력해주세요" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              Send
            </Button>
            <Button color="black" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
