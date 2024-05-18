import {
  useState,
  ChangeEvent,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import zxcvbn from "zxcvbn";
import Terms from "../../Terms";
import InputEmail from "./InputEmail/InputEmail";
import InputPwd from "./InputPwd/InputPwd";
import { signupRequest } from "@services/authService";
import BtnSubmit from "../../BtnSubmit";
import { scoreValErrors } from "@utils/helpers";
import useSignupSchema from "@schemas/signupSchema";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

type Props = {
  setServerMsg: Dispatch<SetStateAction<string>>;
};

type FormValues = {
  email: string;
  password: string;
};

const FormSignup = ({ setServerMsg }: Props) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isPwdEvaluating, setIsPwdEvaluating] = useState(false);
  const [isEmailEvaluating, setIsEmailEvaluating] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [previousErrors, setPreviousErrors] = useState<Partial<FormValues>>({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPwdValid, setIsPwdValid] = useState(true);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const timeoutEmailRef = useRef<ReturnType<typeof setTimeout>>();
  const timeoutPwdRef = useRef<ReturnType<typeof setTimeout>>();

  const signUpSchema = useSignupSchema();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleEyeClick = () => () => {
    setShowPassword(!showPassword);
    inputPwdRef.current?.focus();
  };

  const handleFieldFocus =
    (field: string) => (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setCurrentField(field);
      field === "email"
        ? inputEmailRef.current?.focus()
        : inputPwdRef.current?.focus();
    };

  const handleFieldBlur = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentField("");
  };

  const handleClearEmail = (setFieldValue: any) => () => {
    setFieldValue("email", "");
    inputEmailRef.current?.focus();
  };

  // Overriding formik's handleChange function
  const customHandleChange =
    (handleChangeFn: (e: ChangeEvent<any>) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeFn(e);
      setServerMsg("");
    };

  const isButtonDisabled = (values: FormValues, isSubmitting: boolean) => {
    return (
      isSubmitting ||
      isEmailEvaluating ||
      isPwdEvaluating ||
      !values.email ||
      !values.password ||
      !isEmailValid ||
      !isPwdValid
    );
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSubmitting(true);
      await signupRequest(values);
      resetForm();
    } catch (err: any) {
      if (!err?.response) {
        setServerMsg(t("signup.serverMsgNoResponse"));
      } else if (err.response?.status === 409) {
        setServerMsg(t("signup.serverMsgEmailExists"));
        resetForm({
          values: {
            ...values,
            email: "",
          },
        });
      } else {
        setServerMsg(t("signup.serverMsgRegistrationFailed"));
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
          errors.email = t("signup.validEmail");
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
          errors.password = scoreValErrors(scoreVal);
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      initialTouched={{ email: true, password: true }}
    >
      {({ values, isSubmitting, handleChange, setFieldValue }) => (
        <StyledForm>
          <div style={{ marginBottom: "5px", textAlign: "left" }}>
            <InputEmail
              value={values.email}
              isEmailValid={isEmailValid}
              isEmailEvaluating={isEmailEvaluating}
              inputRef={inputEmailRef}
              handleChange={customHandleChange(handleChange)}
              handleBlur={handleFieldBlur}
              handleFocus={handleFieldFocus("email")}
              handleClick={handleClearEmail(setFieldValue)}
            />
            <InputPwd
              value={values.password}
              score={score}
              isPwdValid={isPwdValid}
              isPwdEvaluating={isPwdEvaluating}
              showPassword={showPassword}
              inputRef={inputPwdRef}
              handleChange={customHandleChange(handleChange)}
              handleBlur={handleFieldBlur}
              handleFocus={handleFieldFocus("password")}
              handleClick={handleEyeClick()}
            />
          </div>

          <Terms />

          <BtnSubmit
            isSubmitting={isSubmitting}
            text={t("signup.submit")}
            disabled={isButtonDisabled(values, isSubmitting)}
          />
        </StyledForm>
      )}
    </Formik>
  );
};
export default FormSignup;
