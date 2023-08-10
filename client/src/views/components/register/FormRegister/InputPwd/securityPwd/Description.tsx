import styled from "styled-components";

const LayoutText = styled.div`
  margin-right: 1rem;
`;

const CoreText = styled.p`
  font: inherit;
  margin: 0;
`;

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  return (
    <LayoutText>
      <CoreText>{description}</CoreText>
    </LayoutText>
  );
};
export default Description;
