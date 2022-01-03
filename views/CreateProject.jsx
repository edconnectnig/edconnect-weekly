import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Layout from "./shared/Layout";

const CreateProject = ({ error, user }) => {
  const [name, setName] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "abstract":
        setAbstract(value);
        break;
      case "authors":
        setAuthors(value.split(","));
        break;
      case "tags":
        setTags(value.split(","));
        break;
      default:
    }
  };

  return (
    <Layout user={user}>
      <main>
        <div className="mx-auto w-50 p-2 mt-5">
          <h3>Submit Project</h3>
          <Form id="createProjectForm" method="post" action="/projects/submit">
            {error && (
              <Alert variant="danger">
                {error.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </Alert>
            )}
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter project name"
                  value={name}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Project Abstract:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="abstract"
                  id="abstract"
                  rows={4}
                  cols={100}
                  value={abstract}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Author(s): </Form.Label>
                <Form.Control
                  type="text"
                  name="authors"
                  id="authors"
                  placeholder="Enter author names (seperated by comma)"
                  value={authors.join(",")}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Tag(s):</Form.Label>
                <Form.Control
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Use # to tag project with different topics"
                  value={tags.join(",")}
                  onChange={handleInput}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default CreateProject;
