import { Spinner } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// URL 에 userName 포함한 경우 사용
export default function AuthPage(props: any) {
  const { isLoggedIn, isLoading, LoginUserData } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/errorpage");
      }
    }
  }, [isLoading, isLoggedIn, LoginUserData, navigate]);
  if (!isLoading) {
    return <>{props.children}</>;
  } else {
    return <Spinner />;
  }
}
