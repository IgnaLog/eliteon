import { ErrorMessage } from "formik";
import styled from "styled-components";

const StyledErrorMessage = styled(ErrorMessage)<{ score: number | null }>`
  margin: 0.25rem 0px 0px;
  padding: 0.2rem 0px;
  text-align: right;
  color: "rgb(250, 130, 106)";
  color: ${({ score }) =>
    score && score > 1 ? "rgb(127, 119, 131)" : "rgb(250, 130, 106)"};
  font-family: Cerebri Regular, sans-serif;
  font-size: 1.4rem;
  letter-spacing: -0.01rem;
  line-height: 1.8rem;
  -webkit-box-pack: end;
  justify-content: flex-end;
`;

type Props = {
  name: string;
  score: number | null | undefined;
};

const PwdErrorMessage = ({ name, score }: Props) => {
  return <StyledErrorMessage name={name} score={score ?? null} component="p" />;
};
export default PwdErrorMessage;
