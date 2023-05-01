import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useSendMsg } from "./hook/useSendMsg";
import { useNavigate } from "react-router-dom";

const SendMsg = ({ isOpen, onClose, receiver }: any) => {
  //쪽지 모달 폼 관리

  const { register, handleSubmit, onSubmit, reset } = useSendMsg(
    onClose,
    receiver
  );

  const navigate = useNavigate();

  const moveLetterlist = async (data: any) => {
    try {
      await onSubmit(data);
      onClose();
      navigate(`/community/letterlist/me`);
    } catch (error) {
      console.log("쪽지함 이동 실패", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <form onSubmit={handleSubmit(moveLetterlist)}>
            <ModalBody>
              <Input type="hidden" value={receiver} />

              <Textarea
                placeholder="보내실 내용을 입력해주세요"
                {...register("text")}
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendMsg;
