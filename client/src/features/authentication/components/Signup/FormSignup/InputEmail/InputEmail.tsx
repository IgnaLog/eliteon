import { ChangeEvent, MouseEvent } from "react";
import styled, { keyframes } from "styled-components";
import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";
import { CgSpinner } from "react-icons/cg";
import ValidateEmail from "./ValidateEmail/ValidateEmail";
import BtnSideClose from "../../../BtnSideClose";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-family: Cerebri, sans-serif;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: -0.1px;
  color: var(--txt-label);
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(CgSpinner)`
  width: 4.5%;
  height: 4.5%;
  user-select: none;
  pointer-events: none;
  animation: ${spinAnimation} 864ms linear 0s infinite normal none running;
  color: var(--txt-spinner);
`;

const InputWrapper = styled.div`
  position: relative;
  transition:
    max-height 0.4s ease-out 0s,
    opacity 0.8s ease 0s;
`;

const Input = styled(Field)<{ valid: boolean }>`
  width: 100%;
  padding: 1.4rem 4.2rem 1.4rem 1.6rem;
  border: 1px solid;
  border-color: ${({ valid }) =>
    valid ? "var(--border-input)" : "var(--border-error)"};
  line-height: 2rem;
  line-height: 2rem;
  color: var(--txt-input);
  background: var(--bg-input);
  border-radius: 8px;
  border-radius: 8px;
  letter-spacing: -0.01rem;
  font-family: Cerebri, "sans-serif";
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    border-color: ${({ valid }) =>
      valid ? "var(--border-input-hover)" : "var(--border-error-hover)"};
    transition: none 0s ease 0s;
  }

  &:focus {
    border-color: ${({ valid }) =>
      valid ? "var(--border-input-focus)" : "var(--border-error)"};
    border-width: 2px;
    outline: none;
  }

  &::placeholder {
    color: var(--txt-placeholder);
    font-family:
      Cerebri Regular,
      "sans-serif";
  }
`;

const StyledErrorMessage = styled(ErrorMessage)<{ valid: number }>`
  margin: 0.25rem 0px 0px;
  padding: 0.2rem 0px;
  text-align: right;
  color: ${({ valid }) =>
    valid ? "var(--border-input-hover)" : "var(--txt-error)"};
  font-family:
    Cerebri Regular,
    sans-serif;
  font-size: 1.4rem;
  letter-spacing: -0.01rem;
`;

type Props = {
  value: string;
  isEmailValid: boolean;
  isEmailEvaluating: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: MouseEvent<HTMLInputElement>) => void;
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
};

const InputEmail = ({
  value,
  isEmailValid,
  isEmailEvaluating,
  inputRef,
  handleChange,
  handleBlur,
  handleFocus,
  handleClick,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Label>
        {t("signup.email")}
        {isEmailEvaluating ? (
          <Spinner />
        ) : (
          value !== "" && <ValidateEmail valid={isEmailValid} />
        )}
      </Label>
      <InputWrapper>
        <Input
          type="text"
          id="email"
          name="email"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={t("signup.emailPlaceholder")}
          innerRef={inputRef}
          valid={isEmailValid ? 1 : 0}
        />
        <BtnSideClose
          value={value}
          handleClick={handleClick}
          handleFocus={handleFocus}
        />
      </InputWrapper>
      <StyledErrorMessage
        valid={isEmailValid ? 1 : 0}
        name="email"
        component="p"
      />
    </Wrapper>
  );
};
export default InputEmail;
