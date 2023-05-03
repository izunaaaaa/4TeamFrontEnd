import { Spinner } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthPageProps = {
  children: React.ReactNode;
};

export default function AuthPage({ children }: AuthPageProps) {
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
    return <>{children}</>;
  } else {
    return <Spinner />;
  }
}
