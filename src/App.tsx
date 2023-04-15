import React from "react";
import Routing from "./Routing";
import GlobalStyle from "./GlobalStyle";
import axios from "axios";

function App() {
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
