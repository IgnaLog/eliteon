import styled from "styled-components";
import ScrollBar from "../atoms/ScrollBar";
import { ReactNode } from "react";

const ContainerMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <ContainerMain>
      <ScrollBar>{children}</ScrollBar>
    </ContainerMain>
  );
};
export default Main;
