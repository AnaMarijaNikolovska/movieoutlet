import axios from "axios";

const GetAllMovieCrew = () => {
    return axios.get("/movieperson");
}

const GetMovieCrewDetails = (moviepersonId) => {
    return axios.get(`movieperson/${moviepersonId}`);
}

const SaveMovieCrew = (moviePersonForm) => {
    return axios.post("movieperson", moviePersonForm);
}

const EditMovieCrew = (moviepersonId, moviePersonForm) => {
    return axios.put(`movieperson/${moviepersonId}`, moviePersonForm);
}

const DeleteMovieCrew = (moviepersonId) => {
    return axios.delete(`movieperson/${moviepersonId}`);
}

export {GetAllMovieCrew, GetMovieCrewDetails, SaveMovieCrew, EditMovieCrew, DeleteMovieCrew}