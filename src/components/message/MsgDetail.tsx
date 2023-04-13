import React, { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Avatar,
  Flex,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { MockCont } from "../../MsgMock";
import { Card } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { BsChatSquareHeart } from "react-icons/bs";

export default function MsgDetail(props: MockCont) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <Flex justify={"space-between"}>
      <Stack ml="40rem">
        <Badge>{props.time}</Badge>
      </Stack>
      <Stack borderWidth="2px" borderColor="gray.200"></Stack>

      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {" "}
        <BsChatSquareHeart color="red" />{" "}
        <Card
          sx={{
            width: "20rem",
            my: 4,
            p: 5,
            pb: 10,
            borderRadius: "7%",
            color: props.user.isMe === true ? "#FAFAFA" : "black",
            bg: props.user.isMe === true ? "#5882FA" : "gray.200",
            _hover: { bg: "#2EFEF7", cursor: "pointer" },
          }}
        >
          <HStack spacing={2} direction="row">
            <Avatar mr={0}>{props.user.avatar}</Avatar>
            <Text>{props.content}</Text>
            {isHovering && (
              <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteClick} />
            )}
          </HStack>
        </Card>
      </Box>
    </Flex>
  );
}
