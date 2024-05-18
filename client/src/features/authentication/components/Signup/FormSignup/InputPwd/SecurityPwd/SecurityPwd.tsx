import { useTranslation } from "react-i18next";
import Indicator from "./Indicator";

type Props = {
  score: number | null;
};

const SecurityPwd = ({ score }: Props) => {
  const { t } = useTranslation();
  const getIndicatorData = (
    score: number
  ): { percentage: number; description: string } => {
    switch (score) {
      case 0:
        return { percentage: 0, description: "" };
      case 1:
        return { percentage: 25, description: "" };
      case 2:
        return { percentage: 50, description: t("signup.weak") };
      case 3:
        return { percentage: 75, description: t("signup.normal") };
      case 4:
        return { percentage: 100, description: t("signup.safe") };
      default:
        return { percentage: 0, description: "" };
    }
  };

  const { percentage, description } = getIndicatorData(score || 0);

  return (
    <Indicator
      percentage={percentage}
      description={description}
      score={score || 0}
    />
  );
};
export default SecurityPwd;
