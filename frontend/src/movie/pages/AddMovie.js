import React, {useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {SaveCategory} from "../../categories/CategoryService";
import {navigate} from "@reach/router";

export default function AddMovie(){

    const [movie, setMovie] = useState({
        name: "",
        category:"",
        actors:"",
        releaseDate:"",
        description:"",
    })


    const handleChange = name => event => {
        setMovie({...movie, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        SaveCategory(movie).then(r => navigate(`/category/${r.data.id}`))
    }

    return(
        <div>
                <h1 className={"mb-3"}>Movie</h1>
                <Jumbotron >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter name of the movie" value={movie.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} rows={3} placeholder="Enter movie description" value={movie.description}
                                          onChange={handleChange("description")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control placeholder="Enter category of the movie" value={movie.category}
                                          onChange={handleChange("category")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter name of the movie" value={movie.releaseDate}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
        </div>
    )
}