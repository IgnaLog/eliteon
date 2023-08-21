import { useState } from "react";
import styled from "styled-components";
import ServerInfo from "./ServerInfo";
import AlreadyRegistered from "./AlreadyRegistered";
import Title from "./Title";
import FormRegister from "./FormRegister/FormRegister";
import CloseButton from "./CloseButton";
import ModalBox from "../ModalBox";

const Content = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 3rem;
  border-radius: 0.4rem;
  text-align: center;
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
  isSignupOpen: boolean;
  toggleSignup: () => void;
};

const Register = ({ isSignupOpen, toggleSignup }: Props) => {
  const [serverMsg, setServerMsg] = useState("");

  return (
    <ModalBox isModalOpen={isSignupOpen} toggleModal={toggleSignup}>
      <Content>
        <CloseButton onClose={toggleSignup} />
        <Title />
        <FormRegister setServerMsg={setServerMsg} />
        <ServerInfo serverMsg={serverMsg} />
        <AlreadyRegistered />
      </Content>
    </ModalBox>
  );
};

export default Register;
