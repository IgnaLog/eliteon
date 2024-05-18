import styled from "styled-components";
import Figure from "./Figure";
import ProgressBar from "./ProgressBar";
import Description from "./Description";

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
    const RED = "#eb0400";
    const ORANGE = "#fba12e";
    const GREEN = "var(--fill-success)";
    if (score < 2) {
      return RED;
    } else if (score <= 3) {
      return ORANGE;
    } else {
      return GREEN;
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
