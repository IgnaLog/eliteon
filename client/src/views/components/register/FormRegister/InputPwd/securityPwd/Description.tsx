import styled from "styled-components";

const StyledLayoutText = styled.div`
  margin-right: 1rem !important;
`;

const StyledCoreText = styled.p`
  font: inherit;
  margin: 0;
`;

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  return (
    <StyledLayoutText>
      <StyledCoreText>{description}</StyledCoreText>
    </StyledLayoutText>
  );
};
export default Description;
