import Routing from "./Routing";
import GlobalStyle from "./GlobalStyle";
import axios from "axios";
import { instance } from "api/axios/axiosSetting";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
