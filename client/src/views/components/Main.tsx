import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ScrollBar from "./ScrollBar";

const ContainerMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = () => {
  return (
    <ContainerMain>
      <ScrollBar>
        <Outlet />
      </ScrollBar>
    </ContainerMain>
  );
};
export default Main;
