import React from "react";
import {
  Flex,
  Box,
  Text,
  SkeletonCircle,
  SkeletonText,
  useMediaQuery,
} from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import { Letterlists } from "interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

function Mailbox() {
  const { isLoading, error, data } = useQuery<Letterlists[]>(
    "Letterlists",
    getLetterlists
  );

  // 브라우저 화면 크기 설정하는 chakra 내장함수
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  //받은 쪽지함
  //받은 쪽지가 없는 경우, 스켈레톤이 나오게 설정
  return (
    <Flex justify={"center"} mt={"1rem"}>
      <Box
        minH={"600px"}
        w="500px"
        border={"1px solid lightgray"}
        bg={"lightgray"}
      >
        {data?.length ? (
          data?.map((item, idx) => {
            return (
              <div key={idx}>
                <MsgList {...item} />
              </div>
            );
          })
        ) : (
          <Box padding="6">
            <Box padding="6" boxShadow="md" bg="white" mb="5">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
            <Box padding="6" boxShadow="md" bg="white" mt="10">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          </Box>
        )}
      </Box>
      {/* 모바일 화면일 경우, 아래 박스를 숨기는 조건식 (480px 넘어가는 화면에서만 렌더링 됨) */}
      {isMobile ? null : (
        <Flex
          border={"1px solid lightgray"}
          flexDir={"column"}
          align={"center"}
          justify={"center"}
          p={"40"}
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText} size="2xl" />
          <Text fontSize="3xl">도착한 쪽지를 열어보세요.</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Mailbox;
