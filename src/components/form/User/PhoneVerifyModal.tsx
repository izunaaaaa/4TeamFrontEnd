import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { sendAuthCode, sendPhoneNumber } from "api/axios/axiosSetting";
import Timer from "./Timer";

export interface PhoneNubmer {
  phone_number: string;
}

export interface AuthFormat extends PhoneNubmer {
  auth_number: string;
}

const PhoneVerifyModal = (props: any) => {
  const id = "verifyPhoneId";
  const toast = useToast();

  /**휴대폰인증 */
  const [number, setNumber] = useState("");
  const phoneRef = useRef<any>();
  const verifyCode = useRef<any>();
  const [verifyTime, setVerifyTime] = useState(false);

  useEffect(() => {
    props.getPhoneNumber(number);
  }, [number, props]);

  const { mutateAsync: sendPhoneNumberHandler } = useMutation(
    (phoneNumber: PhoneNubmer) => sendPhoneNumber(phoneNumber),
    {
      onSuccess: () => {
        setVerifyTime(true);
      },
      onError: () => {
        if (!toast.isActive(id)) {
          toast({
            title: "인증오류",
            description: "올바른 번호를 입력해주세요.",
            status: "error",
          });
        }
      },
    }
  );

  const { mutateAsync: sendAuthCodeHandler } = useMutation(
    (authFormat: AuthFormat) => sendAuthCode(authFormat),
    {
      onSuccess: (res) => {
        toast({
          title: "인증성공",
          status: "success",
        });
        setNumber(phoneRef.current);
        props.onClose();
      },
      onError: (error: any) => {
        if (!toast.isActive(id)) {
          const detailError = Object.values(error.response.data);
          toast({
            id,
            title: "인증실패",
            description: `${detailError}`,
            status: "error",
          });
        }
      },
    }
  );

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent padding="20px 0px">
        <ModalHeader textAlign="center">휴대폰 인증</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box padding="10px 0">
            <Box
              as="label"
              htmlFor="phoneVerification"
              fontWeight="bold"
              fontSize="lg"
            >
              전화번호
            </Box>
            <Flex>
              <Input
                id="phoneVerification"
                placeholder="번호를 입력해주세요."
                onChange={(e) => {
                  phoneRef.current = e.target.value;
                }}
              />
              <Button
                onClick={() => {
                  const phoneNubmerFormat = {
                    phone_number: phoneRef.current,
                  };
                  setVerifyTime(false);
                  sendPhoneNumberHandler(phoneNubmerFormat);
                }}
              >
                인증번호전송
              </Button>
            </Flex>
          </Box>
          <Box padding="10px 0">
            <Box
              as="label"
              htmlFor="phoneVerification"
              fontWeight="bold"
              fontSize="lg"
            >
              인증번호
            </Box>
            <Flex>
              <InputGroup>
                <Input
                  id="phoneVerification"
                  placeholder="인증번호를 입력해주세요."
                  onChange={(e) => {
                    verifyCode.current = e.target.value;
                  }}
                />

                {verifyTime && (
                  <InputRightElement width="93px" bg="#EDF2F7">
                    <Timer mm="5" ss="00" />
                  </InputRightElement>
                )}
              </InputGroup>
            </Flex>
            <Button
              margin="15px 0"
              w="100%"
              onClick={() => {
                const verifyFormat = {
                  phone_number: phoneRef.current,
                  auth_number: verifyCode.current,
                };
                sendAuthCodeHandler(verifyFormat);
              }}
            >
              인증확인
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhoneVerifyModal;
