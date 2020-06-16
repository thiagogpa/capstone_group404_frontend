import React from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import Link from 'react-router-dom/Link'
import styled from 'styled-components'
import logo from './logo.png';
import {FaShoppingCart} from 'react-icons/fa'

const StyledHeader = styled.div`

div {
      background-color: #414042;
}
.navbar {
  padding-left: 100px;
  padding-right: 20px;
  
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
.navbar-brand{
    font-weight: 800;
}

 .navbar-text {
    color:white;
}
.navbar-text a{
    color:orange;
    &:hover {
        color: yellow;
      }

}
}
  
`;


function HeaderNav(props) {
    return (
        <StyledHeader class="sticky-top">
            <Container fluid>
                <Navbar className="justify-content-center">
                    <Navbar.Text>
                        Black Lives Metter.<a href="https://support.eji.org/give/153413/#!/donation/checkout" target="_blank" rel='noopener noreferrer'>
                            Support the Equal Justice Initiative</a>
                    </Navbar.Text>
                </Navbar>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                        <Navbar.Brand href="/" >
                            <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}WALL-UP
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/bins">OUR BINS</Link>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/area">SERVICE AREA</Link>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/how">HOW IT WORKS</Link>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/faq">FAQ</Link>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/order-online">ORDER ONLINE</Link>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                             <Nav>
                                <Nav.Item>
                                    <Nav.Link>
                                        <Link to="/cart"><span><Cart/></span></Link>
                                    </Nav.Link>
                                </Nav.Item>
                                <UserLoginNav />
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                
            </Container>
        </StyledHeader>
    )
};

function UserLoginNav() {
    //stab change the vars 
    let isAuthenticated = true;
    let userName = "Thiago"
    //
    if (!isAuthenticated)
        return (
            <Nav.Item>
                <Nav.Link>
                    <Link to="/login">Login/Sign in</Link>
                </Nav.Link>
            </Nav.Item>
        );
    else
        return (
            <NavDropdown title={"Signed-in as " + userName} id="collasible-nav-dropdown">
                <NavDropdown.Item>
                    <Link to="/user-account">Your account</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to="/user-orders">Your Orders</Link>
                </NavDropdown.Item>
            </NavDropdown>
        );
}


const CartStyled = styled.div`
{
    div{
        background-color:#88AF3A;
        color:black;
        vertical-align:bottom;
        font-size:120%;
        padding-right:5px;
        padding-left:5px;
        border-radius: 5px;
    }
}
`;

const Cart=(props)=>(
    <CartStyled>
    <div>
        <FaShoppingCart/>
    </div>
    </CartStyled>
)

export default HeaderNav   