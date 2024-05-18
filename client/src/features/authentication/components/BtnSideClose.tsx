import { MouseEvent } from "react";
import styled from "styled-components";
import { LuX } from "react-icons/lu";

const SideButton = styled.div<{ show: any }>`
  height: 70%;
  display: ${({ show }) => (show ? "flex" : "none")};
  padding: 1.4rem 0.8rem;
  position: absolute;
  right: 1.5%;
  top: 16%;
  align-items: center;
  cursor: pointer;

  &:hover,
  &:active {
    background: var(--bg-btn-txt-hover);
    border-radius: 8px;
  }

  &:active {
    background: var(--bg-btn-txt-active);
  }
`;

type Props = {
  value: string;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleFocus: (e: MouseEvent<HTMLInputElement>) => void;
};

const BtnSideClose = ({ value, handleClick, handleFocus }: Props) => {
  return (
    <SideButton
      show={value !== "" ? 1 : 0}
      onClick={handleClick}
      onMouseDown={handleFocus}
    >
      <LuX size={18} />
    </SideButton>
  );
};

export default BtnSideClose;
