import styled from "styled-components";

const StyledFooter = styled.footer`
  display: block;
`;

const Container = styled.div`
  position: relative;
`;

const Article = styled.article`
  background-color: #5c16c5;
  border-radius: 0.4rem !important;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.9),
    0 0px 2px rgba(0, 0, 0, 0.9);
  position: relative !important;
  padding: 1rem 2rem !important;
  display: block;
`;

const Resize = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  visibility: hidden;
  z-index: -1;
`;

const Unp = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.8rem !important;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Article>
          <Unp>Footer</Unp>
        </Article>
        <Resize />
      </Container>
    </StyledFooter>
  );
};
export default Footer;
