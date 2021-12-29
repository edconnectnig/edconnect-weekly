import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Layout from "./shared/Layout";

const Project = (props) => {
  //console.log(props)
  return (
    <Layout user={props.user}>
      <main>
        {" "}
        <br />
        <br />
        <Container>
          <Row>
            <h3 id="project_name">
              <strong>{props.props1.name}</strong>
            </h3>
          </Row>
          <Row className="bg-light p-3">
            <Col>
              <p>Created By</p>
              <p id="project_author">{`${props.props2.firstname} ${props.props2.lastname}`}</p>
            </Col>
            <Col>
              <p>Date Created</p>
              <p>{new Date(props.props1.createdAt).toLocaleDateString()}</p>
            </Col>
            <Col>
              <p>Last Updated</p>
              <p>{new Date(props.props1.updatedAt).toLocaleDateString()}</p>
            </Col>
            <Col className="mx-auto justify-content-end">
              <Button href="/createproject" variant="primary" size="lg">
                Edit Project
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <h3>Project Abstract</h3>
              <hr className="solid" />
              <p id="project_abstract">{props.props1.abstract}</p>
              <br />
              <br />
              <Form name="projectComment">
                <Form.Group>
                  <Form.Label>
                    <strong>Comments:</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comments"
                    rows={4}
                    cols={50}
                    placeholder="Leave a comment"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <hr className="solid" />
              <p align="center">No comments added yet</p>
            </Col>
            <Col>
              <h3>Project details</h3>
              <hr className="solid" />
              <InputGroup>
                <Form.File id="custom-file" label="Custom file input" custom />
                <InputGroup.Append>
                  <Button variant="primary" type="button" name="projectFile">
                    Upload
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <hr className="solid" />
              <Card>
                <Card.Header>Author(s)</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p align="center" id="project_authors">
                      {props.props1.authors}
                    </p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer id="project_tags">{props.props1.tags}</Card.Footer>
              </Card>
              <br />
              <Card>
                <Card.Header>Project files</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p align="center">No files uploaded yet</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <br />
    </Layout>
  );
};

export default Project;
