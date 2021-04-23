import React, {useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import {SaveCategory} from "../CategoryService";

export default function AddCategory() {


    const [category, setCategory] = useState({
        name: "",
        description: ""
    })


    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        SaveCategory(category).then(r => navigate(`/category/${r.data.id}`).then(() => window.location.reload()))
    }

    return (
        <>
            <h1 className={"mb-3"}>Category</h1>
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
        </>
    )
}
