import React, { useState } from "react";
import {
  Button,
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
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postLetters } from "api/axios/axiosSetting";

const SendMsg = (props: any) => {
  const sendLetter = useMutation(["postLetters"], postLetters);

  //쪽지 모달 폼 관리
  const { register, handleSubmit } = useForm();

  // 쪽지 전송 기능
  const onSubmit = async (data: any) => {
    const sendContent = data.text.trim();
    if (sendContent === "") {
    } else {
      console.log(sendContent);
      sendLetter.mutate({ ...sendContent });
      props.onClose();
    }
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지</ModalHeader>
          <FormControl onClick={handleSubmit(onSubmit)}>
            <ModalBody>
              <Textarea
                placeholder="보내실 내용을 입력해주세요"
                {...register("text")}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Send
              </Button>
              <Button color="black" onClick={props.onClose}>
                Close
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendMsg;
