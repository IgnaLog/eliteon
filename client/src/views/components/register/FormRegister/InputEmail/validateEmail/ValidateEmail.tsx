import styled from "styled-components";
import { BiSolidCheckCircle } from "react-icons/bi";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useEffect, useState } from "react";

const LayoutFigure = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  display: inline-flex;
`;

const Figure = styled.figure`
  display: inline-flex;
  margin: 0;
`;

type Props = {
  valid: boolean;
};

const ValidateEmail = ({ valid }: Props) => {
  const [isValid, setIsValid] = useState(valid);

  useEffect(() => {
    setIsValid(valid);
  }, [valid]);

  return (
    <LayoutFigure color={valid ? "#00f593;" : "#eb0400"}>
      <Figure>
        {isValid ? (
          <BiSolidCheckCircle size={18} />
        ) : (
          <MdDoNotDisturbOn size={18} />
        )}
      </Figure>
    </LayoutFigure>
  );
};
export default ValidateEmail;
