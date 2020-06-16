import React from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {GoMarkGithub} from 'react-icons/go';


const StyledFooter = styled.div`
div {
  
  background-color: #222;
}
.navbar{
  padding: 30px;
}
.navbar-brand {
    display: flex;
    align-items: center;
  }
  
a, .navbar-brand, .navbar-nav .nav-link {
  color: #bbb;

  &:hover {
    color: white;
  }
}
}
`
function FooterNav(props) {
  return (
    <StyledFooter className="fixed-bottom">
      <Container fluid>
              <Navbar className="justify-content-center" justify="true" variant="dark">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link>
                  <Link to="/contact">Contact</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/privacy">Privacy Policy</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/faq">FAQ</Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Navbar.Text>
                    <a href="https://github.com/2020-Summer-ITE5430/capstone_group404_frontend" target="_blank"  rel='noopener noreferrer'> 
                    Project{'  '}<GoMarkGithub/></a>
            </Navbar.Text>
          </Navbar>
      </Container>
    </StyledFooter>
  )
};

export default FooterNav   