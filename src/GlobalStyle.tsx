import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100%;
    height: 100%;
  }
  :root {
    --nav-medium-width: 250px;
    --nav-medium-height : 7em;
  }
 
`;

export default GlobalStyle;
