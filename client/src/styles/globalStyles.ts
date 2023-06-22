import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Cerebri";
    src: url(../fonts/Cerebri-Sans/CerebriSans-Medium.woff2) format('woff2'), url(../fonts/Cerebri-Sans/CerebriSans-Medium.woff) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: "Cerebri Regular";
    src: url(../fonts/Cerebri-Sans/CerebriSans-Regular.woff2) format('woff2'), url(../fonts/Cerebri-Sans/CerebriSans-Regular.woff) format('woff');
    font-style: normal;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body, #root{
    margin: 0;
    height: 100%;
    font-family: Cerebri Regular, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 10px;
    background-color: rgb(16, 16, 16);
    color-scheme: dark;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .App {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    padding: 1rem 0.5rem;
  }
`;

export default GlobalStyle;
