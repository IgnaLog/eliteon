import styled from "styled-components";

const StyledProgressBar = styled.div`
  width: 4.4rem;
  height: 0.5rem;
  overflow: hidden;
  border-radius: 0.6rem;
  background: var(--bg-progress);
  transition: color 0.3s ease-out;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  max-width: 100%;
  height: 100%;
  background: currentcolor;
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
`;

type Props = {
  percentage: number;
};

const ProgressBar = ({ percentage }: Props) => {
  return (
    <StyledProgressBar>
      <ProgressFill percentage={percentage} />
    </StyledProgressBar>
  );
};
export default ProgressBar;
