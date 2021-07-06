//imports react components used in the code
import { Row, Col, Jumbotron, Container, Button, Card } from 'react-bootstrap';
import React from 'react'
import './App.css'
import Layout from './shared/Layout';

//functional component named Home
const Home = (props) => {

    //destructing props
    const { projectData, user } = props;

    
    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
            <Layout user={user}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <Jumbotron style={{marginLeft :'5vw', marginRight: '5vw', marginTop: '2vw', padding:'3%', backgroundSize: "cover" , backgroundPosition: "center"}}>
                    <div>
                        <h1>Welcome to Project Explorer</h1>
                    </div>
                    <p>
                        Projects Explorer is repository for final year projects across all departments at your institution.You can
                    submit your project and search projects submitted by others to learn from.<br /><br />

                    </p>
                    <div>
                    <Button href="/signup" variant="primary">Get Started</Button>
                    <Button href="/login" variant="secondary">Login</Button>
                    </div>
                </Jumbotron>

                <div style={{alignContent:"center"}}>
                <Container>

                    <Row className="showcase" style={{alignContent:"center"}}>

                        {projectData && projectData.slice(-4).reverse().map((item) => (

                            <Col keys={item._id}>
                                <Card keys={item._id}>
                                    <Card.Body keys={item._id} style={{width:"100%"}}>
                                        <a href={`/project/${item._id}`} keys={item.name}>{item.name}</a>
                                        <br /> {item.authors} <br /><br /> {item.abstract}  <br /><br />
                                        {<span>{item.lastVisited === '' ? "Not yet visited" : `Last visited: ${item.lastVisited}`}</span>} <br />
                                        {item.tags.map((item) => (
                                            <a href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}`} keys={item}> {item}</a>
                                        ))}
                                    </Card.Body>
                                </Card><br/>
                               
                            </Col>
                        ))}

                    </Row>
                </Container>
            </div>
            </Layout>
        </>
    );
};//end of functional component Home
export default Home;//a statement to export the Home component
