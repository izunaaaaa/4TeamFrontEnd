import {
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import XLSX from "xlsx";
import * as XLSX from "xlsx";

function UploadUser() {
  const toast = useToast();

  const [filename, setFilename] = useState(null);
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onload = () => {
      const fileContents = reader.result;
      const workbook = XLSX.read(fileContents, { type: "binary" });

      /**첫번째 sheet확인 */
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      /**필드 확인 */
      const expectedFields = ["name", "email", "phone_number"];
      const actualFields = [];

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
        setFilename(file.name);
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
            setFileData([]);
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
        setFileData(data);
      } else {
        toast({
          title: "필드가 비었습니다.",
          description: `Missing fields: ${missingFields.join(", ")}`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    reader.readAsBinaryString(file);
  }, []);

  /**useDropzone함수 */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      "file/xlsx": [".xlsx", ".xls"],
    },
  });

  console.log(fileData);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} type="file" accept=".xls,.xlsx" />
      <InputGroup width="350px">
        <InputLeftElement children={<FontAwesomeIcon icon={faFile} />} />
        <Input
          placeholder={
            isDragActive
              ? "여기로 드래그해주세요."
              : "클릭하거나 드래그하여 파일을 업로드해주세요."
          }
          value={
            filename ? filename : "클릭하거나 드래그하여 파일을 업로드해주세요."
          }
        />
      </InputGroup>
    </div>
  );
}

export default UploadUser;
