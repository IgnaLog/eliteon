import styled from "styled-components";
import { MdClose } from "react-icons/md";

const ContainerButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;

  &:hover {
    background: var(--bg-btn-txt-hover);
  }

  &:active {
    background: var(--bg-btn-txt-active);
  }
`;

const IconButton = styled.div`
  width: 2rem;
  height: 2rem;
`;

const FigureIcon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
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
