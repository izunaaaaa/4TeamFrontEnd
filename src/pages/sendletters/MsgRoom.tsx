import React, { useState, useEffect } from "react";
import { Flex, useDisclosure, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MsgDetail from "../../components/message/MsgDetail";
import { useQuery } from "react-query";
import { getLetters } from "api/axios/axiosSetting";
import { useParams } from "react-router-dom";
import SendMsg from "components/message/SendMsg";
import TimeStepper from "components/message/TimeStepper";
import { ChatId } from "interface/Interface";

export default function MsgRoom() {
  const { chatId: chatIdString } = useParams<{ chatId: string }>();
  const chatId = chatIdString ? parseInt(chatIdString) : undefined;

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

  const [receiver, setReceiver] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const otherUser = data.find((item) => !item.is_sender);
      if (otherUser) {
        setReceiver(otherUser.sender.pk);
      }
    }
  }, [data]);

  // chakra ui의 모달 컨트롤 훅
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor={"#F5F6CE"} w="60vw" h="100vmax">
        {/* 주고받은 쪽지내역 */}
        {data?.map((item: ChatId, idx: number) => {
          const nextData = idx < data.length - 1;
          return (
            <Flex key={idx} justify={"space-around"}>
              <TimeStepper {...item} nextData={nextData} />
              <MsgDetail {...item} chatId={chatId} />
            </Flex>
          );
        })}

        <button onClick={onOpen} style={{ margin: "50px" }}>
          <FontAwesomeIcon icon={faPaperPlane} size="xl" cursor="pointer" />
        </button>
      </Box>
      {receiver && (
        <SendMsg isOpen={isOpen} onClose={onClose} receiver={receiver} />
      )}
    </>
  );
}
