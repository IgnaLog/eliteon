import { useState, ChangeEvent } from "react";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { loginRequest } from "../../api/authService";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { css, styled } from "styled-components";
import { LuEyeOff, LuEye, LuX } from "react-icons/lu";
import spinnerSvg from "../../images/spinner-light.svg";

const StyledSection = styled.section`
  max-width: 42.8rem;
  text-align: center;
  padding: 2.4rem;
  border-radius: 10px;
  background-color: rgb(30, 27, 30);

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

const StyledTitle = styled.h2`
  font-family: cerebri, sans-serif;
  font-size: 3rem;
  letter-spacing: -0.2px;
  line-height: 3.4rem;
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
  padding: 1.4rem 3.6rem 1.4rem 1.6rem;
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
  height: 100%;
  padding: 1.4rem 0.8rem;
  position: absolute;
  right: 0px;
  top: 0px;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  color: rgb(255, 255, 255);
  cursor: pointer;
  user-select: none;
  display: ${({ show }) => (show ? "flex" : "none")};
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

const signinSchema = Yup.object().shape({
  username: Yup.string().required("").min(3, "Must be at least 3 characters"),
  password: Yup.string().required("").min(5, "Must be at least 5 characters"),
});

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // It is used to get the previous location of the web page from which the login page is accessed. If either of the "state" or "from" properties does not exist, the default value "/" is returned.

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const togglePasswordVisibility = () => () => {
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
      setServerMsg("");
      const response = await loginRequest(values);
      const accessToken = response?.data?.accessToken;
      setAuth({ user: values.username, accessToken });
      resetForm();
      navigate(from, { replace: true }); // The first argument of the navigate function is the location to which you want to redirect the user. "replace: true" is an options object used to replace the current entry in the browser history instead of adding a new entry. This means that if the user clicks the "Back" button in the browser, they will not return to the login page, but instead return to the page before the login page.
    } catch (err: any) {
      if (!err?.response) {
        setServerMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setServerMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setServerMsg("Unauthorized");
        resetForm();
      } else {
        setServerMsg("Login Failed");
        resetForm({
          values: {
            ...values,
            username: "",
          },
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <StyledSection>
      <StyledTitle>Ingresar a Eliteon</StyledTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={signinSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <StyledForm>
            {/* USERNAME */}
            <div style={{ marginBottom: "5px", textAlign: "left" }}>
              <StyledWrapper>
                <StyledLabel>Email</StyledLabel>
                <StyledInputWrapper>
                  <StyledInput
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={customHandleChange(handleChange)}
                    placeholder="you@ejemplo.com"
                    error={errors.username && touched.username ? 1 : 0}
                  />
                  <StyledSideButton
                    show={values.username !== "" ? 1 : 0}
                    onClick={() => setFieldValue("username", "")}
                  >
                    <LuX size={18} />
                  </StyledSideButton>
                </StyledInputWrapper>
                <StyledErrorMessage name="username" component="p" />
              </StyledWrapper>

              {/* PASSWORD */}
              <StyledWrapper>
                <StyledLabel>Contraseña</StyledLabel>
                <StyledInputWrapper>
                  <StyledInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={customHandleChange(handleChange)}
                    placeholder="Contraseña"
                    autoComplete="off"
                    error={errors.password && touched.password ? 1 : 0}
                  />
                  <StyledSideButton
                    show={values.password !== "" ? 1 : 0}
                    onClick={togglePasswordVisibility()}
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
            <div style={{ marginBottom: "1.8rem" }}>
              <span>
                <span>
                  By continuing you agree to Eliteon's{" "}
                  <a href="/">Terms of Service</a>, including{" "}
                  <a href="/">Additional Terms</a>, and{" "}
                  <a href="/">Privacy Policy</a>.
                </span>
              </span>
            </div>

            {/* BUTTON SUBMITTING */}
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <LoadingSpinner src={spinnerSvg} alt="Loading" />
              )}
              <StyledContentButton show={!isSubmitting ? 1 : 0}>
                Iniciar sesión
              </StyledContentButton>
            </StyledButton>
          </StyledForm>
        )}
      </Formik>

      {/* SERVER INFO */}
      {serverMsg && (
        <p style={{ paddingTop: "10px", color: "rgb(255, 7, 97)" }}>
          {serverMsg}
        </p>
      )}

      {/* FORGOT PWD AND REGISTRATION */}
      <div style={{ marginTop: "25px" }}>
        <a>Olvidó su contraseña?</a>
      </div>
      <div style={{ marginTop: "15px" }}>
        <span>No tienes una cuenta?</span>
        <a href="/register"> Regístrate</a>
      </div>
    </StyledSection>
  );
};

export default Login;
