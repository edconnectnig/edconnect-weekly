//import statement that imports react components to be used in the code
import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Form, InputGroup, Button, FormControl,Alert } from 'react-bootstrap';
//import statement that imports the Layout component to be used in the code
import Layout from './shared/Layout';

//functional component Login that houses all code
const Login = () => {
    //declaration of states and their function using useState 
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();

    //function that handles changes made to input fields in forms such as when a value is entered
    const handleInputChange = event => {
        //destructing of the parameters passed with the event target
        const {name, value} = event.target;

        //a switch statement that checks the current input field undergoing via their name value a change and updates it
        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:// a default option used when no condition is met
        }//end of switch statement
    }//end of function
  
    /*a function that performs a post request of the data gotten from the input field to the server
      and creates a cookie, redirects to the home page if the reponse is ok, otherwise, it displays
      the error gotten fron the server on the screen in an Alert bootstrap component.
    */
    function loginButton (event) {
        event.preventDefault();/*this statement prevents the form from performing specific actions by default e.g
        submitting by default and then making a post request to an unknown destination*/
        const data = {
        "email": email,
        "password":password
    };
    
    fetch("api/login",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(async(response) => {
        var data = await response.json();
        console.log(response)
        if(response.status === 200){
            document.cookie = `uid=${data.data.id};path=/`;
            console.log(document.cookie)
            history.push("/");//redirects to the home page
        }else if(response.status !== 200){
           setErrors("Invalid email/password")
        }
    })
    }
    /*the content of the return statement is displayed on the screen.
    This return statement indicates the value returned to the App.jsx file and is rendered on the screen. 
    It contains react bootstrap components, styling, and also basic html tags.
    The <Layout></Layout> is a component that houses the header(navbar),the main content(which is what is returned),
    and the Footer.
    */
    return (
        <>

            <Layout>
                <Form className="p-5" style={{marginLeft: '300px',marginRight:'300px'}} id="loginForm" action="/api/login" method="POST">
                    <h1>Login</h1>
                    {errors ? <Alert variant="danger" style={{marginLeft: '0px',marginRight:'0px'}}>{errors}</Alert> : null}
                    <Form.Group>
                        <Form.Label>Email Address: </Form.Label>
                        <InputGroup>
                            <FormControl type="email" name="email" placeholder="Enter email" value={email} onChange={handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <InputGroup>
                            <FormControl type="password" name="password" placeholder="Password" value={password} onChange={handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Button varaiant="primary" type="submit" onClick={loginButton}>Login</Button>
                </Form>
            </Layout>
        </>
    );
}
export default Login;// export the login component