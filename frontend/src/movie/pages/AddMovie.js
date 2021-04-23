import React, {useEffect, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {GetAllCategories} from "../../categories/CategoryService";
import {navigate} from "@reach/router";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {SaveMovie} from "../MovieService";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Col from "react-bootstrap/Col";

export default function AddMovie(props) {

    const [categories, setCategories] = useState([]);
    const [movie, setMovie] = useState({
        name: "",
        categoriesId: [],
        actorsId: [],
        releaseDate: new Date(),
        description: "",
    });

    const [moviePicture, setMoviePicture] = useState(null);

    useEffect(() => {
        GetAllCategories().then(r => {
                const tempCategoriesArray = []
                r.data.forEach(category => {
                    const newCategory = {
                        key: category.id,
                        label: category.name
                    }

                    tempCategoriesArray.push(newCategory);
                });
                setCategories(tempCategoriesArray);
            }
        );
    }, [])

    const handleChange = name => event => {
        setMovie({...movie, [name]: event.target.value});
    };

    const handleDateChange = date => {
        setMovie({...movie, releaseDate: date});
    }

    const handleDrop = event => {
        let file = event.target.files[0];
        setMoviePicture(file);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("movieDto", new Blob([JSON.stringify({...movie})], {
            type: "application/json"
        }));
        formData.append("moviePicture", moviePicture);
        SaveMovie(formData).then(r => navigate(`/movies/${r.data.id}`))
    }

    return (
        <div>
            <h1 className={"mb-3"}>Movie</h1>
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name of the movie" value={movie.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        {categories && categories.length > 0 && <DropdownMultiselect
                            options={categories}
                            name="categories"
                            placeholder={"Categories"}
                            handleOnChange={(selected) => {
                                setMovie({...movie, categoriesId: selected});
                            }}
                        />}
                    </Form.Group>

                    <Form.Row className={"text-left"}>
                        <Form.Group as={Col}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} rows={12} placeholder="Enter movie description"
                                          value={movie.description}
                                          onChange={handleChange("description")}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Calendar
                                className={"text-center"}
                                onChange={handleDateChange}
                                value={movie.releaseDate}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.File onChange={handleDrop}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    )
}
