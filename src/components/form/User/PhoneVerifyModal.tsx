import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { sendAuthCode, sendPhoneNumber } from "api/axios/axiosSetting";

export interface PhoneNubmer {
  phone_number: string;
}

export interface AuthFormat extends PhoneNubmer {
  auth_number: string;
}

const PhoneVerifyModal = (props: any) => {
  const toast = useToast();

  /**휴대폰인증 */
  const [number, setNumber] = useState("");
  const phoneRef = useRef<any>();
  const verifyCode = useRef<any>();

  useEffect(() => {
    props.getPhoneNumber(number);
  }, [number, props]);

  const { mutateAsync: sendPhoneNumberHandler } = useMutation(
    (phoneNumber: PhoneNubmer) => sendPhoneNumber(phoneNumber)
  );

  const { mutateAsync: sendAuthCodeHandler } = useMutation(
    (authFormat: AuthFormat) => sendAuthCode(authFormat)
  );

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <label htmlFor="phoneVerification">휴대폰인증</label>
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
                sendPhoneNumberHandler(phoneNubmerFormat);
              }}
            >
              인증번호보내기
            </Button>
          </Flex>
          <label htmlFor="phoneVerification">인증번호</label>
          <Flex>
            <Input
              id="phoneVerification"
              placeholder="인증번호를 입력해주세요."
              onChange={(e) => {
                verifyCode.current = e.target.value;
              }}
            />
            <Button
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhoneVerifyModal;
