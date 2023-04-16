import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpMain = () => {
  const navigate = useNavigate();
  return (
    <>
      <Center padding="50px" fontSize="30px">
        회원가입
      </Center>
      <HStack display="flex" justifyContent="center">
        <Card w="md" h="md" padding="30px">
          <Center
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <CardHeader>
              <Avatar size="2xl" />
            </CardHeader>
            <Heading size="md">수강생</Heading>

            <CardBody textTransform="uppercase">
              <p>국비교육 수강생(내일배움카드 발급자)</p>
              <p>국비교육 외 부트캠프 수강생</p>
            </CardBody>

            <CardFooter>
              <Button onClick={() => navigate("/signup/student")}>
                수강생 가입
              </Button>
            </CardFooter>
          </Center>
        </Card>
        <Card w="md" h="md" padding="30px">
          <Center
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <CardHeader>
              <Avatar
                size="2xl"
                src="
              https://e7.pngegg.com/pngimages/65/690/png-clipart-laptop-computer-icons-user-system-administrator-programmer-case-closed-miscellaneous-electronics.png
              "
              />
            </CardHeader>
            <Heading size="md">매니저</Heading>

            <CardBody textTransform="uppercase">
              <p>부트캠프 소속 매니저</p>
              <p>인증서류 필요</p>
            </CardBody>

            <CardFooter>
              <Button onClick={() => navigate("/signup/manager")}>
                매니저 가입
              </Button>
            </CardFooter>
          </Center>
        </Card>
      </HStack>
    </>
  );
};

export default SignUpMain;
