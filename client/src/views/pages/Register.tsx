import { useState, ChangeEvent, useRef, MouseEvent } from "react";
import * as Yup from "yup";
import { registerRequest } from "../../api/authService";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import styled from "styled-components";
import { LuEyeOff, LuEye, LuX } from "react-icons/lu";
import { Trans, useTranslation } from "react-i18next";
import zxcvbn from "zxcvbn";
import SecurityPwd from "../components/securityPwd/SecurityPwd";
import ValidateEmail from "../components/register/InputEmail/validateEmail/ValidateEmail";
import isEmailValidator from "validator/lib/isEmail";

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
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-family: cerebri, sans-serif;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: -0.1px;
  color: rgba(242, 241, 243, 1);
`;

const StyledInput = styled(Field)<{ valid: boolean }>`
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
    border-width: 2px !important;
    outline: none;
  }

  &::placeholder {
    color: rgb(127, 119, 131);
    font-family: Cerebri Regular, "sans-serif";
  }
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

const StyledPwdSpinner = styled.img`
  width: 5%;
  height: 5%;
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

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isPwdEvaluating, setIsPwdEvaluating] = useState(false);
  const [isEmailEvaluating, setIsEmailEvaluating] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [previousErrors, setPreviousErrors] = useState<Partial<FormValues>>({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPwdValid, setIsPwdValid] = useState(true);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const timeoutEmailRef = useRef<number | undefined>(undefined);
  const timeoutPwdRef = useRef<number | undefined>(undefined);

  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .required("*Introduce un correo electrónico válido.")
      .test(
        "is-valid",
        () => `*Introduce un correo electrónico válido.`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new Yup.ValidationError(t("register.yupEmail"))
      ),
    password: Yup.string()
      .required("")
      .min(8, "*Las contraseñas deben tener al menos 8 caracteres.")
      .matches(
        /^[\x00-\x7F]*$/,
        "La contraseña solo puede contener caracteres ASCII"
      ),
  });

  const initialValues: FormValues = {
    email: "",
    password: "",
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

  const handleFocusEmailField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentField("email");
    inputEmailRef.current?.focus();
  };

  const handleFocusPwdField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentField("password");
    inputPwdRef.current?.focus();
  };

  const handleBlurEmailField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentField("");
  };

  const handleBlurPwdField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentField("");
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
      setSubmitting(true);
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

  const validate = async (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    const validateEmail = async () => {
      try {
        await signUpSchema.validate(
          { email: values.email },
          { abortEarly: false }
        );
      } catch (error: any) {
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path === "email") {
            errors.email = err.message;
            setPreviousErrors((prev) => ({ ...prev, email: err.message }));
            setIsEmailValid(false);
          }
          if (err.path === "password") {
            errors.password = previousErrors.password;
          }
        });
      } finally {
        if (!errors.email) {
          setIsEmailValid(true);
          errors.email =
            "Tendrás que verificar que eres el propietario de esta cuenta de correo electrónico.";
          setPreviousErrors((prev) => ({ ...prev, email: errors.email }));
        }
      }
    };
    const validatePassword = async () => {
      const scoreVal = zxcvbn(values.password).score;
      setScore(scoreVal);
      try {
        await signUpSchema.validate(
          { password: values.password },
          { abortEarly: false }
        );
      } catch (error: any) {
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path === "password") {
            errors.password = err.message;
            setPreviousErrors((prev) => ({ ...prev, password: err.message }));
            setScore(0);
            setIsPwdValid(false);
          }
          if (err.path === "email") {
            errors.email = previousErrors.email;
          }
        });
      } finally {
        if (!errors.password) {
          scoreVal < 2 ? setIsPwdValid(false) : setIsPwdValid(true);
          switch (scoreVal) {
            case 0:
              errors.password =
                "*Los patrones del teclado son fáciles de adivinar.";
              break;
            case 1:
              errors.password =
                "*Esta es una contraseña muy común. Añade más palabras o caracteres.";
              break;
            case 2:
              errors.password =
                "*Tu contraseña es vulnerable, por tu seguridad, te recomendamos mejorarla.";
              break;
            case 3:
              errors.password =
                "Esa contraseña es buena, pero puedes hacerla aún mejor.";
              break;
            case 4:
              errors.password =
                "¡Estupenda contraseña! Úsala solo aquí para ayudar a proteger tu cuenta.";
              break;
            default:
              errors.password =
                "Error de validación. Prueba con otra contraseña.";
              break;
          }
          setPreviousErrors((prev) => ({ ...prev, password: errors.password }));
        }
      }
    };

    if (currentField === "email") {
      setIsEmailEvaluating(true);
      clearTimeout(timeoutEmailRef.current);
      await new Promise<void>((resolve) => {
        timeoutEmailRef.current = setTimeout(async () => {
          await validateEmail();
          setIsEmailEvaluating(false);
          resolve();
        }, 400);
      });
    }
    if (currentField === "password") {
      setIsPwdEvaluating(true);
      setScore(null);
      clearTimeout(timeoutPwdRef.current);
      await new Promise<void>((resolve) => {
        timeoutPwdRef.current = setTimeout(async () => {
          await validatePassword();
          setIsPwdEvaluating(false);
          resolve();
        }, 400);
      });
    }
    return errors;
  };

  const disableSubmitButton = (
    isSubmitting: boolean,
    email: string,
    pwd: string
  ): boolean => {
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
    <StyledSection>
      <StyledTitle>{t("register.title")}</StyledTitle>
      <StyledSubTitle>{t("register.subTitle")}</StyledSubTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
        initialTouched={{ email: true, password: true }}
      >
        {({ values, isSubmitting, handleChange, setFieldValue }) => (
          <StyledForm>
            <div style={{ marginBottom: "5px", textAlign: "left" }}>
              {/* EMAIL */}
              <StyledWrapper>
                <StyledLabel>
                  {t("register.email")}
                  {isEmailEvaluating ? (
                    <StyledPwdSpinner
                      src="/images/spinner-light.svg"
                      alt="Loading"
                    />
                  ) : (
                    values.email !== "" && (
                      <ValidateEmail valid={isEmailValid} />
                    )
                  )}
                </StyledLabel>
                <StyledInputWrapper>
                  <StyledInput
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={customHandleChange(handleChange)}
                    onBlur={handleBlurEmailField}
                    onFocus={handleFocusEmailField}
                    placeholder={t("register.emailPlaceholder")}
                    innerRef={inputEmailRef}
                    valid={isEmailValid ? 1 : 0}
                  />
                  <StyledSideButton
                    show={values.email !== "" ? 1 : 0}
                    onClick={() => handleClearEmail(setFieldValue)}
                    onMouseDown={handleFocusEmailField}
                  >
                    <LuX size={18} />
                  </StyledSideButton>
                </StyledInputWrapper>
                <StyledErrorMessage
                  valid={isEmailValid ? 1 : 0}
                  name="email"
                  component="p"
                />
              </StyledWrapper>

              {/* PASSWORD */}
              <StyledWrapper>
                <StyledLabel>
                  {t("register.password")}

                  {isPwdEvaluating ? (
                    <StyledPwdSpinner
                      src="/images/spinner-light.svg"
                      alt="Loading"
                    />
                  ) : (
                    score !== null &&
                    values.password !== "" && <SecurityPwd score={score} />
                  )}
                </StyledLabel>
                <StyledInputWrapper>
                  <StyledInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    innerRef={inputPwdRef}
                    value={values.password}
                    onChange={customHandleChange(handleChange)}
                    onBlur={handleBlurPwdField}
                    autoComplete="off"
                    onFocus={handleFocusPwdField}
                    placeholder={t("register.passwordPlaceholder")}
                    valid={isPwdValid ? 1 : 0}
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

                <StyledErrorMessage
                  name="password"
                  valid={isPwdValid ? 1 : 0}
                  component="p"
                />
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
            <StyledButton
              type="submit"
              disabled={disableSubmitButton(
                isSubmitting,
                values.email,
                values.password
              )}
            >
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
