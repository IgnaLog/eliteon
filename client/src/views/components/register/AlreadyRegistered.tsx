import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";

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

const AlreadyRegistered = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Trans
        t={t}
        i18nKey="register.alreadyRegistered"
        components={{ a: <a />, span: <span /> }}
      >
        <span>Already registered?</span>
        <a href="/login"> Sign in</a>
      </Trans>
    </Container>
  );
};
export default AlreadyRegistered;
