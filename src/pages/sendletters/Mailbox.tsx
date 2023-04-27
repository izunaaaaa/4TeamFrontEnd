import React, { useState, useEffect } from "react";
import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import LetterSkeleton from "UI/Skeleton/LetterSkeleton";
import { LetterList } from "interface/Interface";
import { Outlet } from "react-router-dom";
import SkeletonUI from "UI/Skeleton/SkeletonUI";
import EmptyMsg from "./EmptyMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Mailbox() {
  const { isLoading, error, data } = useQuery<LetterList[]>(
    "Letterlists",
    getLetterlists
  );
  const [isHovering, setIsHovering] = useState(false);

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 769px)");

  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정

  const renderChatList = () => {
    if (isLoading || !data) {
      return <LetterSkeleton />;
    }
    if (data && data.length === 0) {
      return <EmptyMsg />;
    }

    return data.map((item: LetterList, idx: number) => (
      <Box
        key={idx}
        bg={"#FAFAFA"}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        _hover={{ bg: "#848484", cursor: "pointer" }}
        w={isMobile ? "100vw" : "400px"}
      >
        <MsgList {...item} isMobile={isMobile} isHovering={isHovering} />
      </Box>
    ));
  };

  return (
    <Flex
      h={"100vh"}
      maxH={"100%"}
      mt={isMobile ? "8rem" : "5rem"}
      ml={isMobile ? 0 : "15.5rem"}
      position={"fixed"}
      overscrollY={"auto"}
    >
      <Box maxW="600px" border={"1px solid lightgray"} bg={"white"}>
        {renderChatList()}
      </Box>
      <Outlet />
    </Flex>
  );
}

export default Mailbox;
