import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Box,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MsgDetail from "../../components/message/MsgDetail";
import { useQuery } from "react-query";
import { getLetterlists, getLetters } from "api/axios/axiosSetting";
import { useParams } from "react-router-dom";
import TimeStepper from "components/message/TimeStepper";
import { ChatId, LetterList } from "interface/Interface";
import { useSendMsg } from "components/message/hook/useSendMsg";
import SendMsgBar from "components/message/SendMsgBar";
import SendMsg from "components/message/SendMsg";

export default function MsgRoom() {
  //url params 가져오기
  const { chatId: chatIdString } = useParams<{ chatId: string }>();
  const chatId = chatIdString ? parseInt(chatIdString) : undefined;

  // 쪽지 내역 불러오기
  const { data } = useQuery<ChatId[]>(
    ["letters", chatId],
    () => {
      if (chatId === undefined) {
        throw new Error("Invalid chatId");
      }
      return getLetters(chatId);
    },
    { enabled: chatId !== undefined }
  );

  //삭제 id 상태 관리
  const [id, setId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (data) {
      const target = data.find((item) => item.id);
      if (target) {
        setId(target.id);
      }
    }
  }, [data]);

  // receiver_pk 불러오기

  const resultPk = useQuery<LetterList[]>("Letterlists", getLetterlists);
  const [receiverPk, setReceiverPk] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (resultPk.data) {
      const targetReceiver = resultPk.data.find(
        (chat: LetterList) => chat.pk === chatId
      );
      if (targetReceiver) {
        setReceiverPk(targetReceiver.receiver_pk);
      }
    }
  }, [resultPk.data, chatId]);

  return (
    <>
      <Box
        bgColor={"white"}
        overflowY="scroll"
        overflowX="hidden"
        h="86vh"
        w="45vw"
      >
        {/* 주고받은 쪽지내역 */}
        {data?.map((item: ChatId, idx: number) => {
          const nextData = idx < data.length - 1;
          return (
            <Flex
              key={idx}
              mb={10}
              ml={10}
              justifyContent={item.is_sender ? "flex-end" : "flex-start"}
              alignItems={"center"}
              px={5}
            >
              {/* <TimeStepper {...item} nextData={nextData} /> */}
              <MsgDetail {...item} textId={item.id} />
            </Flex>
          );
        })}
      </Box>
      <SendMsgBar receiver={receiverPk} />
    </>
  );
}
