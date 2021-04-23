import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {EditCategory} from "../CategoryService";

export default function EditCategoryModal(props) {
    const [category, setCategory] = useState({
        name: props.category.name ?? "",
        description: props.category.description ?? "",
    });

    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        EditCategory(props.category.id, category).then(() => window.location.reload());
    }

    return (

        <Modal {...props}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name" value={category.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={"textarea"} rows={3} placeholder="Password" value={category.description}
                                      onChange={handleChange("description")}/>
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
