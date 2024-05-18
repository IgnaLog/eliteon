import styled from "styled-components";
import { BiSolidCheckCircle } from "react-icons/bi";
import { RiAlertFill } from "react-icons/ri";
import { MdDoNotDisturbOn } from "react-icons/md";

const StyledFigure = styled.figure`
  display: flex;
  margin: 0;
  padding-right: 0.5rem;
`;

type Props = {
  score: number;
};

const Figure = ({ score }: Props) => {
  const showFigure = (score: number) => {
    if (score < 2) {
      return <MdDoNotDisturbOn size={18} />;
    } else if (score <= 3) {
      return <RiAlertFill size={18} />;
    } else {
      return <BiSolidCheckCircle size={18} />;
    }
  };
  return <StyledFigure>{showFigure(score)}</StyledFigure>;
};
export default Figure;
