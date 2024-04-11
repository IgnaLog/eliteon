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
// import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import styled from "styled-components";
import InputEmail from "./InputEmail";
import InputPwd from "./InputPwd";
import Terms from "./Terms";
import ButtonSubmit from "./ButtonSubmit";
import { useAuthStore } from "../../../../store/authStore";
import { loginRequest } from "../../../../api/authService";

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

const Login = ({ setServerMsg }: Props) => {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // It is used to get the previous location of the web page from which the login page is accessed. If either of the "state" or "from" properties does not exist, the default value "/" is returned.

  // const signinSchema = Yup.object().shape({
  //   email: Yup.string().required("").min(3, t("login.yupEmail")),
  //   password: Yup.string().required("").min(8, t("login.yupPassword")),
  // });

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
    inputEmailRef.current?.focus();
  };

  const handleFocusPwdField = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputPwdRef.current?.focus();
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
      navigate(from, { replace: true }); // The first argument of the navigate function is the location to which you want to redirect the user. "replace: true" is an options object used to replace the current entry in the browser history instead of adding a new entry. This means that if the user clicks the "Back" button in the browser, they will not return to the login page, but instead return to the page before the login page.
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
      <Formik
        initialValues={initialValues}
        // validationSchema={signinSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, handleChange, errors, setFieldValue }) => (
          <StyledForm>
            <div style={{ marginBottom: "5px", textAlign: "left" }}>
              <InputEmail
                value={values.email}
                error={errors.email ? 1 : 0}
                inputRef={inputEmailRef}
                handleChange={customHandleChange(handleChange)}
                handleFocus={handleFocusEmailField}
                handleClick={handleClearEmail(setFieldValue)}
              />

              <InputPwd
                value={values.password}
                error={errors.password ? 1 : 0}
                showPassword={showPassword}
                inputRef={inputPwdRef}
                handleChange={customHandleChange(handleChange)}
                handleFocus={handleFocusPwdField}
                handleClick={handleEyeClick()}
              />
            </div>

            <Terms />

            <ButtonSubmit
              isSubmitting={isSubmitting}
              errors={errors}
              email={values.email}
              pwd={values.password}
            />
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default Login;
