//import statement used to import react and react-bootstrap components
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

//functional component Header
const Header = (props) => {
    const {user} = props;
    const [data, setData] = useState(user || '');
    const [searchWord, setSearchWord] = useState('');
    var val = '';

    const handleInputChange = event => {
        const {value} = event.target;
        setSearchWord(value);
    }

    /*This return statement indicates the value returned to the App.jsx file and is rendered on the screen
      It contains react bootstrap components, styling, and also basic html tags
      The <Layout></Layout> is a component that houses the header(navbar), the main content(which is what is returned),
      and the Footer
    */

    return (
        <>
            <Navbar bg="primary" variant="dark" className="justify-content-between">
                <Nav>
                    <Navbar.Brand href="/">Project Explorer</Navbar.Brand>

                    <Form inline method="get" action={`/projects/search?search_by=name&searchTerm=${searchWord}`}>
                        <FormControl placeholder="Search Projects"  name="searchTerm" value={searchWord} id="search_item" onChange={handleInputChange}/>
                        <input type="hidden" value="name" name="search_by" />
                        <Button variant="outline-light" disabled={searchWord ? false : true} type="submit" id="mybutton">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="/projects/search">Projects</Nav.Link>
                        <Nav.Link href="/projects/submit" id="nav_submit">Sumbit</Nav.Link>
                    </Nav>
                </Nav>

                {data ?
                    <Nav className="justify-content-end">
                        <Nav.Link href="/logout">Logout</Nav.Link>
                        <Nav.Link id="username">Hi {data.firstname}</Nav.Link>
                    </Nav>
                    :
                    <Nav className="justify-content-end">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                }
            </Navbar>
        </>
    );//end of return statement
}//end of functional component
export default Header;//exports the Header component in order to be able to import it from another component.