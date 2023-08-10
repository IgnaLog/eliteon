import { useTranslation, Trans } from "react-i18next";

const HaveAnAccount = () => {
  const { t } = useTranslation();
  return (
    <div style={{ marginTop: "15px" }}>
      <Trans
        t={t}
        i18nKey="login.noAccount"
        components={{ a: <a />, span: <span /> }}
      >
        <span>Don't have an account?</span>
        <a href="/register"> Sign up</a>
      </Trans>
    </div>
  );
};

export default HaveAnAccount;
