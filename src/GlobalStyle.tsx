import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
  }
  span, p, h1, h2, h3 {
    font-family: nanumsquare;
  }
  body {
    width: 100%;
    height: 100%;
  }
  :root {
    --nav-medium-width: 250px;
    --nav-medium-height : 4.6em;
  }
 
  svg {
    pointer-events: none;
  }
  path {
    pointer-events: none;
  }

  @font-face {
	font-family: "nanumsquare";
	src: url(./fonts/NanumSquare_acR.ttf ) format('nanum-square');
}

  `;

export default GlobalStyle;
