import styled from "styled-components";
import { BiSolidCheckCircle } from "react-icons/bi";
import { RiAlertFill } from "react-icons/ri";
import { MdDoNotDisturbOn } from "react-icons/md";

const LayoutFigure = styled.div`
  margin-right: 0.5rem;
  display: inline-flex;
`;

const StyledFigure = styled.figure`
  display: inline-flex;
  margin: 0;
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
  return (
    <LayoutFigure>
      <StyledFigure>{showFigure(score)}</StyledFigure>
    </LayoutFigure>
  );
};
export default Figure;
