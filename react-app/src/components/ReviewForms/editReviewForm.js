import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';

import { updateReviewThunk } from "../../store/reviews";

import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

import "./editReviewForm.css"


const EditReviewForm = ({ currReview, setShowUpdateReview }) => {

    const dispatch = useDispatch()

    // const { businessId } = useParams()

    const businessId = currReview.businessId

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [review, setReview] = useState(currReview.review)
    const [stars, setStars] = useState(currReview.stars)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = [];

        if (!review || !review.split(" ").join("").length) {
            errors.push("Please write a review.");
        }

        if (review.length > 800) {
            errors.push("Review cannot be over 800 characters long");
        }

        if (!stars) {
            errors.push("Please provide a rating.");
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

        if (errors.length > 0) return alert('There was an error with your submission, Please recheck your inputs')

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
                    <div style={{ fontSize: '30px' }}>Edit your Review</div>
                    <div>Update your review inputs below.</div>
                </div>
                <div className="edit-review-errors">
                    {hasSubmitted && errorList}
                </div>
                <form className="edit-review-form" onSubmit={onSubmit}>
                    <div className="edit-rating-container">

                        <div onClick={() => setStars(1)} value='5'>
                            {stars >= 1 ? <img className="rating-size" src={starChecked} /> : <img className="rating-size" src={starUnchecked} />}
                        </div>
                        <div onClick={() => setStars(2)} value={stars}>
                            {stars >= 2 ? <img className="rating-size" src={starChecked} /> : <img className="rating-size" src={starUnchecked} />}
                        </div>
                        <div onClick={() => setStars(3)} value={stars}>
                            {stars >= 3 ? <img className="rating-size" src={starChecked} /> : <img className="rating-size" src={starUnchecked} />}
                        </div>
                        <div onClick={() => setStars(4)} value={stars}>
                            {stars >= 4 ? <img className="rating-size" src={starChecked} /> : <img className="rating-size" src={starUnchecked} />}
                        </div>
                        <div onClick={() => setStars(5)} value={stars}>
                            {stars >= 5 ? <img className="rating-size" src={starChecked} /> : <img className="rating-size" src={starUnchecked} />}
                        </div>

                        <div style={{ fontSize: '16px' }}>Select your rating</div>
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
                        <button id='edit-review-cancel-button' className="delete-business-button-no" onClick={() => setShowUpdateReview(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditReviewForm
