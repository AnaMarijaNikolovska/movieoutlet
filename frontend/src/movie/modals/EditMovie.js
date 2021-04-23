import React from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/cjs/Modal";

export default function EditMovie(props) {
    return (
        <div>
            <Modal>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title of the Movie</Form.Label>
                        <Form.Control placeholder="Enter name of the movie"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Write a short description about the movie"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Write a short description about the movie"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Example file input"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </div>
    )
}