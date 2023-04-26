import React, { useState, useEffect } from "react";
import { Flex, useDisclosure, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MsgDetail from "../../components/message/MsgDetail";
import { useQuery } from "react-query";
import { getLetterlists, getLetters } from "api/axios/axiosSetting";
import { useParams } from "react-router-dom";
import SendMsg from "components/message/SendMsg";
import TimeStepper from "components/message/TimeStepper";
import { ChatId, LetterList } from "interface/Interface";

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
  const [receiverPks, setReceiverPks] = useState<number[]>([]);

  useEffect(() => {
    if (resultPk.data) {
      const receiverPksArray = resultPk.data.map(
        (chat: LetterList) => chat.receiver_pk
      );
      setReceiverPks(receiverPksArray);
    }
  }, [resultPk.data]);

  // 쪽지 내역 불러오기

  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor={"#F5F6CE"} w="100vw" h="100vh">
        {/* 주고받은 쪽지내역 */}
        {data?.map((item: ChatId, idx: number) => {
          const nextData = idx < data.length - 1;
          return (
            <Flex key={idx} justify={"space-around"} mb={10}>
              <TimeStepper {...item} nextData={nextData} />
              <MsgDetail {...item} textId={item.id} />
            </Flex>
          );
        })}

        <button onClick={onOpen} style={{ marginLeft: "6rem" }}>
          <FontAwesomeIcon icon={faPaperPlane} size="xl" cursor="pointer" />
        </button>
      </Box>

      {/* 쪽지 보내기 모달  */}
      <SendMsg isOpen={isOpen} onClose={onClose} receiver={receiverPks} />
    </>
  );
}
