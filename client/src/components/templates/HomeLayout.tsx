import Navbar from "../organisms/Navbar";
import { ReactNode, useState } from "react";
import Footer from "../organisms/Footer";
import Main from "../organisms/Main";
import Signup from "@features/authentication/components/Signup/Signup";
import Login from "@features/authentication/components/Login/Login";

type Props = {
  children: ReactNode;
};

const HomeLayout = ({ children }: Props) => {
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
      <Signup isSignupOpen={isSignupOpen} toggleSignup={toggleSignup} />
      <Login isLoginOpen={isLoginOpen} toggleLogin={toggleLogin} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default HomeLayout;
