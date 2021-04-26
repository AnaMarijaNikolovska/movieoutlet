import {useEffect, useState} from "react";
import {GetAllMovieCrew} from "./MovieCrewService";
import MovieCrewCard from "../components/MovieCrewCard";

export default function MovieCrewList(props) {
    const [crew, setCrew] = useState(null);

    useEffect(() => {
        GetAllMovieCrew()
            .then(r => setCrew(r.data))
    }, [])

    return (
        <div>
            <h1>All Crew</h1>
            <div className={"row"}>
                {crew && crew.length > 0 && crew.map(person => <div className={"col-md-4"} key={person.id}>
                    <MovieCrewCard id={person.id} picture={person.picture} name={person.name} surname={person.surname}
                                   personRole={person.personRole}/>
                </div>)}
            </div>
        </div>
    )
}
