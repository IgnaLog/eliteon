import styled from "styled-components";

const Nav = styled.nav`
  height: 5rem;
  display: block;
  flex-shrink: 0;
  z-index: 1000;
`;

const Container = styled.div`
  background-color: #18181b !important;
  display: flex !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.897), 0 0px 2px rgba(0, 0, 0, 0.897) !important;
  -webkit-box-align: stretch !important;
  align-items: stretch !important;
  flex-wrap: nowrap !important;
  height: 100% !important;
`;

const ContainerLeft = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  flex-shrink: 2;
  -webkit-box-flex: 1;
  -webkit-box-align: stretch;
  align-items: stretch;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

const ContainerRight = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  -webkit-box-pack: end;
  -webkit-box-flex: 1;
  flex-shrink: 2;
  -webkit-box-align: center;
  align-items: center;
`;

const ContainerSession = styled.div`
  height: 100%;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-right: 1rem;
`;

const ContainerButtonsSession = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const ContainerButtonSignup = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const ButtonSignup = styled.button`
  height: 3rem;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  border-radius: 0.4rem;
  background-color: #772ce8;
  color: #fff;
  font-family: Cerebri Regular, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: inherit;
  border: none;

  &:hover {
    background-color: #8d4cf0ea;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
  }
`;

const ButtonLabel = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  flex-grow: 0;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ButtonLabelText = styled.div`
  display: flex;
  flex-grow: 0;
  -webkit-box-flex: 0;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

const ContainerButtonLogin = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const ButtonLogin = styled.button`
  height: 3rem;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  border-radius: 0.4rem;
  background-color: #772ce8;
  color: #fff;
  font-family: Cerebri Regular, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: inherit;
  border: none;

  background-color: rgba(83, 83, 95, 0.38);
  color: #efeff1;

  &:hover {
    background-color: rgba(83, 83, 95, 0.48);
    color: #efeff1;
    cursor: pointer;
    text-decoration: none;
  }
`;

type Props = {
  toggleSignup: () => void;
  toggleLogin: () => void;
};

const Navbar = ({ toggleSignup, toggleLogin }: Props) => {
  return (
    <Nav>
      <Container>
        <ContainerLeft></ContainerLeft>
        <ContainerRight>
          <ContainerSession>
            <ContainerButtonsSession>
              <ContainerButtonLogin>
                <ButtonLogin onClick={toggleLogin}>
                  <ButtonLabel>
                    <ButtonLabelText>Iniciar sesión</ButtonLabelText>
                  </ButtonLabel>
                </ButtonLogin>
              </ContainerButtonLogin>

              <ContainerButtonSignup>
                <ButtonSignup onClick={toggleSignup}>
                  <ButtonLabel>
                    <ButtonLabelText>Registrarse</ButtonLabelText>
                  </ButtonLabel>
                </ButtonSignup>
              </ContainerButtonSignup>
            </ContainerButtonsSession>
          </ContainerSession>
        </ContainerRight>
      </Container>
    </Nav>
  );
};
export default Navbar;
