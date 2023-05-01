import React, { useState, useEffect } from "react";
import { Flex, Box, Text, useMediaQuery, Spinner } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import { LetterList } from "interface/Interface";
import { Outlet } from "react-router-dom";
import EmptyMsg from "./EmptyMsg";

interface MailboxProps {
  chatId?: number;
}

function Mailbox(chatId: MailboxProps) {
  const { isLoading, refetch, data } = useQuery<LetterList[]>(
    "Letterlists",
    getLetterlists,
    { enabled: !chatId }
  );

  const [clickedIdx, setClickedIdx] = useState<number | null>(null);

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 769px)");

  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정

  const renderChatList = () => {
    if (isLoading || !data) {
      return (
        <Box w={"100vw"} textAlign={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      );
    }
    if (data && data.length === 0) {
      return <EmptyMsg />;
    }

    return data.map((item: LetterList, idx: number) => (
      <Box
        key={idx}
        _hover={{ bg: "#dce0e7", cursor: "pointer" }}
        w={isMobile ? "100vw" : "30vw"}
        bg={clickedIdx === idx ? "#dce0e7" : "transparent"}
        onClick={() => setClickedIdx(idx)}
      >
        <MsgList {...item} isMobile={isMobile} refetch={refetch} />
      </Box>
    ));
  };

  return (
    <Flex
      h={"100vh"}
      maxH={"100%"}
      mt={isMobile ? "8rem" : "4rem"}
      ml={isMobile ? 0 : "15.5rem"}
      position={"fixed"}
      overscrollY={"auto"}
    >
      <Box maxW="480px" border={"1px solid lightgray"} bg={"white"}>
        {renderChatList()}
      </Box>
      <Outlet />
    </Flex>
  );
}

export default Mailbox;
