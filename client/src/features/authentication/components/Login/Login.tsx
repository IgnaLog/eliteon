import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ModalBox from "@components/molecules/ModalBox";
import Title from "../Title";
import FormLogin from "./FormLogin/FormLogin";
import ServerInfo from "../ServerInfo";
import LinkAuth from "../LinkAuth";
import BtnClose from "../BtnClose";

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
  const { t } = useTranslation();
  const title = t("login.title");
  const authText = t("login.noAccount");
  const linkText = t("login.signUp");

  return (
    <ModalBox isModalOpen={isLoginOpen} toggleModal={toggleLogin}>
      <Content>
        <BtnClose onClose={toggleLogin} />
        <Title title={title} />
        <FormLogin setServerMsg={setServerMsg} />
        <ServerInfo serverMsg={serverMsg} />
        <LinkAuth authText={authText} href="/login" linkText={linkText} />
      </Content>
    </ModalBox>
  );
};

export default Login;
