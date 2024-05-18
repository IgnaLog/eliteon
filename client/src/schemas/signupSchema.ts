import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import isEmailValidator from "validator/lib/isEmail";

const useSignupSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .required(t("signup.invalidEmail"))
      .test("is-valid", t("signup.invalidEmail"), (value) =>
        isEmailValidator(value)
      ),
    password: Yup.string()
      .required("")
      .min(8, t("signup.passwordMinLength"))
      .matches(/^[\x00-\x7F]*$/, t("signup.passwordAscii")),
  });
};

export default useSignupSchema;
