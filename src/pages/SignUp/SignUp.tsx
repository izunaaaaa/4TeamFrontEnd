import { Querykey } from "api/react-query/QueryKey";
import useUser from "components/form/User/Hook/useUser";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";

const SignUp = (props: any) => {
  const { LoginUserData, isLoading, isError } = useUser();

  return (
    <>
      <Outlet />
    </>
  );
};

export default SignUp;
