import styled from "styled-components";
import ReactModal from "react-modal";
import { ReactNode } from "react";

const OverlayStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  align-items: flex-start;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5000;
`;

const ModalStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  outline: none;
  pointer-events: none !important;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  margin-top: auto;
`;

type Props = {
  isModalOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
};

const ModalBox = ({ isModalOpen, toggleModal, children }: Props) => (
  <ReactModal
    isOpen={isModalOpen}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    onRequestClose={toggleModal}
    className="_"
    overlayClassName="_"
    contentElement={(props, children) => (
      <ModalStyle {...props}>{children}</ModalStyle>
    )}
    overlayElement={(props, contentElement) => (
      <OverlayStyle {...props}>{contentElement}</OverlayStyle>
    )}
  >
    <Container>{children}</Container>
  </ReactModal>
);

export default ModalBox;
