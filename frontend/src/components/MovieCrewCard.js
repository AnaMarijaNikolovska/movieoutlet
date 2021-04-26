import Card from "react-bootstrap/Card";
import NoPhoto from "../assets/user.jpg";
import {navigate} from "@reach/router";

export default function MovieCrewCard(props) {
    return (
        <Card style={{minHeight: "300px"}} className={"m-2"} onClick={() => navigate(`/movie-crew/${props.id}`)}>
            <Card.Img height={300} variant="top" src={props.picture
                ? ("data:image/png;base64," + props.picture)
                : NoPhoto}/>
            <Card.Body>
                <Card.Title>
                    {props.name + " " + props.surname}
                </Card.Title>
                <Card.Text>
                    {props.personRole}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
