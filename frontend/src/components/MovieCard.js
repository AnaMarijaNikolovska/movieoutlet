import React from "react";
import Card from "react-bootstrap/Card";

export default function MovieCard(){
    return (
        <div className="image-flip">
            <div className="mainflip flip-0">
                <div className="frontside">
                    <Card style={{minHeight: '260px', minWidth: "300px"}}>
                        <Card.Body className="flex-center-column text-center">
                            <Card.Img
                                width={320}
                                src={props.picture
                                    ? ("data:image/png;base64," + props.picture)
                                    : NoPhoto}
                                alt="card image"/>
                            <Card.Title className={"mt-4"}>{props.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className="backside">
                    <Card style={{minHeight: '260px', minWidth: "350px"}}>
                        <Card.Body className="text-center position-relative">
                            <Card.Text className={"center-of-parent"}>{props.descripton}<Link
                                to={`/cosmetics/${props.cosmeticId}`}>View More</Link></Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}