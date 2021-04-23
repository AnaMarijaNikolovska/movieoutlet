import React from "react";


export default function MovieDetails(props) {
    return (
        <div>
            <div>
                <img src="/w3images/sailboat.jpg" alt="boat" style="width:100%;min-height:350px;max-height:600px;"/>
            </div>

            <div className="w3-quarter">
                <p>{props.description}</p>
                <p>{props.category}</p>
            </div>

            <div className="w3-container w3-padding-64 w3-center" id="team">
                <h2>Movie Crew</h2>

                <div className="w3-row"><br/>

                    <div className="w3-quarter">
                        <img src="/w3images/avatar.jpg" alt="Boss" style="width:45%"
                             className="w3-circle w3-hover-opacity"/>
                            <h3>Johnny Walker</h3>
                            <p>Web Designer</p>
                    </div>

                    <div className="w3-quarter">
                        <img src="/w3images/avatar.jpg" alt="Boss" style="width:45%"
                             className="w3-circle w3-hover-opacity"/>
                            <h3>Rebecca Flex</h3>
                            <p>Support</p>
                    </div>

                    <div className="w3-quarter">
                        <img src="/w3images/avatar.jpg" alt="Boss" style="width:45%"
                             className="w3-circle w3-hover-opacity"/>
                            <h3>Jan Ringo</h3>
                            <p>Boss man</p>
                    </div>

                    <div className="w3-quarter">
                        <img src="/w3images/avatar.jpg" alt="Boss" style="width:45%"
                             className="w3-circle w3-hover-opacity"/>
                            <h3>Kai Ringo</h3>
                            <p>Fixer</p>
                    </div>

                </div>
            </div>

        </div>
                )
                }