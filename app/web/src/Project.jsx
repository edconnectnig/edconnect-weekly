//import statement used to import react and react-bootstrap components
import React,{useState,useEffect} from 'react';
import Layout from './shared/Layout';//import Layout component from the shared folder
import {useParams} from 'react-router-dom';
import { Jumbotron, Card,Row,Col,Container,Button,ListGroup,Form,InputGroup } from 'react-bootstrap';

//functional component Project
const Project = () => {
    const {id} = useParams();//useParams is used to get the expression starting from the name "id" from the current url
    console.log(id)
    const id_value = id.substring(3);//it is used to get the value from the id by deleting the first 3 characters
    //declaration of states and their corresponding functions used to update the states
    const [data,setData] = useState({});
    const [authors,setAuthors] = useState([]);
    const [projectData,setProjectData] = useState('');

    //this function is used to get the name of the author that wrote the project from the user details
    //by making a get request to fetch the user with the specified id
    function getProjectName(id) {
        
        fetch(`/api/users/${id}`).then(async(response)=>{
            var data = await response.json();
            setProjectData(data);
        })
    }

    //the useEffect hook contains a fetch request used to get the project details of a particular project 
    //using the id_value gotten. this useEffect hook runs only once.
    useEffect(() => {
    fetch(`/api/projects/${id_value}`).then(async (response)=>{
        var data = await response.json();
        getProjectName(data.createdBy)//gets ProjectName using the value of createdBy gotten from the response
        setAuthors(data.authors)//sets project authors to all authors gotten from the response
        setData(data);//sets data to the response gotten
        
    })
    },[])
    /*This return statement indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (

        <>
        <Layout>
        <h2 id="project_name" className="p-2" style={{marginLeft:'70px',marginRight:'60px'}}>{data.name}</h2>

        <Jumbotron className="p-2" style={{marginLeft:'70px',marginRight:'60px'}}>
            
            <Row class="row" className="pl-4 pt-1">
                <Col id="project_author">Created By: <br/> {projectData.firstname + " " + projectData.lastname}</Col>
                <Col >Date Created : <br/> 2020-08-04</Col>
                <Col >Last Updated : <br/> 2020-08-04</Col>
                <Col ><Button variant="primary">Edit Project</Button></Col>
            </Row>
        </Jumbotron>

        <Container>
            <Row>
                <Col>
                    <h5>Project Abstract</h5>
                    <hr/>
                    <p id="project_abstract">{data.abstract}</p>
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
                                <ListGroup.Item key={author}>{author}</ListGroup.Item>
                            ))}
                        </ListGroup>
                            <Card.Footer id="project_tags"> <Card.Link>{data.tags}</Card.Link> </Card.Footer>
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