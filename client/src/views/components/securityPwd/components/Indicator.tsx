import Description from "./components/Description";
import Figure from "./components/Figure";
import ProgressBar from "./components/ProgressBar";
import styled from "styled-components";

const StyledPwdIndicator = styled.div<{ color: string }>`
  display: flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
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
      return "#00f593;";
    }
  };
  return (
    <StyledPwdIndicator color={evaluateColor(score)}>
      <Figure score={score} />
      {score >= 2 && <Description description={description} />}
      <ProgressBar percentage={percentage} />
    </StyledPwdIndicator>
  );
};
export default Indicator;
