import axios from "axios";

const GetAllMovies = () => {
    return axios.get("/movies");
}

const GetAllMoviesByCategory = (categoryId) => {
    return axios.get(`/movies/category/${categoryId}`);
}

const GetAllMoviesByCrewMember = (personId) => {
    return axios.get(`/movies/actor/${personId}`);
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
    return axios.delete(`movies/${movieId}`);
}

export {
    GetAllMovies,
    GetMovieDetails,
    SaveMovie,
    EditMovie,
    DeleteMovie,
    GetAllMoviesByCategory,
    GetAllMoviesByCrewMember
}
