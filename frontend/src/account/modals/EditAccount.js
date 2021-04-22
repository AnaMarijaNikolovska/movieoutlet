import React, {useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function EditAccount(props){
    const [account, setAccount] = useState({
        name: props.user.name ?? "",
        surname: props.user.surname ?? "",
        username: props.user.username ?? "",
        password: props.user.password ?? "",
        email: props.user.email ?? ""
    });

    const [accountPicture, setAccountPicture] = useState(null);

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

    }

    const handleDrop = event => {
        let file = event.target.files[0];
        setAccountPicture(file);
    }

    return (

            <Modal {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>

                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={account.email}
                                              onChange={handleChange("email")}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={account.username}
                                              onChange={handleChange("username")}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={account.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control placeholder="Enter Surname" value={account.surname}
                                          onChange={handleChange("surname")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.File onChange={handleDrop}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                        <Button variant="primary" type={"submit"}>Save changes</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
    )
}