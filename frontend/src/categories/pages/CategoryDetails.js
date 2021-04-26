import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {navigate} from "@reach/router";
import {DeleteCategory, GetCategoryDetails} from "../CategoryService";
import EditCategoryModal from "../modals/EditCategoryModal";
import {accountContext} from "../../components/accountContext";
import {GetAllMoviesByCategory} from "../../movie/MovieService";
import MovieCard from "../../components/MovieCard";

export default function CategoryDetails(props) {
    const [category, setCategory] = useState(null);
    const [movies, setMovies] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const accountData = useContext(accountContext);

    useEffect(() => {
        GetCategoryDetails(props.categoryId).then(r => {
            setCategory(r.data);

            GetAllMoviesByCategory(r.data.id)
                .then(res => setMovies(res.data));
        })
    }, [showEditModal, props.categoryId])


    return (
        <div>
            {category != null && <Card>
                <Card.Title className={"mt-3"}><h2>Category Details</h2></Card.Title>
                <Card.Body>
                    <div className={"card-details"}>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>

                    {accountData.user && <>
                        <div className={"row"}>
                            <hr style={{width: "80%"}}/>
                        </div>

                        <Button className={"mr-3"} onClick={() => setShowEditModal(true)}> Edit Category </Button>
                        <Button variant={"success"} className={"mr-3"}
                                onClick={() => navigate("/movies/add", {state: {categoryId: category.id}})}> Add
                            Movie </Button>
                        <Button variant={"danger"}
                                onClick={() => DeleteCategory(props.categoryId).then(() => navigate("/").then(() => window.location.reload()))}>Delete</Button>
                    </>}

                    {showEditModal === true &&
                    <EditCategoryModal show={showEditModal} onHide={() => setShowEditModal(false)}
                                       category={category}/>}
                </Card.Body>
                <Card.Body>
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
