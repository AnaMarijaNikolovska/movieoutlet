import axios from "axios";

const GetAllMovies = () => {
    return axios.get("/movies");
}

const GetMovieDetails = (movieId) => {
    return axios.get(`movies/${movieId}`);
}

const SaveMovie = (movieForm) => {
    return axios.post("movies", movieForm);
}

const EditMovie = (movieId, movieForm) => {
    return axios.put(`movies/${movieId}`, movieForm);
}

const DeleteMovie = (movieId) => {
    return axios.delete(`movie/${movieId}`);
}

export {GetAllMovies, GetMovieDetails, SaveMovie, EditMovie, DeleteMovie}