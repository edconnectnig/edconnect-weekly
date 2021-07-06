//imports react component used in the code
import React, { useState} from 'react';
import { Form, FormControl, Container, Row, Col, Button, InputGroup, Alert } from 'react-bootstrap';
import Layout from './shared/Layout';//import Layout component from the web/src/shared folder to this code

//functional component Signup  
const Signup = (props) => {
    //destructing props
    const { programs, errors, years, body, user } = props;
    
    // declaration of states and their functions using useState();
    const [program, setProgram] = useState(body[0]?.program || '');
    const [year, setYear] = useState(body[0]?.graduationYear || '');
    const [firstName, setFirstName] = useState(body[0]?.firstName || '');
    const [email, setEmail] = useState(body[0]?.email || '');
    const [lastName, setLastName] = useState(body[0]?.lastName || '');
    const [password, setPassword] = useState(body[0]?.password || '');
    const [matricNumber, setMatricNumber] = useState(body[0]?.matricNumber || '');

    
    //function that handles changes made to input firlds such as typing letters, erasing letters, etc
    const handleInputChange = event => {
        //destructures the prameters into a name and value
        const { name, value } = event.target;

        //checks which name is currently being changed
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break; 
            case 'email':
                setEmail(value);
                break;
            case 'program':
                setProgram(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'matricNumber':
                setMatricNumber(value);
                break;
            case 'graduationYear':
                setYear(value);
                break;
            default:
                break;
        }

    }
    //return statement content displayed on the screen.
    /*This return statement indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags.
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
            <Layout user={user}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <Form id="signupForm" action="/signup" method="post" style={{margin:"2vw 25vw 0vw 10vw"}}>
                     <h1>Sign Up</h1>
                    <div id="error"> {errors?.length > 0 ? <Alert variant="danger" id="error" style={{ margin: '1vw 6vw 2vw 6vw' }}>
                    {errors.map((error) =><span key={error}>{error} <br /></span>)}</Alert> : null} </div>

                    <Container>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name: </Form.Label>
                                    <InputGroup>
                                        <FormControl name="firstName" placeholder="First Name" value={firstName} onChange={handleInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email Address: </Form.Label>
                                    <InputGroup>
                                        <FormControl name="email" value={email} placeholder="Your Email Address" onChange={handleInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Program: </Form.Label>
                                    <Form.Control as="select" name="program" value={program} onChange={handleInputChange}>
                                        <option>Choose</option>

                                        {programs && programs.map((program) => (
                                            <option key={program}>{program}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">Sign Up</Button>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name: </Form.Label>
                                    <InputGroup>
                                        <FormControl name="lastName" value={lastName} placeholder="Last Name" onChange={handleInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password </Form.Label>
                                    <InputGroup>
                                        <FormControl type="password" name="password" value={password} placeholder="Your Password" onChange={handleInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Matriculation Number: </Form.Label>
                                            <InputGroup>
                                                <FormControl name="matricNumber" value={matricNumber} placeholder="e.g 16/2020" onChange={handleInputChange} />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Graduation Year: </Form.Label>
                                            <Form.Control as="select" name="graduationYear" value={year} onChange={handleInputChange}>
                                                <option>Choose</option>
                                                {years && years.map((year) => (
                                                    <option key={year}>{year}</option>
                                                ))}

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>

            </Layout>


        </>
    );//end of return statement
}//end of functiona; component
export default Signup;//exports Signup component.