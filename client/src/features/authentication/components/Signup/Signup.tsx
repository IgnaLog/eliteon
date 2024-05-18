import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ModalBox from "@components/molecules/ModalBox";
import BtnClose from "../BtnClose";
import Title from "../Title";
import FormSignup from "./FormSignup/FormSignup";
import ServerInfo from "../ServerInfo";
import LinkAuth from "../LinkAuth";

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

const Signup = ({ isSignupOpen, toggleSignup }: Props) => {
  const [serverMsg, setServerMsg] = useState("");
  const { t } = useTranslation();
  const title = t("signup.title");
  const subtitle = t("signup.subtitle");
  const authText = t("signup.alreadyRegistered");
  const linkText = t("signup.signIn");

  return (
    <ModalBox isModalOpen={isSignupOpen} toggleModal={toggleSignup}>
      <Content>
        <BtnClose onClose={toggleSignup} />
        <Title title={title} subtitle={subtitle} />
        <FormSignup setServerMsg={setServerMsg} />
        <ServerInfo serverMsg={serverMsg} />
        <LinkAuth authText={authText} href="/signup" linkText={linkText} />
      </Content>
    </ModalBox>
  );
};

export default Signup;
