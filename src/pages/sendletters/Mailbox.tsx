import React, { useState } from "react";
import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import { Letterlists } from "interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import LetterSkeleton from "UI/Skeleton/LetterSkeleton";

function Mailbox() {
  const [isHovering, setIsHovering] = useState(false);
  const { isLoading, error, data } = useQuery<Letterlists[]>(
    "Letterlists",
    getLetterlists
  );

  const handleDelete = () => {
    data?.splice(0, 1);
  };

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  //받은 쪽지함
  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정
  return (
    <Flex justify={"center"} mt={"8rem"}>
      <Box
        minH={"30rem"}
        maxW="400px"
        border={"1px solid lightgray"}
        bg={"lightgray"}
        ml={"14rem"}
      >
        {data?.length ? (
          data?.map((item, idx) => {
            return (
              <Flex
                key={idx}
                bg={"#FAFAFA"}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                _hover={{ bg: "#848484", cursor: "pointer" }}
              >
                <MsgList {...item} />
                {isHovering && (
                  <span
                    onClick={handleDelete}
                    style={{ cursor: "pointer", alignSelf: "center" }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                )}
              </Flex>
            );
          })
        ) : (
          <div>
            <LetterSkeleton />
            <LetterSkeleton />
          </div>
        )}
      </Box>
      {/* 모바일 화면일 경우, 아래 박스를 숨기는 조건부 렌더링 (480px 넘어가는 화면에서만 렌더링 됨) */}
      {isMobile ? null : (
        <Flex
          border={"1px solid lightgray"}
          flexDir={"column"}
          align={"center"}
          justify={"center"}
          p={"40"}
          maxW={"500px"}
          ml={"5rem"}
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText} size="2xl" />
          <Text fontSize="xl">"도착한 쪽지를 열어보세요."</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Mailbox;
