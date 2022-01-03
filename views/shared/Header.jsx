import React from "react";
import { Form, Button, Nav, Navbar } from "react-bootstrap";

const Header = ({ user }) => {
  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between">
      <Nav>
        <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
        <Form inline>
          <Form.Control type="text" placeholder="Search Projects" />
          <Button variant="outline-light" type="submit" className="ml-3 mr-2">
            Search
          </Button>
        </Form>
        <Nav>
          <Nav.Link href="/projects/submit">Projects</Nav.Link>
        </Nav>
      </Nav>

      {user ? (
        <Nav className="justify-content-end">
          <Nav.Link href="/logout">Logout</Nav.Link>
          <Nav.Link id="username">{`Hi ${user.firstname}`}</Nav.Link>
        </Nav>
      ) : (
        <Nav className="justify-content-end">
          <Nav.Link href="/signup">Sign up</Nav.Link>
          <Nav.Link href="/Login">Login</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
