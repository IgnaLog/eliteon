import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FormikErrors } from "formik";

const Button = styled.button`
  padding: 1rem 1.8rem;
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

const ContentButton = styled.div<{ show: any }>`
  display: flex;
  justify-content: center;
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

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  isSubmitting: boolean;
  errors: FormikErrors<FormValues>;
  email: string;
  pwd: string;
};

const ButtonSubmit = ({ isSubmitting, errors, email, pwd }: Props) => {
  const { t } = useTranslation();
  const disableSubmitButton = (): boolean => {
    return isSubmitting || !email || !pwd || errors.email || errors.password
      ? true
      : false;
  };
  return (
    <Button type="submit" disabled={disableSubmitButton()}>
      {isSubmitting && (
        <LoadingSpinner src="/images/spinner-light.svg" alt="Loading" />
      )}
      <ContentButton show={!isSubmitting ? 1 : 0}>
        {t("login.submit")}
      </ContentButton>
    </Button>
  );
};
export default ButtonSubmit;
