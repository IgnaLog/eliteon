import { useTranslation } from "react-i18next";

export function scoreValErrors(scoreVal: number): string {
  const { t } = useTranslation();
  switch (scoreVal) {
    case 0:
      return t("signup.scoreVal0");
    case 1:
      return t("signup.scoreVal1");
    case 2:
      return t("signup.scoreVal2");
    case 3:
      return t("signup.scoreVal3");
    case 4:
      return t("signup.scoreVal4");
    default:
      return t("signup.scoreValDefault");
  }
}
