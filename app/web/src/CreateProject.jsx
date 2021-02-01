//import statement used to import react and react-bootstrap components
import React, { useState,useEffect } from 'react';
import Layout from './shared/Layout';
import { useHistory } from "react-router-dom";
import {getCookie} from './shared/Header';//imports getCookie function from the Header component
import { Form,InputGroup,Button,Alert } from 'react-bootstrap';

//functional component CreateProject
const CreateProject = () => {

    //declaration of states and theri corresponding function used to update the states
    const [name,setName] = useState('');
    const [abstract,setAbstract] = useState();
    const [authors,setAuthors] = useState([]);
    const [tags,setTags] = useState([]);
    const [errors,setErrors] = useState();
    let history = useHistory();

    //function which is used to handle changes made to the input field such as typind a value
    const handleInputChange = (event) => {

        //destructing the argument value gotten from the event
        const {name,value} = event.target;

        //updates the state based on the name gotten from the event 
        switch(name){
            case 'name':
                setName(value);
                break;
            case 'abstract':
                setAbstract(value);
                break;
            case 'authors':
                setAuthors(value.split(","));
                break;
            case 'tags':
                setTags(value.split(" "));
                break;
            default://if none of the names matches 
        }
    }
    //a useEffect hook used to redirect to the login page if there is no cookie
    //this useEffect hook runs only once
    useEffect(() => {
        if(getCookie("uid") === ""){
            history.push("/login");
        }
    },[])

    //function createProject creates an object called data which contains the value
    //of all inputs entered into the input fields and then send the data object
    //to the server and waits for a response. If the response is ok, it redirects to the 
    //home page but if the response is not ok, it displays the error gotten from the server
    //in an Alert tag.
    function createProject () {
        const data = {
        "name" : name,
        "abstract" : abstract,
        "authors" : authors,
        "tags" : tags
    };
    console.log(data);

    fetch("/api/projects",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        },
    }).then(async(response)=>{
        var data =  await response.json();
       
        if(data.status === 'ok'){
            history.push("/")
        }else if(data.status !== 'ok'){
            setErrors(data.errors);
        }
    })
    }

    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
            <Layout>
                    <Form controlid="createProjectForm" className="p-3" style={{marginLeft:'350px',marginRight:'350px'}}>
                        <h3>Submit Project</h3>
                        {errors ?<Alert variant="danger"style={{marginLeft:'0px', marginRight:'0px'}}>{errors.map((error) => <span key={error}>{error} <br/></span>)}</Alert>:null}
                            <Form.Label>Project Name:</Form.Label><br />
                            <InputGroup>
                                <Form.Control name="name" value={name} id="projectName" placeholder="Enter Project Name" onChange={handleInputChange}/>
                            </InputGroup><br/>
                        
                            <Form.Label>Project Abstract: </Form.Label><br />
                            <InputGroup>
                                <Form.Control as = "textarea" name="abstract" value={abstract} id="projectAbstract" rows="4" cols="100" onChange={handleInputChange}/>
                            </InputGroup>
                            <br/>
                            
                            <Form.Label>Author(s): </Form.Label><br />
                            <InputGroup>
                                <Form.Control type="text" value={authors} name="authors" id="projectAuthors" placeholder="Enter author names (seperated by comma)" onChange={handleInputChange}/>
                            </InputGroup><br/>
                            
                            <Form.Label>Tag(s): </Form.Label><br />
                            <InputGroup>
                                <Form.Control type="text" value={tags} name="tags" id="projectTags" placeholder="Use # to tag project with different topics (e.g #javascript #mongodb)" onChange={handleInputChange}/>
                            </InputGroup><br/>
                           
                            <Button variant="primary" id="continue" onClick={createProject}>Continue</Button>
        
                    </Form>
            </Layout>
        </>
    )//end of return statement
}//end of component CreateProject
export default CreateProject;//exports the component CreateProject so that it can be imported from another component