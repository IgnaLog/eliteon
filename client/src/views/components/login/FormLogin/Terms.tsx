import { Trans, useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <span>
        <Trans t={t} i18nKey="login.terms" components={{ a: <a /> }}>
          By continuing you agree to Eliteon's{" "}
          <a href="/terms-of-service">Terms of Service</a>, including{" "}
          <a href="/additional-terms">Additional Terms</a>, and{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </Trans>
      </span>
    </div>
  );
};
export default Terms;
