import styled from "styled-components";
import { BiSolidCheckCircle } from "react-icons/bi";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useEffect, useState } from "react";

const Figure = styled.figure<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
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
    <Figure color={valid ? "#00f593;" : "#eb0400"}>
      {isValid ? (
        <BiSolidCheckCircle size={18} />
      ) : (
        <MdDoNotDisturbOn size={18} />
      )}
    </Figure>
  );
};
export default ValidateEmail;
