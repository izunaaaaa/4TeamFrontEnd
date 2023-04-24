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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { accessUser } from "components/mypages/interface/type";
import { useMutation, useQueryClient } from "react-query";
import { postAccess, putAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";

const AccessInformModal = (props: any) => {
  const { register, handleSubmit, reset } = useForm<accessUser>();
  const toast = useToast();

  const accessUserInform = props.accessUserInform;
  /**access 추가하기 */
  const queryClinet = useQueryClient();
  const { mutateAsync: postAccessHandler } = useMutation(
    (postAccessData: accessUser) =>
      postAccess(postAccessData, props.loginGroup),
    {
      onSuccess: () => {
        queryClinet.invalidateQueries([Querykey.access, props.loginGroup]);
      },
    }
  );
  const { mutateAsync: putAccessHandler } = useMutation(
    (putAccessData: accessUser) => {
      return putAccess(putAccessData, accessUserInform);
    },
    {
      onSuccess: () => {
        queryClinet.invalidateQueries([Querykey.access, props.loginGroup]);
      },
      onError: (error: any) => {
        const detail_error = Object.values(error?.response?.data);
        toast({
          title: "회원가입 실패",
          description: `${detail_error[0]}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = async (data: accessUser) => {
    const newAccessData: accessUser = {
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
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>name</FormLabel>
            <Input
              placeholder="이름을 입력하세요."
              {...register("name", {
                required: true,
              })}
            />

            <FormLabel>email</FormLabel>
            <Input
              placeholder="이메일을 입력하세요."
              {...register("email", {
                required: true,
              })}
            />
            <FormLabel>phoneNumber</FormLabel>
            <Input
              placeholder="휴대폰 번호를 입력하세요."
              {...register("phone_number", {
                required: true,
              })}
            />
            <Button type="submit" colorScheme="blue" mr={3}>
              추가하기
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccessInformModal;
