import { ReactNode } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import styled from "styled-components";

const CustomScrollBar = styled(SimpleBar)`
  .simplebar-scrollbar::before {
    width: 0.6rem;
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  .simplebar-content-wrapper {
    outline: none;
  }
`;

type Props = {
  children: ReactNode;
};

const ScrollBar = ({ children }: Props) => {
  return (
    <CustomScrollBar style={{ maxHeight: "100%", overflowX: "hidden" }}>
      {children}
    </CustomScrollBar>
  );
};
export default ScrollBar;
