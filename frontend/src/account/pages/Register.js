import React, {useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import Col from "react-bootstrap/Col";
import {AccountCredentials, AddAccount} from "../AccountService";

export default function Register() {

    const [account, setAccount] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        mail: "",
    });

    const [accountPicture, setAccountPicture] = useState(null);

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setAccountPicture(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("accountDto", new Blob([JSON.stringify({...account})], {
            type: "application/json"
        }));
        formData.append("accountPicture", accountPicture);
        AddAccount(formData)
            .then(res => {
                let credentials = AccountCredentials(res.data.username, res.data.password);
                sessionStorage.setItem('accountCredentials', credentials);
                navigate(`/account/${res.data.username}`).then(() => window.location.reload());
            })
    }

    return (
        <>
            <h1 className={"mb-3"}>Register</h1>
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Username" value={account.username}
                                          onChange={handleChange("username")}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={account.password}
                                          onChange={handleChange("password")}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={account.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control placeholder="Enter Surname" value={account.surname}
                                          onChange={handleChange("surname")}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label type="email">Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={account.mail}
                                      onChange={handleChange("mail")}/>
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
