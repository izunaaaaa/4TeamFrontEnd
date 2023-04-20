import React from "react";
import Routing from "./Routing";
import GlobalStyle from "./GlobalStyle";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/user";

function App() {
  const user = useRecoilValue(userState);

  console.log(user);
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
