import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sampleImg from "../../../images/sample.png";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { userValue } from "components/form/User/interface/type";
import * as XLSX from "xlsx";
import styles from "./ManagerProfiles.module.scss";
import useUser from "components/form/User/Hook/useUser";
import useAccess from "../Hook/useAccess";
import AccessInform from "./AccessInform";
import { postAccess } from "api/axios/axiosSetting";

const ManagerProfiles = () => {
  const { handleSubmit, register } = useForm();
  const toast = useToast();
  const id = "accessId";

  const { LoginUserData } = useUser();

  const loginGroup = LoginUserData?.group?.pk;
  const { groupAccess, refetch: accessRefetch } = useAccess(loginGroup);

  /**액셀 파일 넣기 */
  const fileDataRef = useRef<userValue[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = useCallback(
    (acceptedFiles: ChangeEvent<HTMLInputElement>) => {
      const file = acceptedFiles?.target?.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (!event.target) {
            return;
          }
          const binaryString = event.target.result;
          const workbook = XLSX.read(binaryString, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          /**필드 확인 */
          const expectedFields = ["name", "email", "phone_number"];
          const actualFields: any[] = [];

          for (let i = 65; i <= 67; i++) {
            const cell = String.fromCharCode(i) + "1";
            if (sheet[cell]) {
              actualFields.push(sheet[cell].v.toLowerCase());
            }
          }

          const missingFields = expectedFields.filter(
            (field) => !actualFields.includes(field)
          );

          const data = [];

          /**필드값이 모두 존재하면 */
          if (missingFields.length === 0) {
            for (let i = 2; ; i++) {
              const name = sheet["A" + i]?.v;
              const email = sheet["B" + i]?.v;
              const number = sheet["C" + i]?.v;

              /**다음 열 값이 없으면 중단 */
              if (!name && !email && !number) {
                break;
              }

              /**빈값이 존재할때 */
              if (
                name === undefined ||
                email === undefined ||
                number === undefined
              ) {
                fileDataRef.current = [];
                if (!toast.isActive(id)) {
                  return toast({
                    title: "데이터가 비었습니다.",
                    description: "Data is invalid",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                  });
                }
              }

              const userData = {
                name: name,
                email: email,
                phone_number: number,
              };
              data.push(userData);
            }
            if (!toast.isActive(id)) {
              toast({
                title: "업로드가 완료되었습니다.",
                description: "파일을 제출해주세요.",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
            }

            setFileName(file.name);
            fileDataRef.current = data;
          } else {
            /**업로드 실패했을때 */
            if (!toast.isActive(id)) {
              toast({
                title: "파일을 다시 제출해주세요.",
                description: `Missing fields: ${missingFields.join(", ")}`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            }
            setFileName("수강생 목록을 넣어 인증해주세요.");
            fileDataRef.current = [];
          }
        };

        reader.readAsBinaryString(file);
      }
    },
    [toast]
  );

  /**유저 accesslist 제출 */
  const { mutateAsync: postAccessListHandler } = useMutation(
    (accessData: userValue[]) => postAccess(accessData, LoginUserData.group.pk),
    {
      onSuccess: () => {
        if (!toast.isActive(id)) {
          toast({
            title: "업로드 성공",
            description: "성공적으로 업로드 완료되었습니다.",
            status: "success",
          });
        }
      },
      onError: () => {
        if (!toast.isActive(id)) {
          toast({
            title: "업로드 실패",
            description: "다시 업로드 시도해주세요.",
            status: "error",
          });
        }
      },
    }
  );

  const onSubmit = async () => {
    const accessData: userValue[] = fileDataRef.current;
    await postAccessListHandler(accessData);
    accessRefetch();
  };

  return (
    <>
      <Flex
        w="78%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          justifySelf="flex-start"
          alignSelf="flex-start"
          marginBottom="30px"
        >
          <form className={styles.accessForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.inputLabel}>수강생 목록 업로드</label>
            <InputGroup>
              <HStack
                spacing={0.5}
                width={{
                  base: "100%",
                  md: "55%",
                }}
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
              >
                <Flex flexDirection="row" width="100%">
                  <InputLeftAddon
                    children={<FontAwesomeIcon icon={faFile} />}
                    h="45px"
                  />
                  <Input
                    placeholder="업로드 버튼을 눌러주세요."
                    defaultValue={fileName}
                    fontSize="0.9rem"
                    h="45px"
                    width={{
                      base: "100%",
                      md: "400px",
                    }}
                  />
                </Flex>
                <Input
                  id="groupFile"
                  h="45px"
                  type="file"
                  accept=".xlsx, .xls"
                  {...register("groupFile", {
                    required: "필수입니다.",
                    onChange: (e) => {
                      handleFileUpload(e);
                    },
                    validate: {
                      check: () => {
                        if (fileDataRef.current.length === 0) {
                          return "데이터가 부정확합니다.";
                        }
                      },
                    },
                  })}
                />

                <ButtonGroup spacing={0}>
                  <Button
                    h="40px"
                    width="120px"
                    padding="0"
                    w="80px"
                    margin="9px"
                  >
                    <FormLabel htmlFor="groupFile" margin="0">
                      업로드
                    </FormLabel>
                  </Button>
                  <Button h="40px" w="80px" type="submit" margin="9px">
                    제출
                  </Button>
                </ButtonGroup>
              </HStack>
            </InputGroup>
          </form>
          <label className={styles.inputLabel}>파일양식 예시</label>

          <Image src={sampleImg} width="300px" marginTop="10px" />
        </Box>

        <AccessInform
          groupAccess={groupAccess}
          loginGroup={loginGroup}
          LoginUserData={LoginUserData}
        />
      </Flex>
    </>
  );
};

export default ManagerProfiles;
