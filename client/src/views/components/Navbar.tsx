import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";

const Nav = styled.nav`
  height: 5rem;
  display: flex;
  background-color: var(--bg-navy);
  box-shadow: var(--shadow-elevation-1);
`;

const ContentLeft = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
`;

const ContentRight = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`;

const SessionButtons = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Button = styled.button<{ login: boolean }>`
  height: 3rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.4rem;
  font-family:
    Cerebri Bold,
    Helvetica,
    sans-serif;
  font-size: 1.4rem;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  padding: 0px 1.1rem;
  color: ${({ login }) =>
    login ? "var(--txt-btn-secondary)" : "var(--txt-btn-primary)"};
  background-color: ${({ login }) =>
    login ? "var(--bg-btn-secondary)" : "var(--bg-btn-primary)"};

  &:hover {
    background-color: ${({ login }) =>
      login ? "var(--bg-btn-secondary-hover)" : "var(--bg-btn-primary-hover)"};
    color: ${({ login }) =>
      login ? "var(--txt-btn-secondary)" : "var(--txt-btn-primary)"};
  }
`;

type Props = {
  toggleSignup: () => void;
  toggleLogin: () => void;
};

const Navbar = ({ toggleSignup, toggleLogin }: Props) => {
  return (
    <Nav>
      <ContentLeft>
        <ToggleSwitch />
      </ContentLeft>
      <ContentRight>
        <SessionButtons>
          <Button onClick={toggleLogin} login={true}>
            Iniciar sesión
          </Button>

          <Button onClick={toggleSignup} login={false}>
            Registrarse
          </Button>
        </SessionButtons>
      </ContentRight>
    </Nav>
  );
};
export default Navbar;
