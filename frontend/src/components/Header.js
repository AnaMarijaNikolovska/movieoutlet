import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "@reach/router";
import {accountContext} from "./accountContext";
import {Button} from "react-bootstrap";
import {GetAllCategories} from "../categories/CategoryService";

export default function Header() {
    const [categories, setCategories] = useState(null);
    const accountData = useContext(accountContext);

    useEffect(() => {
        GetAllCategories()
            .then(r => setCategories(r.data))
    }, [])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to={"/"} className={"navbar-brand"}>MovieOutlet</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to={"/movies"} className={"nav-link"}>Movies</Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        {accountData.user && <>
                            <Link to={"/category/add"} className={"dropdown-item"}>Add Category</Link>
                            <NavDropdown.Divider/>
                        </>}
                        {categories && categories.length > 0 && categories.map(category =>
                            <Link key={category.id} className={"dropdown-item"}
                                  to={`/category/${category.id}`}>{category.name}
                            </Link>)}
                    </NavDropdown>

                    <Link to={"/movie-crew"} className={"nav-link"}>Crew</Link>

                </Nav>
                <Nav>
                    {!accountData.user
                        ? <> <Link to={"/login"} className={"nav-link"}>Log In</Link>
                            <Link to={"/register"} className={"nav-link"}>Register</Link>
                        </>
                        : <>
                            <Link to={`/account/${accountData.user.username}`} className={"nav-link"}>
                                {accountData.user.username}
                            </Link>
                            <Button variant={"link"} className={"nav-link"}
                                    onClick={accountData.logoutUser}>Logout</Button>
                        </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
