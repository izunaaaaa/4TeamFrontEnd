import { Avatar, Box, Flex } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import React from "react";

const UserProfiles = () => {
  const { LoginUserData } = useUser();
  console.log(LoginUserData);
  return (
    <Flex
      marginTop="30px"
      width="100%"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Box textAlign="center">
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
        w="100%"
        justifyContent="center"
        textAlign="center"
      >
        <Flex flexDir="column" w="32%" padding="10px 5px" bg="#f1f4f7">
          <Box fontWeight="bold">부트캠프</Box>
          <Box padding="10px">{LoginUserData?.group?.name}</Box>
        </Flex>

        <Flex flexDir="column" w="32%" padding="10px 5px" bg="#f1f4f7">
          <Box fontWeight="bold">전화번호</Box>

          <Box padding="10px">{LoginUserData?.phone_number}</Box>
        </Flex>
        <Flex flexDir="column" w="32%" padding="10px 5px" bg="#f1f4f7">
          <Box fontWeight="bold">이메일</Box>
          <Box padding="10px"> {LoginUserData?.email}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfiles;
