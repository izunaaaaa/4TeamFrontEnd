import React, { useState, useEffect } from "react";
import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import LetterSkeleton from "UI/Skeleton/LetterSkeleton";
import { ChatList } from "interface/Interface";
import { Outlet } from "react-router-dom";

function Mailbox() {
  const { isLoading, error, data } = useQuery<ChatList[]>(
    "Letterlists",
    getLetterlists
  );
  const [isHovering, setIsHovering] = useState(false);

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  //받은 쪽지함
  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정
  return (
    <Flex mt={"5rem"} h={"100vh"} maxH={"100%"}>
      <Box maxW="500px" border={"1px solid lightgray"} bg={"lightgray"}>
        {data?.map((item: ChatList, idx: number) => {
          return (
            <Box
              key={idx}
              bg={"#FAFAFA"}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              _hover={{ bg: "#848484", cursor: "pointer" }}
              w={isMobile ? "100vw" : "500px"}
              ml={isMobile ? 0 : "15.5rem"}
              minW="400px"
            >
              <MsgList {...item} isMobile={isMobile} />
            </Box>
          );
        })}
      </Box>
      <Outlet />
    </Flex>
  );
}

export default Mailbox;
