import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>NotFound</div>

      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </>
  );
};

export default NotFound;
