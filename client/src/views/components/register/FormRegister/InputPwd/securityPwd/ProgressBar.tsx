import styled from "styled-components";

const StyledLayoutProgressBar = styled.div`
  transition: color 0.3s ease-out;
  width: 4.4rem;
`;

const StyledProgressBar = styled.div`
  overflow: hidden;
  height: 0.5rem;
  background: hsla(0, 0%, 100%, 0.16);
  border-radius: 0.6rem !important;
`;

const StyledProgressFill = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  max-width: 100%;
  height: 100%;
  background: currentcolor;
  border-top-left-radius: 0.6rem !important;
  border-bottom-left-radius: 0.6rem !important;
`;

type Props = {
  percentage: number;
};

const ProgressBar = ({ percentage }: Props) => {
  return (
    <StyledLayoutProgressBar>
      <StyledProgressBar>
        <StyledProgressFill percentage={percentage} />
      </StyledProgressBar>
    </StyledLayoutProgressBar>
  );
};
export default ProgressBar;
