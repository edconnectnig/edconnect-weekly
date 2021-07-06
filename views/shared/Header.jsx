//import statement used to import react and react-bootstrap components
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

//functional component Header
const Header = (props) => {
    const { user } = props;
    const [data, setData] = useState(user || '');
    const [searchWord, setSearchWord] = useState('');
    var val = '';

    const handleInputChange = event => {
        const { value } = event.target;
        setSearchWord(value);
    }

    /*This return statement indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */

    return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <Navbar bg="primary" expand="lg" variant="dark" className="justify-content-between" position="fixed">
                <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Form inline method="get" action={`/projects/search?search_by=name&searchTerm=${searchWord}`}>
                            <FormControl placeholder="Search Projects" name="searchTerm" value={searchWord} id="search_item" onChange={handleInputChange} />
                            <input type="hidden" value="name" name="search_by" />
                            <Button variant="outline-light" disabled={searchWord ? false : true} type="submit" id="mybutton">Search</Button>
                    </Form>
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px',display:"inline-block" }}
                        navbarscroll
                    >
                        <Nav>
                            <Nav.Link href="/projects/search"><span class="text-light">Projects</span></Nav.Link>
                            <Nav.Link href="/projects/submit"><span class="text-light">Submit</span></Nav.Link>
                        </Nav>
                    </Nav>

                    {data ?
                        <Nav className="justify-content-end">
                            <Nav.Link href="/logout"><span class="text-light">Logout</span></Nav.Link>
                            <Nav.Link id="username"><span class="text-light">Hi {data.firstname}</span></Nav.Link>
                        </Nav>
                        :
                        <Nav className="justify-content-end">
                            <Nav.Link href="/signup"><span class="text-light">Sign Up</span></Nav.Link>
                            <Nav.Link href="/login"><span class="text-light">Login</span></Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    );//end of return statement
}//end of functional component
export default Header;//exports the Header component in order to be able to import it from another component.