import styled from "styled-components";
import { LuX } from "react-icons/lu";
import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";
import { ChangeEvent, MouseEvent } from "react";

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
  border-color: ${({ valid }) => {
    if (valid) {
      return "var(--border-input)";
    } else {
      return "var(--border-error)";
    }
  }};
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
    border-color: ${({ valid }) => {
      if (valid) {
        return "var(--border-input-hover)";
      } else {
        return "var(--border-error-hover)";
      }
    }};
    transition: none 0s ease 0s;
  }

  &:focus {
    border-color: ${({ valid }) => {
      if (valid) {
        return "var(--border-input-focus)";
      } else {
        return "var(--border-error)";
      }
    }};
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

const SideButton = styled.div<{ show: any }>`
  height: 70%;
  display: ${({ show }) => (show ? "flex" : "none")};
  padding: 1.4rem 0.8rem;
  position: absolute;
  right: 1.5%;
  top: 16%;
  align-items: center;
  cursor: pointer;

  &:hover,
  &:active {
    background: var(--bg-btn-txt-hover);
    border-radius: 8px;
  }

  &:active {
    background: var(--bg-btn-txt-active);
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
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
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
        <SideButton
          show={value !== "" ? 1 : 0}
          onClick={handleClick}
          onMouseDown={handleFocus}
        >
          <LuX size={18} />
        </SideButton>
      </InputWrapper>
      <StyledErrorMessage name="email" component="p" />
    </Wrapper>
  );
};

export default InputEmail;
