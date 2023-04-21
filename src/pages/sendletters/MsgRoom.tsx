import React, { useState } from "react";
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
  Box,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import MsgDetail from "../../components/message/MsgDetail";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "react-query";
import { getLetters, postLetters } from "api/axios/axiosSetting";
import { useParams } from "react-router-dom";
import { Chattings } from "interface/Interface";
import SendMsg from "components/message/SendMsg";
import TimeStepper from "components/message/TimeStepper";

export default function MsgRoom() {
  const data = [
    {
      user: {
        username: "ddd",
        name: "dd",
        email: "abc@gmail.com",
        avatar: "",
        is_coach: false,
      },
      created_at: "2023-04-21",
      messages: {
        sender: {
          username: "xxx",
          name: "xx",
          email: "def@gmail.com",
          avatar: "",
          is_coach: false,
        },
        room: 1,
        text: "hello",
      },
    },

    {
      user: {
        username: "xxx",
        name: "xx",
        email: "def@gmail.com",
        avatar: "",
        is_coach: false,
      },
      created_at: "2023-04-22",
      messages: {
        sender: {
          username: "ddd",
          name: "dd",
          email: "abc@gmail.com",
          avatar: "",
          is_coach: false,
        },
        room: 1,
        text: "me too",
      },
    },
  ];

  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 쪽지 전송 기능

  return (
    <>
      <Box bgColor={"#F5F6CE"} w="100vmax">
        {/* 주고받은 쪽지내역 */}
        {data?.map((item: Chattings, idx: number) => {
          return (
            <Flex key={idx} justify={"space-between"}>
              <HStack justify={"space-between"}>
                <TimeStepper {...item} />
                <Badge>{item.created_at}</Badge>
              </HStack>
              <MsgDetail {...item} />
            </Flex>
          );
        })}

        <button onClick={onOpen} style={{ margin: "50px" }}>
          <FontAwesomeIcon icon={faPaperPlane} size="xl" cursor="pointer" />
        </button>
      </Box>

      <SendMsg isOpen={isOpen} onClose={onClose} />
    </>
  );
}

// const { id } = useParams();
// console.log("id", id);

// //api 호출
// const { data } = useQuery<Chattings[]>(["letters", Number(id)], () =>
//   getLetters(Number(id))
// );
