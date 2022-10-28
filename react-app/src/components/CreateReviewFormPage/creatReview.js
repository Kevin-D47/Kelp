import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { createReviewThunk } from '../../store/reviews'
import { getOneBusinessThunk } from '../../store/businesses'

import './createReview.css'


function CreateReviewForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { businessId } = useParams();
    const currBusiness = useSelector((state) => state.businesses[businessId]);

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    const [isLoaded, setIsLoaded] = useState(false)
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const newErrors = [];

        if (review.length <= 0) {
            newErrors.push("Please write a review.");
        }

        if (stars < 1 || stars > 5) {
            newErrors.push("Rating must be an integer from 1 to 5.");
        }

        setErrors(newErrors);
    }, [review, stars]);


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (errors.length > 0) {
            return alert("invalid submission");
        }

        const createdReview = dispatch(createReviewThunk(userId, businessId, review, stars));

        if (createdReview) {
            history.push(`/businesses/${businessId}`);
        }
    };

    const errorList = errors.map((error) => (
        <p key={error}>{error}</p>
    ))

    return (
        isLoaded && (
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
    );
}


export default CreateReviewForm;
