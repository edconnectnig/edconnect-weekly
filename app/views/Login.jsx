import React, { useState } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import Layout from "./shared/Layout";

const Login = ({ error, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
    }
  };

  return (
    <Layout user={user}>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Login</h1>
          <Form id="loginForm" method="post" action="login">
            {error && <Alert variant="danger">Invalid Email/Password</Alert>}
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="email">Email Address: </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default Login;
