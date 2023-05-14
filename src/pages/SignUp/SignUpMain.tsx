import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Img,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import codingImg from "../../images/coding.png";
import readingImg from "../../images/reading.png";
import styles from "./SignUpMain.module.scss";

const SignUpMain = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.signupCard}>
        <Card w="md" h="md" padding="30px" margin="5px">
          <Center
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <CardHeader>
              <Img src={readingImg} w="150px" loading="lazy" />
            </CardHeader>
            <Heading size="md">수강생</Heading>

            <CardBody textTransform="uppercase" padding="30px 0" height="500px">
              <p>국비교육 수강생(내일배움카드 발급자)</p>
              <p>국비교육 외 부트캠프 수강생</p>
            </CardBody>

            <CardFooter>
              <Button onClick={() => navigate("/user/signup/student")}>
                수강생 가입
              </Button>
            </CardFooter>
          </Center>
        </Card>

        <Card w="md" h="md" padding="30px" margin="5px">
          <Center
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <CardHeader marginTop="10px">
              <Img src={codingImg} w="140px" loading="lazy" />
            </CardHeader>
            <Heading size="md">매니저</Heading>

            <CardBody textTransform="uppercase" padding="30px 0">
              <p>부트캠프 소속 매니저</p>
              <p>인증서류 필요</p>
            </CardBody>

            <CardFooter>
              <Button onClick={() => navigate("/user/signup/manager")}>
                매니저 가입
              </Button>
            </CardFooter>
          </Center>
        </Card>
      </div>
    </>
  );
};

export default SignUpMain;
