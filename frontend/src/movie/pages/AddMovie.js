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
import {GetAllMovieCrew} from "../../movieCrew/MovieCrewService";
import MovieCrewModal from "../../movieCrew/modals/MovieCrewModal";

export default function AddMovie(props) {
    const [movie, setMovie] = useState({
        name: "",
        categoriesId: [],
        actorsId: [],
        releaseDate: new Date(),
        description: "",
    });
    const [showAddCrewPerson, setShowAddCrewPerson] = useState(false);
    const [movieCrew, setMovieCrew] = useState([]);
    const [categories, setCategories] = useState([]);

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
    }, [showAddCrewPerson])

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

                    <Form.Row className={"text-left"}>
                        <Form.Group as={Col} lg={10}>
                            {movieCrew && movieCrew.length > 0 && <DropdownMultiselect
                                options={movieCrew}
                                name="crew"
                                placeholder={"Movie Crew"}
                                handleOnChange={(selected) => {
                                    setMovie({...movie, actorsId: selected});
                                }}
                            />}
                        </Form.Group>
                        <Form.Group as={Col} lg={2}>
                            <Button variant={"outline-success"} style={{"borderRadius": "30px"}}
                                    onClick={() => setShowAddCrewPerson(true)}>
                                +
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.File onChange={handleDrop}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {showAddCrewPerson === true &&
                <MovieCrewModal show={showAddCrewPerson} onHide={() => setShowAddCrewPerson(false)}/>}
            </Jumbotron>
        </div>
    )
}
