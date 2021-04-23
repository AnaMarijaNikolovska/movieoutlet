import React from "react";
import Carousel from "react-bootstrap/Carousel";
import actionmovies from "../assets/actionmovies.jpg"
import animation from "../assets/animation.jpg"
import Comedy from "../assets/Comedy.jpg"
import romance from "../assets/romance.jpg"
import scifi from "../assets/scifi.jpg"


export default function Home(){
    return(
        <div className="BlackBackround">
            <Carousel>

                <Carousel.Item>
                    <img src={actionmovies} alt={"image"}/>

                </Carousel.Item>

                <Carousel.Item>
                    <img src={animation} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={Comedy} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={romance} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={scifi} alt={"image"}/>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}