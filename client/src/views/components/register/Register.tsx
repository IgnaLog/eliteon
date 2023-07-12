import { useState } from "react";
import styled from "styled-components";
import ServerInfo from "./ServerInfo";
import AlreadyRegistered from "./AlreadyRegistered";
import Title from "./Title";
import FormRegister from "./FormRegister/FormRegister";

const StyledRegister = styled.section`
  max-width: 42.8rem;
  text-align: center;
  padding: 3rem;
  border-radius: 10px;
  background-color: rgb(30, 27, 30);

  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1rem;
    letter-spacing: -0.1px;
    color: white;
  }

  span {
    color: rgb(173, 174, 181);
  }

  a,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Register = () => {
  const [serverMsg, setServerMsg] = useState("");

  return (
    <StyledRegister>
      <Title />
      <FormRegister setServerMsg={setServerMsg} />
      <ServerInfo serverMsg={serverMsg} />
      <AlreadyRegistered />
    </StyledRegister>
  );
};

export default Register;
