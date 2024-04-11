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
import isEmailValidator from "validator/lib/isEmail";
import Terms from "./Terms";
import ButtonSubmit from "./ButtonSubmit";
import InputEmail from "./InputEmail/InputEmail";
import InputPwd from "./InputPwd/InputPwd";
import { registerRequest } from "../../../../api/authService";

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

const FormRegister = ({ setServerMsg }: Props) => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEyeClick = () => () => {
    togglePasswordVisibility();
    inputPwdRef.current?.focus();
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
              handleBlur={handleBlurEmailField}
              handleFocus={handleFocusEmailField}
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
              handleBlur={handleBlurPwdField}
              handleFocus={handleFocusPwdField}
              handleClick={handleEyeClick()}
            />
          </div>

          <Terms />

          <ButtonSubmit
            isSubmitting={isSubmitting}
            isEmailEvaluating={isEmailEvaluating}
            isPwdEvaluating={isPwdEvaluating}
            isEmailValid={isEmailValid}
            isPwdValid={isPwdValid}
            email={values.email}
            pwd={values.password}
          />
        </StyledForm>
      )}
    </Formik>
  );
};
export default FormRegister;
