import React, { useState } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Layout from "./shared/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await payload.json();
    setEmail("");
    setPassword("");

    if (response.status === "ok") {
      setError(false);
      document.cookie = `uid=${response.data.id};path=/`;
      history.push("/");
    } else {
      setError(true);
    }
  };

  return (
    <Layout>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Login</h1>
          <Form id="loginForm" onSubmit={handleSubmit}>
            {error && <Alert variant="danger">Invalid Email/Password</Alert>}
            <Form.Group as={Row}>
              <Col>
                <Form.Label for="email">Email Address: </Form.Label>
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
                <Form.Label>Password:</Form.Label>
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
