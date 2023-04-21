import React, { useState } from "react";
import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import LetterSkeleton from "UI/Skeleton/LetterSkeleton";
import { Chattings } from "interface/Interface";
import { Outlet } from "react-router-dom";

function Mailbox() {
  const [isHovering, setIsHovering] = useState(false);
  // const { isLoading, error, data } = useQuery<Chattings[]>(
  //   "Letterlists",
  //   getLetterlists
  // );

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
  ];

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  //받은 쪽지함
  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정
  return (
    <Flex mt={"5rem"} minH={"100vmax"}>
      {isMobile ? (
        <Box
          minW="400px"
          maxW={"100vmax"}
          border={"1px solid lightgray"}
          bg={"lightgray"}
        >
          {data?.length ? (
            data?.map((item: Chattings, idx: number) => {
              return (
                <Box
                  key={idx}
                  bg={"#FAFAFA"}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  _hover={{ bg: "#848484", cursor: "pointer" }}
                >
                  <MsgList {...item} />
                </Box>
              );
            })
          ) : (
            <div>
              <LetterSkeleton />
              <LetterSkeleton />
            </div>
          )}
        </Box>
      ) : (
        <Box
          minW="400px"
          border={"1px solid lightgray"}
          bg={"lightgray"}
          ml={"14rem"}
        >
          {data?.length ? (
            data?.map((item: Chattings, idx: number) => {
              return (
                <Box
                  key={idx}
                  bg={"#FAFAFA"}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  _hover={{ bg: "#848484", cursor: "pointer" }}
                >
                  <MsgList {...item} />
                </Box>
              );
            })
          ) : (
            <div>
              <LetterSkeleton />
              <LetterSkeleton />
            </div>
          )}
        </Box>
      )}
      <Outlet />
    </Flex>
  );
}

export default Mailbox;
