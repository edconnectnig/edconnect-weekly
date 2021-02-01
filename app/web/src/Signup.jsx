//imports react component used in the code
import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Form,FormControl,Container,Row,Col,Button,InputGroup,Alert} from 'react-bootstrap';
import Layout from './shared/Layout';//import Layout component from the web/src/shared folder to this code
import {getCookie} from './shared/Header';//imports getCookie() from Header component.

//functional component Signup  
const Signup = () => {
    //declaration of states and their functions using useState();
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState('');
    const [years, setYears] = useState([]);
    const [year,setYear] =useState('');
    const [firstName, setFirstName] = useState('');
    const [email,setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [matricNumber, setMatricNumber] = useState('');
    const [errors, setErrors] = useState();

    const history = useHistory();

    //useEffect function where a get request is made to get all programs available which renders once.
    useEffect(() => {
        fetch("/api/programs").then( async (response) => {
        setPrograms(await response.json());
        });
    },[]);

    useEffect(() => {
        fetch("/api/graduationYears").then(async (response) => {
        setYears(await response.json());
        });
    },[])
    
    useEffect(() => {
        if(getCookie("uid") !== ""){
            history.push("/");
        }
    },[])
    
    //function that is executed when the sign up button is clicked
    function checkSignup (event) {
        event.preventDefault();//prevents the form from performing default actions
        const data = {
            "firstname" : firstName,
            "lastname": lastName,
            "email": email,
            "password": password,
            "matricNumber": matricNumber,
            "program": program,
            "graduationYear": year
        }

    //a post request used to post the input values entered to the server
    fetch("/api/register",{
        method: 'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        }
    })
    .then(async (response) =>{
        var data = await response.json();
        if(data.status === "ok"){//checks if the response is ok and creates a cookie, redirects to home page
            document.cookie = `uid=${data.data.id};path=/`;
            console.log(document.cookie);
            history.push('/')
        }else if(data.status !== "ok"){//if response is false, error gotten fro the server is displayed on the screen
            setErrors(data.errors)
        }
    })
        
    }

    //function that handles changes made to input firlds such as typing letters, erasing letters, etc
    const handleInputChange = event => {
        //destructures the prameters into a name and values
        const {name, value} = event.target;

        //checks which name is currently being changed
        switch(name){
            case 'fname':
                setFirstName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'program':
                setProgram(value);
                break;
            case 'lname':
                setLastName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'mnumber':
                setMatricNumber(value);
                break;
            case 'year':
                setYear(value);
                break;
            default:
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
     
        <Layout>
            <h1 style={{marginLeft:'125px', marginTop:'10px'}}>Sign Up</h1>
            {errors ? <Alert variant="danger" style={{marginLeft:'120px', marginRight:'120px'}}>{errors.map((error) => <span key={error}>{error} <br/></span>)}</Alert> : null}
        <Form className="mr-10" controlid="signupForm" action="/api/register" method="POST">
        <Container>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>First Name: </Form.Label>
                        <InputGroup>
                            <FormControl name = "fname" placeholder="First Name" value = {firstName} onChange = {handleInputChange}/>
                        </InputGroup>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email Address: </Form.Label>
                        <InputGroup>
                            <FormControl name="email" value={email} placeholder="Your Email Address" onChange = {handleInputChange}/>
                        </InputGroup>
                    </Form.Group>
                   
                    <Form.Group>
                        <Form.Label>Program: </Form.Label>
                            <Form.Control as ="select" name="program" value={program} onChange={handleInputChange}>
                                <option>Choose</option>

                                {programs && programs.map((program) => (
                                    <option key={program}>{program}</option>
                                ))}
                            </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={checkSignup}>Sign Up</Button>
                </Col>
            
                <Col>
                    <Form.Group>
                        <Form.Label>Last Name: </Form.Label>
                        <InputGroup>
                            <FormControl name="lname" value={lastName} placeholder="Last Name" onChange= {handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password </Form.Label>
                        <InputGroup>
                            <FormControl type="password" name="password" value={password} placeholder="Your Password" onChange= {handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Matriculation Number: </Form.Label>
                                <InputGroup>
                                    <FormControl name="mnumber" value={matricNumber} placeholder="e.g 16/2020" onChange={handleInputChange}/>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                           <Form.Group>
                                <Form.Label>Graduation Year: </Form.Label>
                                <Form.Control as ="select" name="year" value={year} onChange={handleInputChange}>
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