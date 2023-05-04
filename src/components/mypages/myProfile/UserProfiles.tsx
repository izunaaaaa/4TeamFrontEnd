import { Avatar, Box, Flex } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import React from "react";

const UserProfiles = () => {
  const { LoginUserData } = useUser();
  return (
    <Flex
      marginTop="50px"
      width="100%"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Box textAlign="center" width="50%">
        <Avatar size="3xl" />
        <Box marginTop="20px" fontWeight="bold" fontSize="1.3rem">
          {LoginUserData?.name}
        </Box>
      </Box>
      <Flex
        marginTop="70px"
        fontSize="1.2rem"
        w={{
          md: "100%",
          base: "50%",
        }}
        minW={{
          md: "100%",
          base: "355px",
        }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDir={{
          md: "row",
          base: "column",
        }}
      >
        <Flex
          wrap="wrap"
          flexDir="column"
          w={{
            md: "32%",
            base: "90%",
          }}
          padding="10px 5px"
        >
          <Box fontWeight="bold" color={"#ff404c"}>
            부트캠프
          </Box>
          <Box padding="10px">{LoginUserData?.group?.name}</Box>
        </Flex>

        <Flex
          flexDir="column"
          w={{
            md: "32%",
            base: "90%",
          }}
          padding="10px 5px"
        >
          <Box fontWeight="bold" color={"#ff404c"}>
            전화번호
          </Box>

          <Box padding="10px">{LoginUserData?.phone_number}</Box>
        </Flex>
        <Flex
          flexDir="column"
          w={{
            md: "32%",
            base: "90%",
          }}
          padding="10px 0px"
        >
          <Box fontWeight="bold" color={"#ff404c"}>
            이메일
          </Box>
          <Box padding="10px 0"> {LoginUserData?.email}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfiles;
