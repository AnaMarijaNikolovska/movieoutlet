import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "@reach/router";

export default function Header() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to={"/"} className={"navbar-brand"}>MovieOutlet</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={"/movies"} className={"nav-link"}>Movies</Link>
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            <Link to={"/category/add"} className={"dropdown-link"}>Add Category</Link>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Link to={"/login"} className={"nav-link"}>LogIn</Link>
                        <Link to={"/register"} className={"nav-link"}>Register</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}