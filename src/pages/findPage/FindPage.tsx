import { Center, Image } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const FindPage = () => {
  return (
    <>
      <Center marginTop="60px">
        <Link to={"/"}>
          <Image
            src="https://velog.velcdn.com/images/view_coding/post/a8381e96-0dae-45bf-b30f-985c1d2d6359/image.png"
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
