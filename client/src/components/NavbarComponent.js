import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AlertContext from '../context/alerts-theme/AlertContext';
 
function NavbarComponent() {
  
  const context = useContext(AlertContext);
  const { mode, toggleMode } = context;
  
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    console.log("Logged Out!");
    navigate('/login');
  }
  return (
    <Navbar bg={mode} variant={mode} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Note It!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Form className='d-flex align-items-center'>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    onClick={toggleMode}
                />
                <Navbar.Text>Dark Mode</Navbar.Text>
                {
                  !localStorage.getItem('token') ?
                  <div>
                    <Button className="ms-3" as={Link} to="/login">LogIn</Button>
                    <Button className="mx-2" as={Link} to="/signup">SignUp</Button>
                  </div> :
                  <Button className="ms-3" onClick={handleLogOut} >Log Out</Button>
                }
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;