import { Spinner, useToast } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthPageProps = {
  children: React.ReactNode;
};

export default function AuthPage({ children }: AuthPageProps) {
  const { isLoggedIn, isLoading, LoginUserData } = useUser();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/");
        toast({
          title: "로그아웃",
          description: "로그인 세션이 만료 되었습니다.",
          status: "error",
        });
      }
    }
  }, [isLoading, isLoggedIn, LoginUserData, navigate, toast]);
  if (!isLoading) {
    return <>{children}</>;
  } else {
    return <Spinner />;
  }
}
