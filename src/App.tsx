import React from "react";
import Routing from "./Routing";
import GlobalStyle from "./GlobalStyle";
import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { instance } from "api/axios/axiosSetting";

function App() {
  instance.get(`${BASE_URL}/categories/oz`).then((data) => console.log(data));

  // axios(`${BASE_URL}/categories/oz`).then((data) => console.log(data));
  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
