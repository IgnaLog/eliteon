import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ErrorMessage, Field } from "formik";
import { LuEyeOff, LuEye } from "react-icons/lu";
import SecurityPwd from "./securityPwd/SecurityPwd";

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

const Spinner = styled.img`
  width: 4.5%;
  height: 4.5%;
  user-select: none;
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

const StyledErrorMessage = styled(ErrorMessage)<{ valid: number }>`
  margin: 0.25rem 0px 0px;
  padding: 0.2rem 0px;
  text-align: right;
  color: ${({ valid }) => {
    if (valid) {
      return "rgb(127, 119, 131)";
    } else {
      return "rgb(250, 130, 106)";
    }
  }};
  font-family: Cerebri Regular, sans-serif;
  font-size: 1.4rem;
  letter-spacing: -0.01rem;
`;

type Props = {
  value: string;
  score: number | null;
  isPwdValid: boolean;
  isPwdEvaluating: boolean;
  showPassword: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: MouseEvent<HTMLInputElement>) => void;
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
};

const InputPwd = ({
  value,
  score,
  isPwdValid,
  isPwdEvaluating,
  showPassword,
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
        {t("register.password")}

        {isPwdEvaluating ? (
          <Spinner src="/images/spinner-light.svg" alt="Loading" />
        ) : (
          score !== null && value !== "" && <SecurityPwd score={score} />
        )}
      </Label>
      <InputWrapper>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={value}
          innerRef={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete="off"
          placeholder={t("register.passwordPlaceholder")}
          valid={isPwdValid ? 1 : 0}
        />
        <SideButton
          show={value !== "" ? 1 : 0}
          onClick={handleClick}
          onMouseDown={handleFocus}
        >
          {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
        </SideButton>
      </InputWrapper>

      <StyledErrorMessage
        name="password"
        valid={isPwdValid ? 1 : 0}
        component="p"
      />
    </Wrapper>
  );
};
export default InputPwd;
