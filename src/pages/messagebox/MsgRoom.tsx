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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
      {/* 주고받은 쪽지내역 */}
      <Flex justify={"space-evenly"}>
        <Text>TIME</Text>
        <Text>TEXT</Text>
      </Flex>

      {mockMsgCont?.map((msg: MockCont, idx) => {
        return (
          <Flex key={idx} justify={"space-around"}>
            <MsgDetail {...msg} />
          </Flex>
        );
      })}
      <Flex justify={"space-around"} mb={"20px"}>
        <Button onClick={onOpen}>
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </Button>
        <Button>
          <FontAwesomeIcon icon={faTrashCan} size="2x" />
        </Button>
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
