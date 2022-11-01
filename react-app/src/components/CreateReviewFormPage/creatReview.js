import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { createReviewThunk } from '../../store/reviews'
import { getOneBusinessThunk } from '../../store/businesses'
import { getBusinessReviewsThunk, } from '../../store/reviews'
import { getAllUsersThunk } from '../../store/users'

import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

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

        if (!review) {
            newErrors.push("Please write a review.");
        }

        if (review.length > 1000) {
            newErrors.push("Review cannot be over 1000 characters long");
        }

        if (!stars) {
            newErrors.push("Please provide a rating.");
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
                                <div class="star-wrapper">
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
                                </div>
                                <div style={{ fontSize: '15px' }}>Select your rating</div>
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
