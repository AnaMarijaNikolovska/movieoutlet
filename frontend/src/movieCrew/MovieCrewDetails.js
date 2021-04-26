import React, {useContext, useEffect, useState} from "react";
import {DeleteMovieCrew, GetMovieCrewDetails} from "./MovieCrewService";
import NoPhoto from "../assets/user.jpg";
import {accountContext} from "../components/accountContext";
import {Button, Card} from "react-bootstrap";
import {navigate} from "@reach/router";
import MovieCrewModal from "./modals/MovieCrewModal";
import MovieCard from "../components/MovieCard";
import {GetAllMoviesByCrewMember} from "../movie/MovieService";

export default function MovieCrewDetails(props) {
    const [moviePerson, setMoviePerson] = useState(null);
    const [movies, setMovies] = useState(null);
    const [showEditMoviePerson, setShowEditMoviePerson] = useState(false);
    const authContext = useContext(accountContext);

    useEffect(() => {
        GetMovieCrewDetails(props.personId)
            .then(r => {
                setMoviePerson(r.data);
                GetAllMoviesByCrewMember(r.data.id)
                    .then(res => setMovies(res.data));
            })
    }, [showEditMoviePerson])

    return (
        <div>
            {moviePerson && <Card>
                <Card.Img height={400} variant={"top"} alt={"crew-member"} src={moviePerson.picture
                    ? ("data:image/png;base64," + moviePerson.picture)
                    : NoPhoto}/>

                <Card.Body>
                    <h3>{moviePerson.name + " " + moviePerson.surname}</h3>
                    <p>{moviePerson.personRole}</p>
                    {authContext.user != null && <div>
                        <Button variant={"info"} className={"mr-3"}
                                onClick={() => setShowEditMoviePerson(true)}>Edit</Button>
                        <Button variant={"danger"} onClick={() => DeleteMovieCrew(moviePerson.id)
                            .then(() => navigate("/movie-crew")
                                .then(() => alert("Crew Member was successfully deleted")))}>Delete</Button>

                        {showEditMoviePerson === true &&
                        <MovieCrewModal person={moviePerson} show={showEditMoviePerson}
                                        onHide={() => setShowEditMoviePerson(false)}/>}
                    </div>}

                    <div className={"row"}>
                        {movies && movies.length > 0 && movies.map(movie => <div className={"col-md-3"} key={movie.id}>
                            <MovieCard movieId={movie.id} name={movie.name} description={movie.description}
                                       picture={movie.picture}/>
                        </div>)}
                    </div>
                </Card.Body>
            </Card>}
        </div>
    )
}
