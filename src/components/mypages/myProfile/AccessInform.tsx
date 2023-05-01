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
  ButtonGroup,
} from "@chakra-ui/react";
import { deleteAccess } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { userValue } from "components/form/User/interface/type";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AccessInformModal from "UI/Modal/AccessInformModal";

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
    (accessInform: accessInform) => {
      console.log(accessInform);
      return deleteAccess(accessInform);
    },
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
      <TableContainer w="100%" marginTop="20px">
        <Box fontSize="1.2rem" fontWeight="bold">
          부트캠프 : {loginGroupName}
        </Box>
        <Table textAlign="center">
          <Thead overscroll="auto">
            <Tr>
              <Th>name</Th>
              <Th>email</Th>
              <Th>phoneNumber</Th>
              <Th textAlign="center">
                <Button onClick={() => onOpen()}>추가하기</Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupAccess?.map((data: userValue) => {
              const accessInform = {
                groupPk: loginGroup,
                userId: data.id,
              };

              return (
                <Tr key={data.id}>
                  <Td>{data.name}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.phone_number}</Td>
                  <Td textAlign="center">
                    <ButtonGroup spacing={1}>
                      <Button
                        onClick={() => {
                          setAccessUserInform(accessInform);
                          onOpen();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteAccessHandler(accessInform);
                        }}
                      >
                        삭제
                      </Button>
                    </ButtonGroup>
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
