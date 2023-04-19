import { getUserData } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { UserData } from "../interface/type";
import { useQuery } from "react-query";

interface GetUseUser {
  LoginUserData: UserData;
}
const useUser = (): GetUseUser => {
  const { data: LoginUserData } = useQuery(Querykey.userData, () =>
    getUserData()
  );

  return { LoginUserData };
};

export default useUser;
