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
import SendMsg from "components/message/SendMsg";
import TimeStepper from "components/message/TimeStepper";
import { ChatId } from "interface/Interface";

export default function MsgRoom() {
  const chatId = 9;
  const { data } = useQuery<ChatId[]>(["letters", chatId], () =>
    getLetters(chatId)
  );

  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 쪽지 전송 기능

  return (
    <>
      <Box bgColor={"#F5F6CE"} w="100vmax" h="100vmax">
        {/* 주고받은 쪽지내역 */}
        {data?.map((item: ChatId, idx: number) => {
          const nextData = idx < data.length - 1;
          return (
            <Flex key={idx} justify={"space-around"}>
              <TimeStepper {...item} nextData={nextData} />
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
