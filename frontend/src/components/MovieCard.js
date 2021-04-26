import React from "react";
import Card from "react-bootstrap/Card";
import {Link} from "@reach/router";
import NoPhoto from "../assets/movie.jpg"

export default function MovieCard(props) {
    return (
        <div className="image-flip">
            <div className="mainflip flip-0">
                <div className="frontside">
                    <Card style={{minHeight: '260px', minWidth: "260px"}}>
                        <Card.Body className="flex-center-column text-center">
                            <Card.Img
                                src={props.picture
                                    ? ("data:image/png;base64," + props.picture)
                                    : NoPhoto}
                                alt="card image"/>
                            <Card.Title className={"mt-4"}>{props.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className="backside">
                    <Card style={{minHeight: '260px', minWidth: "260px"}}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <Link to={`/movies/${props.movieId}`}>View More</Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}
