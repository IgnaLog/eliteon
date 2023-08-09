import styled from "styled-components";
import { MdClose } from "react-icons/md";

const ContainerButton = styled.div`
  position: absolute;
  margin-left: 0.5rem;
  left: auto;
  right: 1rem;
  top: 1rem;
`;

const Button = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  border-radius: 0.4rem;
  height: 3rem;
  width: 3rem;
  background-color: transparent;
  color: #efeff1;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: rgba(83, 83, 95, 0.48);
    color: #efeff1;
  }
`;

const IconButton = styled.div`
  pointer-events: none;
  width: 2rem;
  height: 2rem;
`;

const FigureIcon = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  fill: currentColor;
`;

type Props = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: Props) => {
  return (
    <ContainerButton>
      <Button onClick={onClose}>
        <IconButton>
          <FigureIcon>
            <MdClose size={28} />
          </FigureIcon>
        </IconButton>
      </Button>
    </ContainerButton>
  );
};
export default CloseButton;
