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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MsgDetail from "../../components/message/MsgComment";

export default function MsgRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <ModalBody>
            <Textarea placeholder="보내실 내용을 입력해주세요" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
