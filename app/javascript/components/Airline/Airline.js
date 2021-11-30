import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Airline = (props) => {
    const [airline, setAirline] = useState({});
    const [review, setReview] = useState({});

    const params = useParams();

    useEffect(() => {
        const url = `/api/v1/airlines/${params.slug}`
        
        axios.get(url)
        .then(res => setAirline(res.data))
        .catch(err => console.log(res))
    }, []);

    return (
        <div className="wrapper">
            <div className="column">
                <Header attributes={airline.data.attributes} />
                <div className="reviews">

                </div>
            </div>
            <div className="column">
                <div className="review-form">[review form goes here]</div>
            </div>

        </div>
    );  
}

export default Airline;