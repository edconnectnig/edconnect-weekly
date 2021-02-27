//imports react components used in the code
import {Row,Col,Jumbotron,Container,Button,Card} from 'react-bootstrap';
import Layout from './shared/Layout';

//functional component named Home
const Home = (props) => {

    //destructing props
    const {projectData, user} = props;
    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
        <Layout user={user}>
            <Jumbotron style={{marginLeft :'80px', marginRight: '80px', marginTop: '30px'}}>
                <div> 
                    <h1>Welcome to Project Explorer</h1>
                </div>
                <p>
                    Projects Explorer is repository for final year projects across all departments at your institution.You can
                    submit your project and search projects submitted by others to learn from.<br/><br/>

                </p>
                <Button href="/signup" variant="primary">Get Started</Button>
                <Button href="/login" variant="secondary">Login</Button>
            </Jumbotron>
           
           <Container>
              
               <Row className="showcase">
                
                    {projectData && projectData.slice(0,4).map((item) => (
                    
                    <Col keys={item.id}> 
                        <Card keys={item.id}> 
                            <Card.Body keys={item.id}>
                                <a href = {`/project/${item.id}`} keys={item.name}>{item.name}</a> 
                                <br/> {item.authors} <br/><br/> {item.abstract}  <br/><br/>
                                <a href keys={item.tags}> {item.tags}</a>
                            </Card.Body>
                        </Card> 
                    </Col>
                
                    ))}
                       
               </Row>
           </Container>

        </Layout>
    </>
    );
};//end of functional component Home
export default Home;//a statement to export the Home component
