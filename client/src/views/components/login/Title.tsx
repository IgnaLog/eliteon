import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledTitle = styled.h2`
  font-family: cerebri, sans-serif;
  font-size: 3rem;
  letter-spacing: -0.2px;
  line-height: 3.4rem;
`;

const Title = () => {
  const { t } = useTranslation();
  return <StyledTitle>{t("login.title")}</StyledTitle>;
};
export default Title;
