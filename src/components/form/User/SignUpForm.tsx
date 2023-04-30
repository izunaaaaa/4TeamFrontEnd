import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignUpData } from "./interface/type";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import useSignUpGroup from "./Hook/useSignUpGroup";
import { useState } from "react";
import PhoneVerifyModal from "./PhoneVerifyModal";
import { signUp } from "api/axios/axiosSetting";

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SignUpData>();

  /**링크 네비게이트 */
  const navigate = useNavigate();
  const toast = useToast();
  const { group } = useSignUpGroup();

  /**폰넘버 */
  const [phoneNumber, setPhoneNumber] = useState("");
  const getPhoneNumber = (data: string) => {
    setPhoneNumber(data);
  };

  /**회원가입 form 제출시 */
  const { mutate: signUpHandler } = useMutation(
    (signUpData: any) => signUp(signUpData),
    {
      onError: (error: any) => {
        const detail_error = Object.values(error.response.data);
        const isAccess = error.response.data["detail"];
        toast({
          title: "회원가입 실패",
          description: `  ${
            isAccess
              ? "권한이 없습니다, 매니저로부터 권한을 받으세요."
              : detail_error[0]
          }`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (data: SignUpData) => {
    const newSignUpData = {
      username: data.username,
      name: data.name,
      password: data.password,
      phone_number: phoneNumber,
      email: data.email,
      gender: data.gender,
      group: 1,
      is_coach: false,
    };
    if (!phoneNumber)
      return toast({
        title: "회원가입 실패",
        description: "휴대폰인증을 해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    console.log(newSignUpData);
    signUpHandler(newSignUpData);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className={styles.signUp}>
        <img
          className={styles.signUpImg}
          alt=""
          src="https://velog.velcdn.com/images/view_coding/post/a8381e96-0dae-45bf-b30f-985c1d2d6359/image.png"
          style={{ width: "55px" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeDiv}>
            <label htmlFor="username">ID</label>
            <Input
              id="username"
              placeholder="Id를 입력하세요."
              {...register("username", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "15자까지 입력가능합니다.",
                },
                minLength: {
                  value: 3,
                  message: "2자 이상 입력하세요.",
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="password">비밀번호</label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="off"
              {...register("password", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                minLength: {
                  value: 8,
                  message: "8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자까지 입력가능합니다.",
                },
                pattern: {
                  value:
                    // eslint-disable-next-line
                    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/,
                  // eslint-disable-next-line

                  message: "특수문자 1개 이상 넣어주세요.",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="off"
              {...register("passwordConfirm", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="name">성명</label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 10,
                  message: "20자까지 입력 가능합니다.",
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.typeDiv}>
            <label htmlFor="number">전화번호</label>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<FontAwesomeIcon icon={faPhone} />}
                height="50px"
              />
              <Input
                id="number"
                type="number"
                placeholder="인증을 완료하세요."
                readOnly
                defaultValue={phoneNumber}
                {...register("phone_number")}
              />
              <Button
                height="50px"
                onClick={() => {
                  onOpen();
                }}
              >
                인증하기
              </Button>
            </InputGroup>
            {errors?.phone_number && <p>{errors.phone_number?.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  // eslint-disable-next-line
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
                maxLength: {
                  value: 40,
                  message: "40자까지 입력가능합니다.",
                },
              })}
            />
            {errors?.email && <p>{errors.email.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="group">부트캠프</label>
            <Select
              id="group"
              height="50px"
              placeholder="부트캠프를 선택해주세요"
              {...register("group", {
                required: "필수 정보입니다.",
              })}
            >
              {group?.map((data: any) => {
                return (
                  <option key={data.pk} value={data.pk}>
                    {data.name}
                  </option>
                );
              })}
            </Select>
            {errors?.group && <p>{errors.group?.message}</p>}
          </div>
          <Box width="87%">
            <Box display="flex" justifyContent="center">
              <RadioGroup>
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="twitter"
                    value="male"
                    {...register("gender", {
                      required: "성별을 입력해주세요.",
                    })}
                  >
                    남
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="female"
                    {...register("gender", {
                      required: "성별을 입력해주세요.",
                    })}
                  >
                    여
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>
          {errors?.gender && (
            <p className={styles.error}>{errors.gender?.message}</p>
          )}
          <div className={styles.buttonDiv}>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>

            <button>회원가입</button>
          </div>
        </form>
      </div>
      <PhoneVerifyModal
        isOpen={isOpen}
        onClose={onClose}
        getPhoneNumber={getPhoneNumber}
      />
    </>
  );
};
export default SignUpForm;
