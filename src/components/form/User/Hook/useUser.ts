import { Querykey } from "api/react-query/QueryKey";
import { UserData } from "../interface/type";
import { useQuery } from "react-query";
import { getUserData } from "api/axios/axiosSetting";

interface UseUser {
  LoginUserData: UserData;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const useUser = (): UseUser => {
  const {
    data: LoginUserData = null,
    isLoading,
    isError,
  } = useQuery(Querykey.userData, getUserData, {
    retry: false,
    onError: () => {
      return;
    },
  });

  return { LoginUserData, isLoading, isLoggedIn: !isError };
};

export default useUser;
