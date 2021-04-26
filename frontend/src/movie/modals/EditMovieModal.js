import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/cjs/Modal";
import {EditMovie} from "../MovieService";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Col from "react-bootstrap/Col";
import Calendar from "react-calendar";
import {GetAllCategories} from "../../categories/CategoryService";
import {GetAllMovieCrew} from "../../movieCrew/MovieCrewService";

export default function EditMovieModal(props) {
    const [movie, setMovie] = useState({
        name: props.movie?.name ?? "",
        categoriesId: [],
        actorsId: [],
        releaseDate: props.movie ? new Date(props.movie.releaseDate) : new Date(),
        description: props.movie?.description ?? "",
    });

    const [moviePicture, setMoviePicture] = useState(null);
    const [movieCrew, setMovieCrew] = useState([]);
    const [categories, setCategories] = useState([]);

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
        EditMovie(props.movie.id, formData).then(() => props.onHide());
    }

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
        GetAllMovieCrew().then(r => {
            const tempCrewArray = [];
            r.data.forEach(moviePerson => {
                const newPerson = {
                    key: moviePerson.id,
                    label: moviePerson.name + " " + moviePerson.surname
                }

                tempCrewArray.push(newPerson);
            });
            setMovieCrew(tempCrewArray);
        });
    }, [])


    return (
        <Modal {...props}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered className={"text-center"}>
            <Modal.Title>Edit Movie</Modal.Title>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name of the movie" value={movie.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Categories</Form.Label>
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
                        <Form.Label>Movie Crew</Form.Label>
                        {movieCrew && movieCrew.length > 0 && <DropdownMultiselect
                            options={movieCrew}
                            name="crew"
                            placeholder={"Movie Crew"}
                            handleOnChange={(selected) => {
                                setMovie({...movie, actorsId: selected});
                            }}
                        />}
                    </Form.Group>

                    <Form.Group>
                        <Form.File onChange={handleDrop}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
