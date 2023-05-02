import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpFormBtn = () => {
  const navigate = useNavigate();
  return (
    <ButtonGroup w="100%" justifyContent="center" padding="20px">
      <Button
        width="30%"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        이전
      </Button>

      <Button bg={"#ff404c"} color="white" colorScheme={"red"} w="30%">
        회원가입
      </Button>
    </ButtonGroup>
  );
};

export default SignUpFormBtn;
