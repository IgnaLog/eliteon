import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledTitle = styled.h2`
  font-family: cerebri, sans-serif;
  font-size: 3rem;
  letter-spacing: -0.2px;
  line-height: 3.4rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const StyledSubTitle = styled.p`
  font-family: cerebri, sans-serif;
  font-size: 1.3rem;
  letter-spacing: -0.2px;
  text-align: left;
  margin-bottom: 2rem;
  color: var(--txt-span);
`;

const Title = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledTitle>{t("register.title")}</StyledTitle>
      <StyledSubTitle>{t("register.subTitle")}</StyledSubTitle>
    </>
  );
};
export default Title;
