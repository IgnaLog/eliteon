import { useState } from "react";
import styled from "styled-components";
import { useThemeStore } from "../../store/themeStore";

interface ToggleButtonProps {
  checked: boolean;
}

const ToggleWrapper = styled.div`
  position: relative;
`;

const ToggleInput = styled.input`
  cursor: pointer;
  position: absolute;
  width: 3.5rem;
  height: 2rem;
  opacity: 0;
`;

const ToggleButton = styled.div<ToggleButtonProps>`
  pointer-events: none;
  position: relative;
  width: 3.5rem;
  height: 2rem;
  border-width: 2px;
  border-style: solid;
  border-radius: 1rem;
  transition-property: background-color;
  transition-timing-function: ease;
  transition-duration: 100ms;
  border-color: ${(props) =>
    props.checked
      ? "var(--color-border-toggle-checked)"
      : "var(--color-border-toggle)"};
  background-color: ${(props) =>
    props.checked
      ? "var(--color-background-toggle-checked)"
      : "var(--color-background-toggle)"};

  &::before {
    content: "";
    border-width: 0px 0px 2px 2px;
    border-style: solid;
    border-color: var(--color-text-toggle-checked-icon);
    display: ${(props) => (props.checked ? "block" : "none")};
    position: absolute;
    top: 0.7rem;
    left: 0.8rem;
    width: 0.7rem;
    height: 0.3rem;
    transform: translate3d(-50%, -50%, 0px) rotate(-45deg);
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0.2rem;
    bottom: 0.2rem;
    left: ${(props) =>
      props.checked ? "calc((100% - 1.2rem) - 0.2rem)" : "0.2rem"};
    width: 1.2rem;
    height: 1.2rem;
    transition-property: left;
    transition-timing-function: ease;
    transition-duration: 100ms;
    border-radius: 50%;
    background-color: ${(props) =>
      props.checked
        ? "var(--color-background-toggle-handle-checked)"
        : "var(--color-background-toggle-handle)"};
  }
`;

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { toggleTheme } = useThemeStore();

  const handleToggle = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <ToggleWrapper>
      <ToggleInput
        type="checkbox"
        id="toggleSwitch"
        checked={isChecked}
        onChange={handleToggle}
      />
      <ToggleButton checked={isChecked} />
    </ToggleWrapper>
  );
};

export default ToggleSwitch;
