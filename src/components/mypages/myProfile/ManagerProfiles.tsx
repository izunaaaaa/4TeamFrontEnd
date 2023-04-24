import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postAccessList } from "api/axios/axiosSetting";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { userValue } from "components/form/User/interface/type";
import * as XLSX from "xlsx";
import styles from "./ManagerProfiles.module.scss";
import useUser from "components/form/User/Hook/useUser";
import useAccess from "../Hook/useAccess";
import AccessInform from "./AccessInform";

const ManagerProfiles = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const toast = useToast();

  const { LoginUserData } = useUser();

  const loginGroup = LoginUserData?.group?.pk;
  const { groupAccess } = useAccess(loginGroup);

  /**액셀 파일 넣기 */
  const fileDataRef = useRef<userValue[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles.target.files[0];

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
              return toast({
                title: "데이터가 비었습니다.",
                description: "Data is invalid",
                status: "warning",
                duration: 4000,
                isClosable: true,
              });
            }

            const userData = { name: name, email: email, phone_number: number };
            data.push(userData);
          }

          toast({
            title: "성공적으로 확인되었습니다.",
            description: "Data is confirmed!!",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setFileName(file.name);
          fileDataRef.current = data;
        } else {
          /**업로드 실패했을때 */
          toast({
            title: "필드가 비었습니다.",
            description: `Missing fields: ${missingFields.join(", ")}`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setFileName("수강생 목록을 넣어 인증해주세요.");
          fileDataRef.current = [];
        }
      };

      reader.readAsBinaryString(file);
    },
    [toast]
  );

  /**유저 accesslist 제출 */
  const { mutateAsync: postAccessListHandler } = useMutation(
    (accessData: any) => postAccessList(accessData),
    {
      onSuccess: () => {
        toast({
          title: "업로드 성공",
          description: "성공적으로 업로드 완료되었습니다.",
          status: "success",
        });
      },
      onError: () => {
        toast({
          title: "업로드 실패",
          description: "다시 업로드 시도해주세요.",
          status: "error",
        });
      },
    }
  );

  const onSubmit = async () => {
    const accessData = {
      group: LoginUserData.group.name,
      members: fileDataRef.current,
    };

    await postAccessListHandler(accessData);
  };

  return (
    <>
      <form className={styles.accessForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.inputLabel}>수강생 목록 업로드</label>
        <InputGroup>
          <InputLeftAddon
            children={<FontAwesomeIcon icon={faFile} />}
            h="50px"
          />
          <Input
            placeholder="업로드 버튼을 눌러주세요."
            defaultValue={fileName}
            fontSize="0.9rem"
          />
          <Input
            id="groupFile"
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
          <label className={styles.uploadFile} htmlFor="groupFile">
            업로드
          </label>
          <Button height="50px" width="140px" type="submit">
            제출하기
          </Button>
        </InputGroup>
      </form>
      <AccessInform
        groupAccess={groupAccess}
        loginGroup={loginGroup}
        LoginUserData={LoginUserData}
      />
    </>
  );
};

export default ManagerProfiles;
