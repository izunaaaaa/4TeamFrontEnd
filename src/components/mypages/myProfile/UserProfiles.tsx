import { Avatar, Box, Flex } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import React from "react";

const UserProfiles = () => {
  const { LoginUserData } = useUser();
  return (
    <Flex
      marginTop="30px"
      width="100%"
      justifyContent="center"
      alignItems="center"
      padding="30px"
      height="100%"
    >
      <Box textAlign="center" width="50%">
        <Avatar
          size={{
            base: "2xl",
            md: "3xl",
          }}
        />
        <Box marginTop="20px" fontWeight="bold" fontSize="1.3rem">
          {LoginUserData?.name}
        </Box>
      </Box>
      <Flex
        marginTop="30px"
        w="70%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDir="column"
      >
        <Flex flexDir="column" padding="10px 5px" bg="#f1f4f7" w="80%">
          <Box fontWeight="bold">부트캠프</Box>
          <Box padding="10px">{LoginUserData?.group?.name}</Box>
        </Flex>

        <Flex flexDir="column" padding="10px 5px" bg="#f1f4f7" w="80%">
          <Box fontWeight="bold">전화번호</Box>

          <Box padding="10px">{LoginUserData?.phone_number}</Box>
        </Flex>
        <Flex flexDir="column" padding="10px 5px" bg="#f1f4f7" w="80%">
          <Box fontWeight="bold">이메일</Box>
          <Box padding="10px"> {LoginUserData?.email}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfiles;
