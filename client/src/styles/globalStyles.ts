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

  html, body, #root {
    margin: 0;
    height: 100%;
    font-family: Cerebri Regular, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 10px;
    color-scheme: dark;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }

  button {
    background: none;
    border: none;
    border-radius: 0;
    color: inherit;
    font: inherit;

    &:hover{
      cursor: pointer;
    }
  }

  div, footer, article {
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  .App {
    width: 100%;
    height: 90vh;
    display: flex ;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    -webkit-box-flex: 1;
    flex-direction: column;
    z-index: 1;
  }

`;

export default GlobalStyle;
