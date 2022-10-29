import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';

import { updateReviewThunk } from "../../store/reviews";

import "./editReviewForm.css"


const EditReviewForm = ({ currReview, setShowUpdateReview }) => {

    const dispatch = useDispatch()

    const { businessId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [review, setReview] = useState(currReview.review)
    const [stars, setStars] = useState(currReview.stars)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = [];

        if (review.length <= 0) {
            errors.push("Please write a review.");
        }

        if (stars < 1 || stars > 5) {
            errors.push("Rating must be an integer from 1 to 5.");
        }

        setErrors(errors);
    }, [review, stars]);



    if (sessionUser === null) {
        alert("You must be logged in to edit a review");
        return <Redirect to="/" />;
    }


    async function onSubmit(e) {
        e.preventDefault()

        setHasSubmitted(true)

        if (errors.length > 0) return alert('invalid submission')

        dispatch(updateReviewThunk(currReview.id, userId, businessId, review, stars))
        setShowUpdateReview(false)
    }

    const errorList = errors.map((error) => (
        <p className='edit-review-single-error' key={error}>{error}</p>
    ))

    return (
        <div className="edit-review-container">
            <div className="edit-review-wrapper">
                <div className="edit-review-header-container">
                    <div style={{fontSize: '30px'}}>Edit your Review</div>
                    <div>Update your review inputs below.</div>
                </div>
                <div className="edit-review-errors">
                    {hasSubmitted && errorList}
                </div>
                <form className="edit-review-form" onSubmit={onSubmit}>
                    <div className="edit-rating-container">
                        <input
                            className="rating-input"
                            type="number"
                            minLength="1"
                            maxLength="5"
                            step="1"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                        <div style={{fontSize:'20px'}}>Select your rating</div>
                    </div>
                    <div className="edit-review-input-container">
                        <div className='edit-review-input-title'>Review:</div>
                        <textarea
                            className="edit-review-input"
                            type="string"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <div className="edit-review-submit-container">
                        <button
                            className="edit-review-form-button"
                            type="submit"
                            disabled={hasSubmitted && errors.length > 0}
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditReviewForm