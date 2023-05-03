import { Center, Image } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const FindPage = () => {
  return (
    <>
      <Center margin="30px 0">
        <Link to={"/"}>
          <Image
            src="https://velog.velcdn.com/images/view_coding/post/ae532678-7a1e-4916-95d1-86b330f60f11/image.png"
            alt="logo"
            width="55px"
          />
        </Link>
      </Center>
      <Outlet />
    </>
  );
};

export default FindPage;
