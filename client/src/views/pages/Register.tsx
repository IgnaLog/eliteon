import { useState, ChangeEvent, useRef, MouseEvent } from "react";
import * as Yup from "yup";
import { registerRequest } from "../../api/authService";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";
import { LuEyeOff, LuEye, LuX } from "react-icons/lu";
import { Trans, useTranslation } from "react-i18next";

const StyledSection = styled.section`
  max-width: 42.8rem;
  text-align: center;
  padding: 3rem;
  border-radius: 10px;
  background-color: rgb(30, 27, 30);

  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1rem;
    letter-spacing: -0.1px;
    color: white;
  }

  span {
    color: rgb(173, 174, 181);
  }

  a,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    cursor: pointer;
  }
`;

const StyledTitle = styled.h2`
  font-family: cerebri, sans-serif;
  font-size: 3rem;
  letter-spacing: -0.2px;
  line-height: 3.4rem;
`;

const StyledSubTitle = styled.p`
  font-family: cerebri, sans-serif;
  font-size: 1.3rem;
  letter-spacing: -0.2px;
  text-align: left;
  color: rgb(173, 174, 181);
  margin-bottom: 3rem;
`;

const StyledRegistered = styled.div`
  margin-top: 25px;
  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1.4rem;
    letter-spacing: -0.1px;
    color: white;
  }

  span {
    color: rgb(173, 174, 181);
  }

  a,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    cursor: pointer;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 15px 0px 10px;
`;

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

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  font-family: cerebri, sans-serif;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: -0.1px;
  color: rgba(242, 241, 243, 1);
  margin-bottom: 8px;
`;

const StyledInput = styled(Field)`
  width: 100%;
  padding: 1.4rem 4.2rem 1.4rem 1.6rem;
  border: 1px solid rgb(63, 59, 69);
  line-height: 2rem;
  color: rgb(242, 241, 243);
  background: rgb(32, 30, 35);
  border-radius: 8px;
  letter-spacing: -0.01rem;
  font-family: cerebri, "sans-serif";
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    border-color: rgb(129, 122, 138);
    transition: none 0s ease 0s;
  }

  &:focus {
    /* outline-color: rgb(242, 241, 243); */
    border-color: rgb(242, 241, 243) !important;
    border-width: 2px !important;
    outline: none;
  }

  &::placeholder {
    color: rgb(127, 119, 131);
    font-family: Cerebri Regular, "sans-serif";
  }

  /* Estilos cuando hay un error */
  ${(props) =>
    props.error &&
    css`
      border-color: rgb(250, 130, 106) !important;
    `}
`;

const StyledInputWrapper = styled.div`
  position: relative;
  transition: max-height 0.4s ease-out 0s, opacity 0.8s ease 0s;
`;

const StyledSideButton = styled.div<{ show: any }>`
  height: 70%;
  padding: 1.4rem 0.8rem;
  position: absolute;
  right: 1.5%;
  top: 16%;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  color: rgb(255, 255, 255);
  cursor: pointer;
  user-select: none;
  display: ${({ show }) => (show ? "flex" : "none")};

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
  -webkit-box-pack: end;
  justify-content: flex-end;
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

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);

  const signupSchema = Yup.object().shape({
    email: Yup.string().required("").email(t("register.yupEmail")),
    password: Yup.string().required("").min(8, t("register.yupPassword")),
  });

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleFocusEmailField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputEmailRef.current?.focus();
  };

  const handleFocusPwdField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputPwdRef.current?.focus();
  };

  const handleClearEmail = (setFieldValue: any) => {
    setFieldValue("email", "");
    inputEmailRef.current?.focus();
  };

  const handleEyeClick = () => {
    togglePasswordVisibility();
    inputPwdRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Overriding formik's handleChange function
  const customHandleChange =
    (handleChangeFn: (e: ChangeEvent<any>) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeFn(e);
      setServerMsg("");
    };

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await registerRequest(values);
      resetForm();
    } catch (err: any) {
      if (!err?.response) {
        setServerMsg(t("register.serverMsgNoResponse"));
      } else if (err.response?.status === 409) {
        setServerMsg(t("register.serverMsgEmailExists"));
        resetForm({
          values: {
            ...values,
            email: "",
          },
        });
      } else {
        setServerMsg(t("register.serverMsgRegistrationFailed"));
        resetForm({
          values: {
            ...values,
            password: "",
          },
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <StyledSection>
      <StyledTitle>{t("register.title")}</StyledTitle>
      <StyledSubTitle>{t("register.subTitle")}</StyledSubTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          setFieldValue,
        }) => (
          <StyledForm>
            <div style={{ marginBottom: "5px", textAlign: "left" }}>
              {/* EMAIL */}
              <StyledWrapper>
                <StyledLabel>{t("register.email")}</StyledLabel>
                <StyledInputWrapper>
                  <StyledInput
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={customHandleChange(handleChange)}
                    placeholder={t("register.emailPlaceholder")}
                    innerRef={inputEmailRef}
                  />
                  <StyledSideButton
                    show={values.email !== "" ? 1 : 0}
                    onClick={() => handleClearEmail(setFieldValue)}
                    onMouseDown={handleFocusEmailField}
                  >
                    <LuX size={18} />
                  </StyledSideButton>
                </StyledInputWrapper>
                <StyledErrorMessage name="email" component="p" />
              </StyledWrapper>

              {/* PASSWORD */}
              <StyledWrapper>
                <StyledLabel>{t("register.password")}</StyledLabel>
                <StyledInputWrapper></StyledInputWrapper>
                <StyledInputWrapper>
                  <StyledInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    innerRef={inputPwdRef}
                    value={values.password}
                    onChange={customHandleChange(handleChange)}
                    autoComplete="off"
                    placeholder={t("register.passwordPlaceholder")}
                    error={errors.password && touched.password ? 1 : 0}
                  />
                  <StyledSideButton
                    show={values.password !== "" ? 1 : 0}
                    onClick={handleEyeClick}
                    onMouseDown={handleFocusPwdField}
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </StyledSideButton>
                </StyledInputWrapper>
                <StyledErrorMessage name="password" component="p" />
              </StyledWrapper>
            </div>

            {/* TERMS AND CONDITIONS */}
            <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
              <span>
                <Trans t={t} i18nKey="register.terms" components={{ a: <a /> }}>
                  By creating an account, you agree to Eliteon's{" "}
                  <a href="/terms-of-service">Terms of Service</a>, including
                  the <a href="/additional-terms">Additional Terms</a> and{" "}
                  <a href="/privacy-policy">Privacy Policy</a>.
                </Trans>
              </span>
            </div>

            {/* BUTTON SUBMITTING */}
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <LoadingSpinner src="/images/spinner-light.svg" alt="Loading" />
              )}
              <StyledContentButton show={!isSubmitting ? 1 : 0}>
                {t("register.submit")}
              </StyledContentButton>
            </StyledButton>
            {/* FINAL FORM */}
          </StyledForm>
        )}
      </Formik>

      {/* SERVER INFO */}
      {serverMsg && (
        <p style={{ paddingTop: "10px", color: "rgb(255, 7, 97)" }}>
          {serverMsg}
        </p>
      )}

      <StyledRegistered>
        <Trans
          t={t}
          i18nKey="register.alreadyRegistered"
          components={{ a: <a />, span: <span /> }}
        >
          <span>Already registered?</span>
          <a href="/login"> Sign in</a>
        </Trans>
      </StyledRegistered>
    </StyledSection>
  );
};

export default Register;
