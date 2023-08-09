import Navbar from "./Navbar";
import { useState } from "react";
import Register from "./register/Register";
import Footer from "./Footer";
import Main from "./Main";

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
    <>
      <Navbar toggleSignup={toggleSignup} toggleLogin={toggleLogin} />

      <Register isSignupOpen={isSignupOpen} toggleSignup={toggleSignup} />

      <Main />
      <Footer />
    </>
  );
};

export default Layout;
