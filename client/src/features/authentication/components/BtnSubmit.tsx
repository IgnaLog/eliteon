import styled, { keyframes } from "styled-components";
import { CgSpinner } from "react-icons/cg";

const Button = styled.button`
  position: relative;
  padding: 1rem 1.8rem;
  border-radius: 0.6rem;
  cursor: pointer;
  background-color: var(--bg-btn-primary);
  color: var(--txt-btn-primary);
  font-family: Cerebri, sans-serif;
  font-size: 1.7rem;
  letter-spacing: -0.01rem;
  line-height: 2.2rem;
  transition:
    border-color 216ms ease-in-out 0s,
    background-color 216ms ease-in-out 0s,
    transform 0.15s ease-in-out 0s;

  &:hover {
    background-color: var(--bg-btn-primary-hover);
  }

  &:disabled {
    background-color: var(--bg-btn-disabled);
    cursor: not-allowed;
  }
`;

const ContentButton = styled.div<{ show: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(CgSpinner)`
  width: 100%;
  height: 100%;
  display: block;
  max-width: 40px;
  padding: 0.8rem;
  position: absolute;
  margin: 0px auto;
  inset: 0px;
  box-sizing: border-box;
  pointer-events: none;
  animation: ${spinAnimation} 864ms linear 0s infinite normal none running;
  color: var(--txt-spinner);
`;

type Props = {
  isSubmitting: boolean;
  disabled: boolean;
  text: string;
};

const BtnSubmit = ({ isSubmitting, disabled, text }: Props) => {
  return (
    <Button type="submit" disabled={disabled}>
      {isSubmitting && <Spinner />}
      <ContentButton show={!isSubmitting ? 1 : 0}>{text}</ContentButton>
    </Button>
  );
};

export default BtnSubmit;
