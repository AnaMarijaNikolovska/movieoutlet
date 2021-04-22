import React, {useContext, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {navigate} from "@reach/router";

export default function LogIn() {


    const [account, setAccount] = useState({
        username: "",
        password: ""
    })

    const BasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

    }

    return (
        <>
            <h1 className={"mb-3"}>Login</h1>
            <Jumbotron >
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter username" value={account.username}
                                      onChange={handleChange("username")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={account.password}
                                      onChange={handleChange("password")}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
        </>
    )
}