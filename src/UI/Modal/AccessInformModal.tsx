import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  Input,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postAccess, putAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { userValue } from "components/form/User/interface/type";

const AccessInformModal = (props: any) => {
  const { register, handleSubmit, reset } = useForm<userValue>();
  const toast = useToast();

  const accessUserInform = props.accessUserInform;
  /**access 추가하기 */
  const queryClinet = useQueryClient();

  const mutationState = {
    onSuccess: () => {
      queryClinet.invalidateQueries([Querykey.access, props.loginGroup]);
    },
    onError: (error: any) => {
      const detail_error = Object.values(error?.response?.data);
      toast({
        title: "정보를 다시 입력해주세요.",
        description: `${detail_error[0]}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  };

  const { mutateAsync: postAccessHandler, isLoading: postLoading } =
    useMutation(
      (postAccessData: userValue) =>
        postAccess(postAccessData, props.loginGroup),
      mutationState
    );

  const { mutateAsync: putAccessHandler, isLoading: putLoading } = useMutation(
    (putAccessData: userValue) => {
      return putAccess(putAccessData, accessUserInform);
    },
    mutationState
  );

  const onSubmit = async (data: userValue) => {
    console.log(data);
    const newAccessData: userValue = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      is_signup: false,
    };
    if (accessUserInform) {
      await putAccessHandler(newAccessData);
    } else {
      await postAccessHandler(newAccessData);
    }
    reset();
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={7}>수강생을 추가해주세요.</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel margin="0 0 8px 0">이름</FormLabel>
            <Input
              placeholder="이름을 입력하세요."
              {...register("name", {
                required: true,
              })}
              marginBottom="20px"
            />

            <FormLabel margin="0 0 8px 0">이메일</FormLabel>
            <Input
              placeholder="이메일을 입력하세요."
              {...register("email", {
                required: true,
              })}
              marginBottom="20px"
            />
            <FormLabel margin="0 0 8px 0">전화번호</FormLabel>
            <Input
              placeholder="휴대폰 번호를 입력하세요."
              {...register("phone_number", {
                required: true,
              })}
              marginBottom="20px"
            />
            <ButtonGroup width="100%" justifyContent="center">
              <Button
                type="submit"
                mr={3}
                isLoading={putLoading || postLoading}
              >
                추가하기
              </Button>
              <Button onClick={props.onClose} colorScheme="red">
                취소하기
              </Button>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccessInformModal;
