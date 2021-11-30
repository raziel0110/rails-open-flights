import React from "react";

const ReviewForm = (props) => {
    const ratingOptions = [5,4,3,2,1].map((score, index) => {
        return (
            <>
                <input type="radio" value={score} name="rating" id={`rating-${score}`} onChange={() => console.log('selected', score)}/>
                <label></label>
            </>
        );
    })

    return (
        <div className="wrapper">
            <form onSubmit={props.handleSubmit}>
                <div> Have an experience with {props.attributes.name}? Share your review!</div>
                <div className="field">
                    <input onChange={props.handleChange} value={props.review.title} type="text" name="title" placeholder="Review Title" />
                </div>

                <div className="field">
                    <input onChange={props.handleChange} value={props.review.description} type="text" name="description" placeholder="Review Description" />
                </div>

                <div className="field">
                    <div className="rating-container">
                        <div className="rating-title-text"> Rate This Airline </div>
                        {ratingOptions}
                    </div>
                </div>
                <button type="submit">Submit your review</button>
            </form>
        </div>
    );
}

export default ReviewForm;