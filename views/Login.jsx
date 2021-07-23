//import statement that imports react components to be used in the code
import React,{useState} from 'react';
import { Form, InputGroup, Button, FormControl,Alert } from 'react-bootstrap';
//import statement that imports the Layout component to be used in the code
import Layout from './shared/Layout';

//functional component Login that houses all code
const Login = (props) => {
    const {current_user, login_errors,login_body} = props;
    //declaration of states and their function using useState 
    const [email,setEmail] = useState(login_body[0]?.email || '');
    const [password, setPassword] = useState(login_body[0]?.password || '');
    const [errors, setErrors] = useState(login_errors || '');
  
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
  
    /*the content of the return statement is displayed on the screen.
    This return statement indicates the value returned to the App.jsx file and is rendered on the screen. 
    It contains react bootstrap components, styling, and also basic html tags.
    The <Layout></Layout> is a component that houses the header(navbar),the main content(which is what is returned),
    and the Footer.
    */
    return (
        <>
            <Layout user={current_user}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <Form className="p-5" style={{margin:"0vw 10vw 0vw 10vw"}} id="loginForm" action="/login" method="post">
                    
                    <h1>Login</h1>
                  <div id="error" style={{width:"60vw"}}>{errors.length > 0 ? <Alert variant="danger" id="error">{errors}</Alert> : null}</div>
                    
                    <Form.Group>
                        <Form.Label className="contentNoWrap">Email Address: </Form.Label>
                        <InputGroup class="col-15" style={{width : "60vw"}}>
                            <FormControl type="email" name="email" placeholder="Enter email" value={email} onChange={handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <InputGroup class="col-15" style={{width : "60vw"}}>
                            <FormControl type="password" name="password" placeholder="Password" value={password} onChange={handleInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Button varaiant="primary" type="submit">Login</Button>
                </Form>
            </Layout>
        </>
    );
}
export default Login;// export the login component