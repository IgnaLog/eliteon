import {
  useState,
  ChangeEvent,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikHelpers } from "formik";
import styled from "styled-components";
import InputEmail from "./InputEmail";
import InputPwd from "./InputPwd";
import { useAuthStore } from "@store/authStore";
import { loginRequest } from "@services/authService";
import Terms from "../../Terms";
import BtnSubmit from "../../BtnSubmit";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 15px 0px 10px;
`;

type Props = {
  setServerMsg: Dispatch<SetStateAction<string>>;
};

type FormValues = {
  email: string;
  password: string;
};

const FormLogin = ({ setServerMsg }: Props) => {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);

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
      field === "email"
        ? inputEmailRef.current?.focus()
        : inputPwdRef.current?.focus();
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
      setServerMsg("");
      const response = await loginRequest(values);
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      setAuth({ user, accessToken });
      resetForm();
    } catch (err: any) {
      if (!err?.response) {
        setServerMsg(t("login.serverMsgNoResponse"));
      } else if (err.response?.status === 400) {
        setServerMsg(t("login.serverMsgInvalid"));
      } else if (err.response?.status === 401) {
        setServerMsg(t("login.serverMsgUnauthorized"));
        resetForm();
      } else {
        setServerMsg(t("login.serverMsgFailed"));
        resetForm({
          values: {
            ...values,
            email: "",
          },
        });
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {
    inputEmailRef.current?.focus();
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, handleChange, errors, setFieldValue }) => (
          <StyledForm>
            <div style={{ marginBottom: "5px", textAlign: "left" }}>
              <InputEmail
                value={values.email}
                error={errors.email ? 1 : 0}
                inputRef={inputEmailRef}
                handleChange={customHandleChange(handleChange)}
                handleFocus={handleFieldFocus("email")}
                handleClick={handleClearEmail(setFieldValue)}
              />

              <InputPwd
                value={values.password}
                error={errors.password ? 1 : 0}
                showPassword={showPassword}
                inputRef={inputPwdRef}
                handleChange={customHandleChange(handleChange)}
                handleFocus={handleFieldFocus("password")}
                handleClick={handleEyeClick()}
              />
            </div>

            <Terms />

            <BtnSubmit
              isSubmitting={isSubmitting}
              text={t("login.submit")}
              disabled={
                isSubmitting ||
                !values.email ||
                !values.password ||
                !!errors.email ||
                !!errors.password
              }
            />
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
