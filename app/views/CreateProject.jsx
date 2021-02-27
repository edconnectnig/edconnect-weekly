//import statement used to import react and react-bootstrap components
import React, {useState} from 'react';
import Layout from './shared/Layout';
import { Form,InputGroup,Button,Alert } from 'react-bootstrap';

//functional component CreateProject
const CreateProject = (props) => {

    const {user,errors,body} = props;
    //declaration of states and theri corresponding function used to update the states
    const [name,setName] = useState(body[0]?.name || '');
    const [abstract,setAbstract] = useState(body[0]?.abstract || '');
    const [authors,setAuthors] = useState(body[0]?.authors || []);
    const [tags,setTags] = useState(body[0]?.tags || []);
    
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

    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return (
        <>
            <Layout user = {user}>
                    <Form id="createProjectForm" className="p-3" method="post" action="/projects/submit" style={{marginLeft:'350px',marginRight:'350px'}}>
                        <h3>Submit Project</h3>
                        {errors?.length > 0 ?<Alert variant="danger" id="error" style={{marginLeft:'0px', marginRight:'0px'}}>{errors.map((error) => <span key={error}>{error} <br/></span>)}</Alert>:null}
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
                           
                            <Button variant="primary" type="submit" id="continue">Continue</Button>
        
                    </Form>
            </Layout>
        </>
    )//end of return statement
}//end of component CreateProject
export default CreateProject;//exports the component CreateProject so that it can be imported from another component