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

    // console.log('TEST-----', currReview)

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
        <p key={error}>{error}</p>
    ))

    return (
        <div className="create-review-container">
            <div className="create-review-container-left">
                <form className="create-review-form" onSubmit={onSubmit}>
                    <div className="create-review-header-container">
                        <h3 className="create-review-header">Create a Review</h3>
                    </div>
                    <div className="create-review-errors">
                        {hasSubmitted && errorList}
                    </div>
                    <div className="modal-body">
                        <label className="create-review-label">
                            Write a review here:
                            <div className="create-review-input-container">
                                <textarea
                                    className="review-input"
                                    type="string"
                                    placeholder="What was it like to stay here?"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="create-review-label">
                            Rating:
                            <div className="rating-input-container">
                                <input
                                    className="rating-input"
                                    type="number"
                                    placeholder="1 - 5 stars"
                                    minLength="1"
                                    maxLength="5"
                                    step="1"
                                    value={stars}
                                    onChange={(e) => setStars(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="review-submit-container">
                        <button
                            className="create-review-button"
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
