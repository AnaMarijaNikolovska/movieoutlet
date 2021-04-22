import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {navigate} from "@reach/router";
import {EditCategory, GetCategoryDetails} from "../CategoryService";

export default function CategoryDetails(props){
    const [category, setCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [categoryCosmetics, setCategoryCosmetics] = useState(null);

    useEffect(() => {
       GetCategoryDetails(props.categoryId).then(r => setCategory(r.data))
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

                    <div className={"row"}>
                        <hr style={{width: "80%"}}/>
                    </div>

                    <>
                        <Button className={"mr-3"} onClick={() => setShowEditModal(true)}> Edit Category </Button>
                        <Button variant={"success"} onClick={() => navigate("/movie/add")}> Add Movie </Button>
                    </>

                    {showEditModal === true &&
                    <EditCategory show={showEditModal} setShow={setShowEditModal} category={category}/>}
                </Card.Body>
            </Card>
            }
        </div>
    )
}