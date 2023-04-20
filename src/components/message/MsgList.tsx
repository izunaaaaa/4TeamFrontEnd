import React from "react";
import {
  Divider,
  Text,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Chattings } from "interface/Interface";
import { Link } from "react-router-dom";

const MsgList: React.FC<Chattings> = ({ user, created_at, messages }) => {
  const avatarUrl = messages.sender?.avatar || "https://bit.ly/broken-link";

  return (
    <Link to={`/chattings/${messages.room}`}>
      <VStack spacing={2} h="5rem" maxW={"500px"}>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            px={10}
            py={4}
          >
            <HStack>
              <Avatar src={avatarUrl} />
              {user.username && <Text>{user.username}</Text>}
              {created_at && <Text>{created_at}</Text>}
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </Link>
  );
};

export default MsgList;
