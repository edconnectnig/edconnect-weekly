import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./shared/Layout";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricNumber, setMatricNmber] = useState("");
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState("");
  const [graduationYears, setGraduationYears] = useState([]);
  const [graduationYear, setGraduationYear] = useState("");
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useHistory();

  const defaultState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMatricNmber("");
    setGraduationYear("");
    setError("");
    setErrorMessages([]);
  };

  const data = {
    firstName,
    lastName,
    email,
    password,
    programs,
    graduationYear,
    matricNumber,
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "program":
        setProgram(value);
        break;
      case "matricNumber":
        setMatricNmber(value);
        break;
      case "graduationYear":
        setGraduationYear(value);
        break;
      default:
    }
  };

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/graduationYears")
      .then((res) => res.json())
      .then((data) => {
        setGraduationYears(data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await payload.json();
    defaultState();

    if (response.status === "ok") {
      setError(false);
      document.cookie = `uid=${response.data.id};path=/`;
      history.push("/");
    } else {
      setError(true);
      setErrorMessages(response.errors);
    }
  };

  return (
    <Layout>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Sign Up</h1>
          <Form id="signupForm" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger">
                {errorMessages.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </Alert>
            )}
            <Form.Group as={Row}>
              <Col>
                <Form.Label for="firstName">First Name: </Form.Label>
                <Form.Control
                  id="firstname"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleInput}
                />
              </Col>

              <Col>
                <Form.Label for="lastName">Last Name: </Form.Label>
                <Form.Control
                  id="lastname"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

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

              <Col>
                <Form.Label for="password">Password: </Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col md="6">
                <Form.Label for="program">Program:</Form.Label>
                <Form.Control
                  id="program"
                  as="select"
                  name="program"
                  value={program}
                  onChange={handleInput}
                >
                  <option>Select Program</option>
                  {programs.map((program) => (
                    <option key={program}>{program}</option>
                  ))}
                </Form.Control>
              </Col>

              <Col md="3">
                <Form.Label for="matricNumber">Matric Number:</Form.Label>
                <Form.Control
                  type="text"
                  id="matricNumber"
                  name="matricNumber"
                  placeholder="Matric Number"
                  value={matricNumber}
                  onChange={handleInput}
                />
              </Col>

              <Col md="3">
                <Form.Label for="graduationYear">Graduation Year:</Form.Label>
                <Form.Control
                  as="select"
                  name="graduationYear"
                  id="graduationYear"
                  value={graduationYear}
                  onChange={handleInput}
                >
                  <option>Select Graduation Year</option>
                  {graduationYears.map((graduationYear, index) => (
                    <option key={index}>{graduationYear}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default Signup;
