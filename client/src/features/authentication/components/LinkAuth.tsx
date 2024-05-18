import styled from "styled-components";

const Container = styled.div`
  margin-top: 25px;

  span,
  a {
    font-family: cerebri, sans-serif;
    font-size: 1.4rem;
    letter-spacing: -0.1px;
    color: var(--txt-span);
    text-decoration: none;
  }

  a {
    color: var(--txt-link);
    cursor: pointer;
  }
`;

type Props = {
  authText: string;
  href: string;
  linkText: string;
};

const LinkAuth = ({ authText, href, linkText }: Props) => {
  return (
    <Container>
      <span>{authText}</span>
      <a href={href}>{linkText}</a>
    </Container>
  );
};

export default LinkAuth;
