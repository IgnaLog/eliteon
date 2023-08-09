import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Register from "./register/Register";
import styled from "styled-components";
import Footer from "./Footer";
import ScrollBar from "./ScrollBar";

const RootUno = styled.div`
  overflow: hidden !important;
  display: flex !important;
  flex-flow: column !important;
  position: absolute !important;
  inset: 0px !important;
`;

const RootDos = styled.div`
  display: flex !important;
  flex-flow: column !important;
  height: 100% !important;
`;

const StyledContainer = styled.div`
  display: flex !important;
  flex-wrap: nowrap !important;
  position: relative !important;
  overflow: hidden !important;
  height: 100% !important;
`;

const StyledMain = styled.main`
  overflow: hidden !important;
  position: relative !important;
  -webkit-box-flex: 1 !important;
  flex-grow: 1 !important;
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
`;

const Layout = ({}) => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleSignup = () => {
    setSignupOpen(!isSignupOpen);
  };
  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <RootUno>
      <RootDos>
        <Navbar toggleSignup={toggleSignup} toggleLogin={toggleLogin} />

        {isSignupOpen && (
          <Register isSignupOpen={true} toggleSignup={toggleSignup} />
        )}

        <StyledContainer>
          <StyledMain>
            <ScrollBar>
              <Outlet />
            </ScrollBar>
          </StyledMain>
        </StyledContainer>

        <Footer />
      </RootDos>
    </RootUno>
  );
};

export default Layout;
