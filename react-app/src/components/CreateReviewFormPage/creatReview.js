import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { createReviewThunk } from '../../store/reviews'
import { getOneBusinessThunk } from '../../store/businesses'
import { getBusinessReviewsThunk, } from '../../store/reviews'
import { getAllUsersThunk } from '../../store/users'

import './createReview.css'


function CreateReviewForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { businessId } = useParams();
    const currBusiness = useSelector((state) => state.businesses[businessId]);

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const [isLoaded, setIsLoaded] = useState(false)
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [currReview, setCurrReview] = useState(false)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])


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

    useEffect(() => {
        dispatch(getBusinessReviewsThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])

    if (!getAllReviewArr.length) {
        return null
    }


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
        <p className='create-review-single-error' key={error}>{error}</p>
    ))

    return (
        isLoaded && (
            <div className="create-review-container">
                <div className="create-review-wrapper">
                    <div className="create-review-container-left">
                        <div className="create-review-header-container">
                            <div style={{ fontSize: '30px' }}>Create a Review</div>
                            <div>Create a review by filling out the inputs below.</div>
                        </div>
                        <div className="create-review-errors">
                            {hasSubmitted && errorList}
                        </div>
                        <form className="create-review-form" onSubmit={onSubmit}>
                            <div className="create-rating-container">
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
                                <div style={{ fontSize: '20px' }}>Select your rating</div>
                            </div>
                            <div className="create-review-input-container">
                                <div className='create-review-input-title'>Review:</div>
                                <textarea
                                    className="create-review-input"
                                    type="string"
                                    placeholder="What was it like to stay here?"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </div>
                            <div className="create-review-submit-container">
                                <button
                                    className="create-review-form-button"
                                    type="submit"
                                    disabled={hasSubmitted && errors.length > 0}
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="create-review-container-right">
                        <div style={{ fontSize: "24px", fontWeight: '400' }}>Recent Reviews</div>
                        {getAllReviewArr.map(review => {
                            return (
                                <div className='create-single-review-container' key={review.id}>
                                    <div className='create-user-pic-name-options-conatiner' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        <div className='box'>
                                            <div className='user-name'>
                                                {allUsersArr && allUsersArr.map(user => {
                                                    return (
                                                        <> {review.userId === user.id ? (
                                                            <div className='create-user-pic-name' key={review.userId === user.id ? user.id : ''}>
                                                                <img className='reviewUserPic' src={review.userId === user.id ? user.profileImageUrl : ''}></img>
                                                                {review.userId === user.id ? user.first_name : ''}
                                                                {review.userId === user.id ? user.last_name : ''}
                                                            </div>) : ''}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='create-review-body'>
                                        <div className='review-rating-date'>
                                            <div className='stars-placeholder'>
                                                {review.stars} kelp
                                            </div>
                                            <div>{review.created_at.slice(8, 11)} {review.created_at.slice(5, 7)}, {review.created_at.slice(12, 16)}</div>
                                        </div>
                                        <div className='create-review'>
                                            {review.review}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    );
}


export default CreateReviewForm;
