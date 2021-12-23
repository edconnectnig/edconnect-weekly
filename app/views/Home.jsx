import React, { useState } from "react";
import { Jumbotron, Button, Container, Row, Col, Card } from "react-bootstrap";
import Layout from "./shared/Layout";

const Home = ({ data, user }) => {
  return (
    <Layout user={user}>
      <main>
        <div className="mx-auto">
          <Jumbotron>
            <h1>Project Explorer</h1>
            <p>
              Project Explorer is a repository for final year projects across
              all departments at your institution. You can submit your project
              and search projects submitted by others to learn from.
            </p>
            <Button variant="primary" href="/signup" className="mr-3">
              Get Started
            </Button>
            <Button variant="secondary" href="/login">
              Login
            </Button>
          </Jumbotron>
        </div>

        <Container fluid>
          <Row className="showcase justify-content-between">
            {data.map((project, index) => (
              <Col className="col-2" key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a href={`/project/${project.id}`}>{project.name} </a>
                    </Card.Title>
                    <Card.Text>{project.authors.join(", ")}</Card.Text>
                    <Card.Text>{project.abstract}</Card.Text>
                    <Card.Text>
                      <a href={"#"}>{project.tags.map((tag) => `#${tag}`)}</a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </Layout>
  );
};

export default Home;
