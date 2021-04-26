import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/cjs/Modal";
import {EditMovieCrew, PersonRole, SaveMovieCrew} from "../MovieCrewService";

export default function MovieCrewModal(props) {
    const [moviePerson, setMoviePerson] = useState({
        name: props.person?.name ?? "",
        surname: props.person?.surname ?? "",
        personRole: props.person?.personRole ?? ""
    });

    const [moviePersonPicture, setMoviePersonPicture] = useState(null);

    const handleChange = name => event => {
        setMoviePerson({...moviePerson, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("moviePersonDto", new Blob([JSON.stringify({...moviePerson})], {
            type: "application/json"
        }));
        formData.append("moviePersonPhoto", moviePersonPicture);

        if (props.person) {
            return EditMovieCrew(props.person.id, formData)
                .then(() => props.onHide())
        }

        return SaveMovieCrew(formData).then(() => window.location.reload());
    }

    const handleDrop = event => {
        let file = event.target.files[0];
        setMoviePersonPicture(file);
    }

    return (
        <Modal {...props}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.person ? "Edit Crew member" : "Add Crew member"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name" value={moviePerson.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control placeholder="Enter surname" value={moviePerson.surname}
                                      onChange={handleChange("surname")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Choose role</Form.Label>
                        <Form.Control as="select" value={moviePerson.personRole} onChange={handleChange("personRole")}>
                            <option value={""}>Select one</option>
                            {Object.values(PersonRole).map((role, key) =>
                                <option key={key} value={role}>{role}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.File onChange={handleDrop}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
