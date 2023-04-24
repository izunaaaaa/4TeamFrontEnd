import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { deleteAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AccessInformModal from "UI/Modal/AccessInformModal";
import { accessUser } from "../interface/type";

export interface accessInform {
  groupPk: number | undefined;
  userId: number | undefined;
}

const AccessInform = (props: any) => {
  const groupAccess = props.groupAccess;
  const loginGroup = props.LoginUserData?.group?.pk;

  const loginGroupName = props.LoginUserData?.group?.name;

  const [accessUserInform, setAccessUserInform] = useState<accessInform | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**access 삭제하기 */
  const queryClinet = useQueryClient();
  const { mutateAsync: deleteAccessHandler } = useMutation(
    (accessInform: accessInform) => deleteAccess(accessInform),
    {
      onSuccess: () => {
        queryClinet.invalidateQueries([Querykey.access, loginGroup]);
      },
    }
  );

  return (
    <>
      <AccessInformModal
        isOpen={isOpen}
        onClose={onClose}
        loginGroup={loginGroup}
        accessUserInform={accessUserInform}
      />
      <TableContainer w="90%" marginTop="20px">
        <Box
          margin="20px"
          fontSize="1.2rem"
          fontWeight="bold"
          backgroundColor="twitter.50"
          borderRadius="md"
          px={5}
          height="70px"
          as="button"
        >
          부트캠프 : {loginGroupName}
        </Box>
        <Table>
          <Thead overscroll="auto">
            <Tr>
              <Th>name</Th>
              <Th>email</Th>
              <Th>phoneNumber</Th>
              <Th>
                <Button onClick={() => onOpen()}>추가하기</Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupAccess?.map((data: accessUser) => {
              const accessInform = {
                groupPk: data.group?.pk,
                userId: data.id,
              };
              return (
                <Tr key={data.id}>
                  <Td>{data.name}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.phone_number}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setAccessUserInform(accessInform);
                        onOpen();
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => {
                        deleteAccessHandler(accessInform);
                      }}
                    >
                      삭제
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccessInform;
