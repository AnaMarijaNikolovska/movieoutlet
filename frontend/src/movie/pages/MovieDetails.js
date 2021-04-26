import React, {useContext, useEffect, useState} from "react";
import {DeleteMovie, GetMovieDetails} from "../MovieService";
import NoPhoto from "../../assets/movie.jpg";
import MovieCrewCard from "../../components/MovieCrewCard";
import {accountContext} from "../../components/accountContext";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link, navigate} from "@reach/router";
import EditMovieModal from "../modals/EditMovieModal";
import Card from "react-bootstrap/Card";


export default function MovieDetails(props) {
    const [movie, setMovie] = useState(null);
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);
    const authData = useContext(accountContext);

    useEffect(() => {
        GetMovieDetails(props.movieId)
            .then(r => {
                setMovie(r.data);
            });
    }, [showEditMovieModal])

    return (
        <div>
            {movie && <div>
                <Card>
                    <Card.Img style={{"height": "550px", width: "100%"}} variant="top" src={movie.picture
                        ? ("data:image/png;base64," + movie.picture)
                        : NoPhoto}
                              alt="movie image"/>
                    <Card.Body>
                        <Card.Title>{movie.name}</Card.Title>
                        <Card.Text>
                            {movie.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup horizontal={"md"} className="list-group-flush">
                        <ListGroupItem>Categories: </ListGroupItem>
                        {movie.categories && movie.categories.length > 0 && movie.categories.map(category =>
                            <ListGroupItem key={category.id}>
                                <Link to={`/category/${category.id}`}>{category.name} </Link>
                            </ListGroupItem>)}
                    </ListGroup>
                    <ListGroup horizontal={"md"} className="list-group-flush">
                        <ListGroupItem>Release Date: {movie.releaseDate.split('T')[0]}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {authData.user && <div>
                            <Button className={"mr-3"} onClick={() => setShowEditMovieModal(true)}>Edit</Button>
                            <Button variant={"danger"}
                                    onClick={() => DeleteMovie(movie.id).then(() => navigate("/movies"))}>Delete</Button>

                            {showEditMovieModal &&
                            <EditMovieModal movie={movie} show={showEditMovieModal}
                                            onHide={() => setShowEditMovieModal(false)}/>}
                        </div>}
                    </Card.Body>
                </Card>
                <div className={"mt-4"}>
                    <h2>Movie Crew</h2>
                    <div className={"row"}>
                        {movie.moviePeople && movie.moviePeople.length > 0 && movie.moviePeople.map(person => <div
                            className={"col-md-3"}
                            key={person.id}>
                            <MovieCrewCard id={person.id} name={person.name} surname={person.surname}
                                           picture={person.picture}/>
                        </div>)}
                    </div>
                </div>
            </div>}
        </div>
    )
}
