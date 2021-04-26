import React, {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditAccountModal from "../modals/EditAccountModal";
import {DeleteAccount, GetOneAccount} from "../AccountService";
import {navigate} from "@reach/router";
import NoPhoto from "../../assets/user.jpg";
import {accountContext} from "../../components/accountContext";

export default function AccountDetails(props) {
    const [account, setAccount] = useState(null);
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
    const authData = useContext(accountContext);

    useEffect(() => {
        GetOneAccount(props.username)
            .then(res => setAccount(res.data));
    }, [showUpdateProfileModal])

    const handleDelete = () => {
        DeleteAccount(account.username)
            .then(() => {
                authData.logoutUser();
            })
    }

    return (
        <div>
            {account && <Card>
                <h1 className={"mt-3"}>User Details</h1>
                <Card.Body>
                    <div className={"row"}>
                        <div className={"col-md-5 right-border"}>
                            <Card.Img src={account.picture
                                ? ("data:image/png;base64," + account.picture)
                                : NoPhoto}
                                      alt="card image"/>
                        </div>
                        <div className={"col-md-7 card-details d-flex align-content-center justify-content-center flex-column"}>
                            <h2>{account.name} {account.surname}</h2>
                            <p>Username: <b>{account.username}</b></p>
                            <p>E-mail: <b>{account.mail}</b></p>

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
                <EditAccountModal username={account.username} user={account} show={showUpdateProfileModal}
                                  onHide={() => setShowUpdateProfileModal(false)}/>}
            </Card>}
        </div>
    )
}
