//import statement used to import react and react-bootstrap components
import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

/*The getCookie function takes a parameter which is the name of the cookie 
you wish to get its value in this case, it is "uid" and then it adds an "="
to the uid name and then splits the document.cookie to get the main value.
the function getCookie(arg) is used to get the cookie value i.e in a cookie expression uid=value, 
the getCookie removes the "uid=" and returns the value.
The word export at the beginning of the function definition indicates that
the getCookie function is exported and can be used in other components if imported.
*/
var cookie = 0;
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookie);//removes all special characters if any from the document.cookie
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        console.log(c);
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";// this empty string is returned if no cookie with the specified name was found
}

//functional component Header
const Header = (props) => {
    const {user} = props;
    const [data, setData] = useState(user || '');
    console.log(user);
    console.log(data);
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

                    <Form inline>
                        <FormControl placeholder="Search Projects" id="search_item" />
                        <Button variant="outline-light" type="submit" id="mybutton">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="/projects">Projects</Nav.Link>
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