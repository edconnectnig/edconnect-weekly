//imports react components used in the code
import React,{useState,useEffect} from 'react';
import {Row,Col,Jumbotron,Container,Button,Card} from 'react-bootstrap';
import Layout from './shared/Layout';

//functional component named Home
const Home = () => {

    //set a state called 'data' using useState Hook
    const [data, setData] = useState();
   
    /* useEffect Hook used to fetch all available projects from the server and sets the response as the value of data 
    using the setData() method 
    Note: the second parameter of the useEffect indicates that it renders just once*/
    useEffect(() => {
    fetch("/api/projects").then(async(response)=>{
    setData(await response.json());
    
})},[])//end of useEffect 
    
    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
        <Layout>
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
                
                    {data && data.slice(0,4).map((item) => (
                    
                    <Col keys={item.id}> 
                        
                        <Card keys={item.id}> 
                            <Card.Body keys={item.id}>
                                <Card.Link href = {`/projects/${item.id}`} keys={item.name}>{item.name}</Card.Link> 
                                <br/> {item.authors} <br/><br/> {item.abstract}  <br/><br/>
                                <Card.Link keys={item.tags}> {item.tags}</Card.Link>
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
