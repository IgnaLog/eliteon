import { Trans, useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
      <span>
        <Trans t={t} i18nKey="register.terms" components={{ a: <a /> }}>
          By creating an account, you agree to Eliteon's{" "}
          <a href="/terms-of-service">Terms of Service</a>, including the{" "}
          <a href="/additional-terms">Additional Terms</a> and{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </Trans>
      </span>
    </div>
  );
};
export default Terms;
