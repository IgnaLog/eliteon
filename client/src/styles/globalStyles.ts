import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import "./variables.css";

const GlobalStyle = createGlobalStyle`
  ${fonts}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
   ;
  }

  html, body, #root {
    margin: 0;
    height: 100%;
    display: flex;
    flex-flow: column;
    font-family: Cerebri Regular, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 10px;
    color: var(--txt-body);
    background-color: var(--bg-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    color-scheme: var(--color-theme);
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
