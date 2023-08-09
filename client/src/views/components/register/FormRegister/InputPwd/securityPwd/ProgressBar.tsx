import styled from "styled-components";

const LayoutProgressBar = styled.div`
  transition: color 0.3s ease-out;
  width: 4.4rem;
`;

const StyledProgressBar = styled.div`
  overflow: hidden;
  height: 0.5rem;
  background: hsla(0, 0%, 100%, 0.16);
  border-radius: 0.6rem;
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
    <LayoutProgressBar>
      <StyledProgressBar>
        <ProgressFill percentage={percentage} />
      </StyledProgressBar>
    </LayoutProgressBar>
  );
};
export default ProgressBar;
