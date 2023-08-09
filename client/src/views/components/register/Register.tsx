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
  position: relative;
  padding: 3rem;
  border-radius: 0.4rem;
  overflow: hidden;
  text-align: center;
  background-color: rgb(30, 27, 30);
  flex-direction: column;
  pointer-events: auto !important;

  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1rem;
    letter-spacing: -0.1px;
    color: white;
  }

  span {
    color: rgb(173, 174, 181);
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
