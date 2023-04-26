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
  useToast,
  Box,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postLetters } from "api/axios/axiosSetting";

export interface SendMsgData {
  receiver: number;
  text: string;
}

const SendMsg = (props: any) => {
  //쪽지 모달 폼 관리
  const { register, handleSubmit, reset } = useForm<SendMsgData>();

  // 쪽지 전송 기능

  const sendMutation = useMutation((data: { receiver: number; text: string }) =>
    postLetters(data)
  );
  const toast = useToast();
  const onSubmit = async (data: { receiver: number; text: string }) => {
    if (data.text.trim() === "") {
      toast({
        render: () => (
          <Box color="white" p={3} bg="red.500">
            내용을 입력해주세요
          </Box>
        ),
      });
      return;
    }

    try {
      await sendMutation.mutateAsync({ ...data });
      reset();
      console.log("send", data);
      props.onClose();
    } catch (error) {
      console.error(error);
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
              <Input
                type="hidden"
                {...register("receiver")}
                value={props.receiver}
              />

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
