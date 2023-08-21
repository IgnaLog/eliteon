import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";

const Container = styled.div`
  margin-top: 25px;

  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1.4rem;
    letter-spacing: -0.1px;
    color: var(--txt-span);
    text-decoration: none;
  }

  a {
    color: var(--txt-link);
    cursor: pointer;
  }
`;

const HaveAnAccount = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Trans
        t={t}
        i18nKey="login.noAccount"
        components={{ a: <a />, span: <span /> }}
      >
        <span>Don't have an account?</span>
        <a href="/register"> Sign up</a>
      </Trans>
    </Container>
  );
};

export default HaveAnAccount;
