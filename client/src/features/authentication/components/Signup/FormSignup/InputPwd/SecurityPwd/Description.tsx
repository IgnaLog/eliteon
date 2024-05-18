import styled from "styled-components";

const CoreText = styled.p`
  padding-right: 1rem;
  margin: 0;
`;

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  return <CoreText>{description}</CoreText>;
};
export default Description;
