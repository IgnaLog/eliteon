import Description from "./Description";
import Figure from "./Figure";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const PwdIndicator = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};
`;

type Props = {
  percentage: number;
  description: string;
  score: number;
};

const Indicator = ({ percentage, description, score }: Props) => {
  const evaluateColor = (score: number) => {
    if (score < 2) {
      return "#eb0400";
    } else if (score <= 3) {
      return "#fba12e;";
    } else {
      return "var(--fill-success)";
    }
  };
  return (
    <PwdIndicator color={evaluateColor(score)}>
      <Figure score={score} />
      {score >= 2 && <Description description={description} />}
      <ProgressBar percentage={percentage} />
    </PwdIndicator>
  );
};
export default Indicator;
