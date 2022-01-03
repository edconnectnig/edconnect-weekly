import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

const Signup = ({ programs, graduationYears, error, input, user }) => {
  const [firstName, setFirstName] = useState(input?.firstName);
  const [lastName, setLastName] = useState(input?.lastName);
  const [email, setEmail] = useState(input?.email);
  const [password, setPassword] = useState(input?.password);
  const [matricNumber, setMatricNmber] = useState(input?.matricNumber);
  const [program, setProgram] = useState(input?.program);
  const [graduationYear, setGraduationYear] = useState(input?.graduationYear);
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

  return (
    <Layout user={user ? user : null}>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h1>Sign Up</h1>
          <Form id="signupForm" method="post" action="signup">
            {error && (
              <Alert variant="danger">
                {error.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </Alert>
            )}
            <Form.Group as={Row}>
              <Col>
                <Form.Label htmlFor="firstname">First Name: </Form.Label>
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
                <Form.Label htmlFor="lastname">Last Name: </Form.Label>
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

              <Col>
                <Form.Label htmlFor="password">Password: </Form.Label>
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
                <Form.Label htmlFor="program">Program:</Form.Label>
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
                <Form.Label htmlFor="matricNumber">Matric Number:</Form.Label>
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
                <Form.Label htmlFor="graduationYear">
                  Graduation Year:
                </Form.Label>
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
