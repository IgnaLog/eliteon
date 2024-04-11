import { useTranslation } from "react-i18next";
import Indicator from "./Indicator";

type Props = {
  score: number | null;
};

const SecurityPwd = ({ score }: Props) => {
  const { t } = useTranslation();
  let percentage: number = 0;
  let description: string = "";
  switch (score) {
    case 0:
      percentage = 0;
      return (
        <Indicator
          percentage={percentage}
          description={description}
          score={score}
        />
      );
    case 1:
      percentage = 25;
      return (
        <Indicator
          percentage={percentage}
          description={description}
          score={score}
        />
      );
    case 2:
      percentage = 50;
      description = t("register.weak");
      return (
        <Indicator
          percentage={percentage}
          description={description}
          score={score}
        />
      );
    case 3:
      percentage = 75;
      description = t("register.normal");
      return (
        <Indicator
          percentage={percentage}
          description={description}
          score={score}
        />
      );
    case 4:
      percentage = 100;
      description = t("register.safe");
      return (
        <Indicator
          percentage={percentage}
          description={description}
          score={score}
        />
      );
    default:
      return null;
  }
};
export default SecurityPwd;
