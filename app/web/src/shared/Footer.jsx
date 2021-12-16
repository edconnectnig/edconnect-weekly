import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar
      bg="light"
      className="mx-auto w-50 p-2 pr-3 mt-5 justify-content-end"
    >
      <Nav>
        Project Explorer &nbsp; &copy; 2021 - &nbsp; <b>Edconnect</b>
      </Nav>
    </Navbar>
  );
};

export default Footer;
