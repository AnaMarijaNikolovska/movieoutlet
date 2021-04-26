import React, {useEffect, useState} from "react";
import {GetAllMovies} from "../MovieService";
import MovieCard from "../../components/MovieCard";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";

export default function ListMovies() {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        GetAllMovies()
            .then(r => setMovies(r.data));
    }, [])

    return (
        <div>
            <h1>Movies</h1>
            <Button variant={"success"} className={"text-right mb-2"} onClick={() => navigate("/movies/add")}>Add
                Movie </Button>
            <div className={"row"}>
                {movies && movies.length > 0 && movies.map(movie => <div key={movie.id} className={"col-md-3"}>
                    <MovieCard name={movie.name} picture={movie.picture} movieId={movie.id}/>
                </div>)}
            </div>
        </div>
    )
}
