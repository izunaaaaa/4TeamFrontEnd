import { getUserData } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { UserData } from "../interface/type";
import { useQuery } from "react-query";

interface UseUser {
  LoginUserData: UserData;
  isLoading: boolean;
  isError: boolean;
}

const useUser = (): UseUser => {
  const {
    data: LoginUserData = null,
    isLoading,
    isError,
  } = useQuery(Querykey.userData, getUserData);

  return { LoginUserData, isLoading, isError };
};

export default useUser;
