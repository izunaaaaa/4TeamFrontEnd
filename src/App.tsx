import Routing from "./Routing";
import GlobalStyle from "./GlobalStyle";

function App() {
  // const user = useRecoilValue(userState);

  // axios.defaults.xsrfCookieName = "csrftoken";
  // axios.defaults.xsrfHeaderName = "X-CSRFToken";

  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

export default App;
