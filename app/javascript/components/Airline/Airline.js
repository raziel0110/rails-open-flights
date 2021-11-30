import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scrol;

    &:last-child {
        background: #000;
    }
`
const Main = styled.div`
    padding-left: 50px;
`



const Airline = (props) => {
    const [airline, setAirline] = useState({});
    const [review, setReview] = useState({});
    const [loaded, setLoaded] = useState(false);

    const params = useParams();

    useEffect(() => {
        const url = `/api/v1/airlines/${params.slug}`
        
        axios.get(url)
        .then(res => { 
            console.log(res);
            setAirline(res.data);
            setLoaded(true);
        })
        .catch(err => console.log(res))
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        const airline_id = airline.data.id;

        axios.post(`/api/v1/reviews`, {review, airline_id})
        .then(res => {
            const included = [...airline.included, res.data.data]
            setAirline({...airline, included});
            setReview({title: '', description: '', score: 0})
        })
        .catch(err => console.log(err))
    }

    return (
        <Wrapper>
            { loaded && 
            <>
                <Column>
                    <Main>
                        <Header
                            attributes={airline.data.attributes}
                            reviews={airline.included}    
                        />
                        <div className="reviews"></div>
                    </Main>
                </Column>
                <Column>
                    <ReviewForm 
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        attributes={airline.data.attributes}
                        review={review}
                    ></ReviewForm>
                </Column>
            </>
            }
        </Wrapper>
    );  
}

export default Airline;