import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditAccount from "../modals/EditAccount";

export default function AccountDetails(props){

    const [account, setAccount] = useState(null);
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

    useEffect(() => {
        axios.get(`/account/${props.username}`).then(r => {
            setAccount(r.data)
        })
    }, [showUpdateProfileModal])

    const handleDelete = () => {
        axios.delete(`/account/${account.username}`)
            .then(res => {
                navigate("/")
                    .then(() => window.location.reload())
            })
    }

    return (
        <div>
            {account && <Card>
                <Card.Title className={"mt-3"}>User Details</Card.Title>
                <Card.Body>
                    <div className={"row"}>
                        <div className={"col-md-5 right-border"}>
                            <Card.Img>
                            </Card.Img>
                            <h2>{account.name} {account.surname}</h2>
                        </div>
                        <div className={"col-md-7 card-details"}>
                            <p>Username: <b>{account.username}</b></p>
                            <p>E-mail: <b>{account.email}</b></p>

                            <div className={"action-panel"}>
                                <>
                                    <Button onClick={() => setShowUpdateProfileModal(true)}>Edit profile</Button>
                                    <Button variant={"danger"} className={"ml-3"} onClick={handleDelete}>
                                        Delete profile
                                    </Button>
                                </>
                            </div>
                        </div>
                    </div>

                </Card.Body>
                {showUpdateProfileModal &&
                <EditAccount username={account.username} user={account} show={showUpdateProfileModal}
                          onHide={() => setShowUpdateProfileModal(false)}/>}
            </Card>}
        </div>
    )
}