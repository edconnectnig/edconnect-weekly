import React from "react";
import { useState, useEffect } from "react";
import { Jumbotron, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "./shared/Layout";

const Home = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <Layout>
      <main className="mx-auto w-75">
        <div>
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
            {projects.map((project) => (
              <Col className="col-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/projects/${project.id}`}>{project.name}</Link>
                    </Card.Title>
                    <Card.Text>{project.authors.join(", ")}</Card.Text>
                    <Card.Text>{project.abstract}</Card.Text>
                    <Card.Text>
                      <Link to={"#"}>
                        {project.tags.map((tag) => `#${tag}`)}
                      </Link>
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
