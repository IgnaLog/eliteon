import styled from "styled-components";
import { LuEyeOff, LuEye } from "react-icons/lu";
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
  font-family: cerebri, sans-serif;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: -0.1px;
  color: rgba(242, 241, 243, 1);
`;

const InputWrapper = styled.div`
  position: relative;
  transition: max-height 0.4s ease-out 0s, opacity 0.8s ease 0s;
`;

const Input = styled(Field)<{ valid: boolean }>`
  width: 100%;
  padding: 1.4rem 4.2rem 1.4rem 1.6rem;
  border: 1px solid;
  border-color: ${({ valid }) => {
    if (valid) {
      return "rgb(63, 59, 69)";
    } else {
      return "rgb(250, 130, 106)";
    }
  }};
  line-height: 2rem;
  color: rgb(242, 241, 243);
  background: rgb(32, 30, 35);
  border-radius: 8px;
  letter-spacing: -0.01rem;
  font-family: cerebri, "sans-serif";
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    border-color: ${({ valid }) => {
      if (valid) {
        return "rgb(129, 122, 138)";
      } else {
        return "rgb(250, 130, 106)";
      }
    }};
    transition: none 0s ease 0s;
  }

  &:focus {
    border-color: ${({ valid }) => {
      if (valid) {
        return "rgb(129, 122, 138)";
      } else {
        return "rgb(250, 130, 106)";
      }
    }};
    border-width: 2px;
    outline: none;
  }

  &::placeholder {
    color: rgb(127, 119, 131);
    font-family: Cerebri Regular, "sans-serif";
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
    background: #46464636;
    border-radius: 8px;
  }

  &:active {
    background: #4646461a;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 0.25rem 0px 0px;
  padding: 0.2rem 0px;
  text-align: right;
  color: rgb(250, 130, 106);
  font-family: Cerebri Regular, sans-serif;
  font-size: 1.4rem;
  letter-spacing: -0.01rem;
  line-height: 1.8rem;
`;

type Props = {
  value: string;
  error: number;
  showPassword: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
};

const InputPwd = ({
  value,
  error,
  showPassword,
  inputRef,
  handleChange,
  handleFocus,
  handleClick,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Label>{t("login.password")}</Label>
      <InputWrapper>
        <Input
          type="password"
          id="password"
          name="password"
          value={value}
          innerRef={inputRef}
          onChange={handleChange}
          placeholder={t("login.passwordPlaceholder")}
          valid={!error}
        />
        <SideButton
          show={value !== "" ? 1 : 0}
          onClick={handleClick}
          onMouseDown={handleFocus}
        >
          {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
        </SideButton>
      </InputWrapper>
      <StyledErrorMessage name="password" component="p" />
    </Wrapper>
  );
};

export default InputPwd;
