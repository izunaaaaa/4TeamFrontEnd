import React from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { ChatList } from "interface/Interface";
import { Link } from "react-router-dom";

const MsgList = ({ pk, receiver, created_at }: ChatList) => {
  const formatDate = (input: string): string => {
    const date = new Date(input);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  const formattedDate = formatDate(created_at);

  return (
    <>
      <Link to={`/letterlist/${pk}`}>
        <Box px={5} py={5} borderBottom={"1px solid black"}>
          <HStack>
            <Text>{receiver}</Text>
          </HStack>

          <Text my={3}>{formattedDate}</Text>
        </Box>
      </Link>
    </>
  );
};

export default MsgList;
