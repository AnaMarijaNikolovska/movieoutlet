import React, {useContext, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {navigate} from "@reach/router";
import Col from "react-bootstrap/Col";

export default function Register() {

    const [account, setAccount] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        email: "",
    });

    const [accountPicture, setAccountPicture] = useState(null);

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setAccountPicture(file);
    }

    const BasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    const handleSubmit = event => {
        event.preventDefault();

    }

    return (
        <>
            <h1 className={"mb-3"}>Register</h1>
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={account.email}
                                          onChange={handleChange("email")}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={account.password}
                                          onChange={handleChange("password")}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter Username" value={account.username}
                                      onChange={handleChange("username")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={account.name} onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control placeholder="Enter Surname" value={account.surname}
                                      onChange={handleChange("surname")}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.File onChange={handleDrop}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
        </>
    )
}