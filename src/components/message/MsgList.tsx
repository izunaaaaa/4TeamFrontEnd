import React from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { ChatList } from "interface/Interface";
import { Link } from "react-router-dom";
import { faScissors, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatListProps {
  pk: number;
  receiver: string;
  created_at: string;
  isMobile: boolean;
  isHovering: boolean;
  last_letter: string;
}

const MsgList = ({
  pk,
  receiver,
  created_at,
  last_letter,
  isMobile,
  isHovering,
}: ChatListProps) => {
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
      <Link
        to={isMobile ? `/letterlist/mobile/${pk}` : `/letterlist/${pk}`}
        target={isMobile ? "_blank" : "_self"}
      >
        <Box px={5} py={5} borderBottom={"1px solid black"}>
          <HStack justify={"space-between"}>
            <Text>{pk}번째 쪽지</Text>
            <Text my={3}>{formattedDate}</Text>
            {isHovering && (
              <button>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </HStack>
          <Text fontWeight={"600"}>{last_letter}</Text>
        </Box>
      </Link>
    </>
  );
};

export default MsgList;
