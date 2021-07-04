//import statement used to import react components and react-bootstrap components to be used in the code
import React from 'react';
import {Jumbotron} from 'react-bootstrap';

//functional component Footer 
const Footer = () => {
    /*This return indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */
    return(
        <>
            <Jumbotron style={{marginLeft :'70px', marginRight: '80px', marginTop: '30px', padding:'20px',width:'1200px'}}>
                Project Explorer &copy; 2020 - <b>Edconnect</b>
            </Jumbotron>
        </>
    );//end of return statement
}//end of functional component Footer
export default Footer;//exports Footer component to where it will be used