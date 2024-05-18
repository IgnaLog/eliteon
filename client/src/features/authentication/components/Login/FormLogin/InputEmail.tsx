import styled from "styled-components";
import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";
import { ChangeEvent, MouseEvent } from "react";
import BtnSideClose from "../../BtnSideClose";

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
  color: var(--txt-input);
  background: var(--bg-input);
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

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 0.25rem 0px 0px;
  padding: 0.2rem 0px;
  text-align: right;
  color: var(--txt-error);
  font-family:
    Cerebri Regular,
    sans-serif;
  font-size: 1.4rem;
  letter-spacing: -0.01rem;
`;

type Props = {
  value: string;
  error: number;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
};

const InputEmail = ({
  value,
  error,
  inputRef,
  handleChange,
  handleFocus,
  handleClick,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Label>{t("login.email")}</Label>
      <InputWrapper>
        <Input
          type="text"
          id="email"
          name="email"
          value={value}
          innerRef={inputRef}
          onChange={handleChange}
          placeholder={t("login.emailPlaceholder")}
          valid={!error ? 1 : 0}
        />
        <BtnSideClose
          value={value}
          handleClick={handleClick}
          handleFocus={handleFocus}
        />
      </InputWrapper>
      <StyledErrorMessage name="email" component="p" />
    </Wrapper>
  );
};

export default InputEmail;
