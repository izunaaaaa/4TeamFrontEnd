import React from "react";
import Routing from "./Routing";
import styles from "./App.module.scss";
import GlobalStyle from "./GlobalStyle";
import axios from "axios";
import { instance } from "api/axios/axiosSetting";

function App() {
  // axios("http://115.85.181.9:7999/api/v1/feeds/").then((data) =>
  //   console.log(data)
  // );

  // instance.get()
  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
