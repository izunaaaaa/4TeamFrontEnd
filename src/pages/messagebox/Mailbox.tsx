import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import MsgList from "../../components/message/MsgList";
import { useQuery } from "react-query";
import { getLetterlists } from "api/axios/axiosSetting";
import { Letterlists } from "interface/Interface";

function Mailbox() {
  const { isLoading, error, data } = useQuery<Letterlists[]>(
    "Letterlists",
    getLetterlists
  );

  //받은 쪽지함
  return (
    <Flex>
      <Box sx={{ width: "100%", bg: "#F2F2F2", maxW: "479px" }}>
        {data?.length
          ? data?.map((item, idx) => {
              return (
                <div key={idx}>
                  <MsgList {...item} />
                </div>
              );
            })
          : "받은 쪽지가 없습니다."}
      </Box>
      <Box>
        <Text>"펼쳐볼 쪽지를 선택해주세요."</Text>
      </Box>
    </Flex>
  );
}

export default Mailbox;
