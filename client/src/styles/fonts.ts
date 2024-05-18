import { css } from "styled-components";

const Font = css`
  @font-face {
    font-family: "Cerebri";
    src:
      url(../fonts/Cerebri-Sans/CerebriSans-Medium.woff2) format("woff2"),
      url(../fonts/Cerebri-Sans/CerebriSans-Medium.woff) format("woff");
    font-style: normal;
  }

  @font-face {
    font-family: "Cerebri Regular";
    src:
      url(../fonts/Cerebri-Sans/CerebriSans-Regular.woff2) format("woff2"),
      url(../fonts/Cerebri-Sans/CerebriSans-Regular.woff) format("woff");
    font-style: normal;
  }

  @font-face {
    font-family: "Cerebri Bold";
    src:
      url(../fonts/Cerebri-Sans/CerebriSans-Bold.woff2) format("woff2"),
      url(../fonts/Cerebri-Sans/CerebriSans-Bold.woff) format("woff");
    font-style: normal;
  }
`;

export default Font;
