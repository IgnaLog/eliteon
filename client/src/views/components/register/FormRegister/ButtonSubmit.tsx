import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledButton = styled.button`
  position: relative;
  padding: 1rem 1.8rem;
  border: 0.1rem solid rgb(69, 255, 255);
  border-radius: 0.6rem;
  cursor: pointer;
  background-color: rgb(69, 255, 255);
  color: rgb(16, 16, 16);
  font-family: Cerebri, sans-serif;
  font-size: 1.7rem;
  letter-spacing: -0.01rem;
  line-height: 2.2rem;
  transition: border-color 216ms ease-in-out 0s,
    background-color 216ms ease-in-out 0s, transform 0.15s ease-in-out 0s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledContentButton = styled.div<{ show: any }>`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const LoadingSpinner = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  max-width: 40px;
  padding: 0.8rem;
  position: absolute;
  margin: 0px auto;
  inset: 0px;
  box-sizing: border-box;
  pointer-events: none;
  animation: 864ms linear 0s infinite normal none running spin;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type Props = {
  isSubmitting: boolean;
  isEmailEvaluating: boolean;
  isPwdEvaluating: boolean;
  isEmailValid: boolean;
  isPwdValid: boolean;
  email: string;
  pwd: string;
};

const ButtonSubmit = ({
  isSubmitting,
  isEmailEvaluating,
  isPwdEvaluating,
  isEmailValid,
  isPwdValid,
  email,
  pwd,
}: Props) => {
  const { t } = useTranslation();
  const disableSubmitButton = (): boolean => {
    return isSubmitting ||
      isEmailEvaluating ||
      isPwdEvaluating ||
      !email ||
      !pwd
      ? true
      : isEmailValid && isPwdValid
      ? false
      : true;
  };
  return (
    <StyledButton type="submit" disabled={disableSubmitButton()}>
      {isSubmitting && (
        <LoadingSpinner src="/images/spinner-light.svg" alt="Loading" />
      )}
      <StyledContentButton show={!isSubmitting ? 1 : 0}>
        {t("register.submit")}
      </StyledContentButton>
    </StyledButton>
  );
};

export default ButtonSubmit;
