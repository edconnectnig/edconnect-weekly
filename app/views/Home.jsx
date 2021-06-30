//imports react components used in the code
import { Row, Col, Jumbotron, Container, Button, Card } from 'react-bootstrap';
import Layout from './shared/Layout';

//functional component named Home
const Home = (props) => {

    //destructing props
    const { projectData, user } = props;
    console.log(projectData);
    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
            <Layout user={user}>
                <Jumbotron style={{ marginLeft: '60px', marginRight: '60px', marginTop: '30px' }}>
                    <div>
                        <h1>Welcome to Project Explorer</h1>
                    </div>
                    <p>
                        Projects Explorer is repository for final year projects across all departments at your institution.You can
                    submit your project and search projects submitted by others to learn from.<br /><br />

                    </p>
                    <Button href="/signup" variant="primary">Get Started</Button>
                    <Button href="/login" variant="secondary">Login</Button>
                </Jumbotron>

                <Container>

                    <Row className="showcase">

                        {projectData && projectData.slice(-4).reverse().map((item) => (

                            <Col keys={item._id}>
                                <Card keys={item._id} style={{ width: "15rem;" }}>
                                    <Card.Body keys={item._id} >
                                        <a href={`/project/${item._id}`} keys={item.name}>{item.name}</a>
                                        <br /> {item.authors} <br /><br /> {item.abstract}  <br /><br />
                                        {<span>{item.lastVisited === '' ? "Not yet visited" : `Last visited: ${item.lastVisited}`}</span>} <br />
                                        {item.tags.map((item) => (
                                            <a href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}`} keys={item}> {item}</a>
                                        ))}
                                    </Card.Body>
                                </Card>
                                <br />
                            </Col>

                        ))}

                    </Row>
                </Container>

            </Layout>
        </>
    );
};//end of functional component Home
export default Home;//a statement to export the Home component
