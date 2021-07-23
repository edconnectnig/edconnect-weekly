//import statement used to import react and react-bootstrap components
import React,{useState} from 'react';
import Layout from './shared/Layout';//import Layout component from the shared folder
import { Jumbotron, Card,Row,Col,Container,Button,ListGroup,Form,InputGroup } from 'react-bootstrap';

//functional component Project
const Project = (props) => {
    const {project_by_id,user,current_user} = props;
    //declaration of states and their corresponding functions used to update the states
    const [data] = useState(project_by_id || {});
    const [authors] = useState(project_by_id.authors || []);
    const [projectData] = useState(user || '');
   
    /*This return statement indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (

        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <Layout user={current_user}>
        <h2 id="project_name" name="name" className="p-2" style={{marginLeft:'7vw', marginTop:'2vw'}}>{data.name}</h2>

        <Jumbotron className="p-2" style={{marginLeft:'7vw',marginRight:'7vw'}}>
            
            <Row class="row" className="pl-4 pt-1">
                <Col id="project_author">Created By: <br/> {projectData.firstname + " " + projectData.lastname}</Col>
                <Col >Date Created : <br/>{new Date(project_by_id.createdAt).toLocaleDateString()}</Col>
                <Col >Last Updated : <br/>{new Date(project_by_id.updatedAt).toLocaleDateString()}</Col>
                <Col ><Button variant="primary">Edit Project</Button></Col>
            </Row>
        </Jumbotron>

        <Container>
            <Row>
                <Col>
                    <h5>Project Abstract</h5>
                    <hr/>
                    <p id="project_abstract" name="abstract">{data.abstract}</p>
                    <h5>Comments</h5>
                            <InputGroup>
                                <Form.Control as = "textarea" rows="4" cols="10"/>
                            </InputGroup>
                            <br/>
                   
                    <Button variant="primary">Submit</Button>
                    <hr/>
                    <p className="text-center">No comments yet</p>
                </Col>
                
                <Col>
                    <h5>Project Details</h5>
                    <hr/>

                    <Card id="project_authors">
                        <Card.Header>Authors</Card.Header>
                        <ListGroup>
                            {authors && authors.map(author => (
                                <ListGroup.Item key={author} name="authors">{author}</ListGroup.Item>
                            ))}
                        </ListGroup>
                            <Card.Footer id="project_tags"> <Card.Link name="tags">{data.tags}</Card.Link> </Card.Footer>
                    </Card><br/>

                     <Card>
                        <Card.Header>Project Files</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Text className="text-muted">No file uploaded yet</Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
        </Layout>
        </>
    );//end of return statement
}//end of component
export default Project;//exports Project component so that it can be imported from another component.