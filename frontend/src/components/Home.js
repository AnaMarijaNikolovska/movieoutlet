import React from "react";
import Carousel from "react-bootstrap/Carousel";
import animation from "../assets/animation.jpg"
import Comedy from "../assets/Comedymovies.jpg"
import romance from "../assets/romance.jpg"
import scifi from "../assets/sci-fi.jpg"
import horror from "../assets/horror.jpg"


export default function Home(){
    return(
        <div className="BlackBackround">
            <Carousel>
                <Carousel.Item>
                    <img src={animation} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={Comedy} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={horror} alt={"image"}/>
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
