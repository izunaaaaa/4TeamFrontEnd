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
import { send_message, verify } from "api/axios/phoneAuthentication";

const PhoneVerifyModal = (props: any) => {
  const toast = useToast();

  /**휴대폰인증 */
  const [number, setNumber] = useState("");
  const phoneRef = useRef<any>();
  const verifyCode = useRef<any>();

  useEffect(() => {
    props.getPhoneNumber(number);
  }, [number, props]);

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
                send_message(phoneRef.current);
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
                const reqData = {
                  phoneNumber: phoneRef.current,
                  verifyCode: verifyCode.current,
                };
                const confirm = verify(reqData);
                if (confirm === "success") {
                  toast({
                    title: "인증에 성공했습니다!",
                    description: "휴대폰인증 성공",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  setNumber(phoneRef.current);

                  props.onClose();
                } else if (confirm === "try") {
                  toast({
                    title: "인증실패",
                    description: "인증번호를 발급받으세요.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                } else if (confirm === "different") {
                  toast({
                    title: "인증실패",
                    description: "인증번호가 다릅니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
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
