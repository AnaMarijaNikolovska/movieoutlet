import axios from "axios";

const GetAllMovieCrew = () => {
    return axios.get("/movie-persons");
}

const GetMovieCrewDetails = (moviepersonId) => {
    return axios.get(`movie-persons/${moviepersonId}`);
}

const SaveMovieCrew = (moviePersonForm) => {
    return axios.post("movie-persons", moviePersonForm);
}

const EditMovieCrew = (moviepersonId, moviePersonForm) => {
    return axios.put(`movie-persons/${moviepersonId}`, moviePersonForm);
}

const DeleteMovieCrew = (moviepersonId) => {
    return axios.delete(`movie-persons/${moviepersonId}`);
}

const PersonRole = {
    Actor: "Actor",
    Director: "Director",
    Producer: "Producer",
    Writer: "Writer",
    CostumeDesigner: "CostumeDesigner",
    Cinematographer: "Cinematographer",
    Editor: "Editor",
}

export {GetAllMovieCrew, GetMovieCrewDetails, SaveMovieCrew, EditMovieCrew, DeleteMovieCrew, PersonRole}
