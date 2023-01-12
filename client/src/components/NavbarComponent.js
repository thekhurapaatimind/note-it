import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
 
function NavbarComponent(props) {
  
  return (
    <Navbar bg={props.mode} variant={props.mode} expand="lg">
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
                    onClick={props.toggleMode}
                />
                <Navbar.Text>Dark Mode</Navbar.Text>
                <Button className="ms-3" as={Link} to="/login">LogIn</Button>
                <Button className="mx-2" as={Link} to="/signup">SignUp</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;