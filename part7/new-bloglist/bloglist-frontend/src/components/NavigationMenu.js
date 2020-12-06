import React from 'react'
import LoggedIn from './LoggedIn'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap' 

const NavigationMenu = () => {
    const padding = {
        padding: 5
    }
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                <LoggedIn />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationMenu