import { useState } from "react";
import styled from "styled-components";
import ServerInfo from "./ServerInfo";
import Title from "./Title";
import ModalBox from "../ModalBox";
import FormLogin from "./FormLogin/FormLogin";
import HaveAnAccount from "./HaveAnAccount";
import CloseButton from "./CloseButton";

const Content = styled.section`
  width: 50rem;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 3rem;
  border-radius: 0.4rem;
  overflow: hidden;
  background-color: var(--bg-modal);
  pointer-events: auto !important;

  span,
  a {
    font-family:
      Cerebri Regular,
      sans-serif;
    font-size: 1.4rem;
    letter-spacing: -0.1px;
    color: var(--txt-link);
  }

  span {
    color: var(--txt-span);
  }

  a,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    cursor: pointer;
  }
`;

type Props = {
  isLoginOpen: boolean;
  toggleLogin: () => void;
};

const Login = ({ isLoginOpen, toggleLogin }: Props) => {
  const [serverMsg, setServerMsg] = useState("");

  return (
    <ModalBox isModalOpen={isLoginOpen} toggleModal={toggleLogin}>
      <Content>
        <CloseButton onClose={toggleLogin} />
        <Title />
        <FormLogin setServerMsg={setServerMsg} />
        <ServerInfo serverMsg={serverMsg} />
        <HaveAnAccount />
      </Content>
    </ModalBox>
  );
};

export default Login;
