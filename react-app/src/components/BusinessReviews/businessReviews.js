import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBusinessReviewsThunk, } from '../../store/reviews'
import { getAllUsersThunk } from '../../store/users'

import { Modal } from '../../context/Modal';
import EditReviewForm from '../ReviewForms/editReviewForm';
import DeleteReviewForm from '../ReviewForms/deleteReviewForm';

import brokenImg from '../../icons/broken-img-icon.png'
import editButton from '../../icons/edit-icon.png'
import deleteButton from '../../icons/delete-icon.png'
import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

import './businessReviews.css'

const BusinessReviews = ({ businessId }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const [isLoaded, setIsLoaded] = useState(false)
    const [currReview, setCurrReview] = useState(false)
    const [showUpdateReview, setShowUpdateReview] = useState(false)
    const [showDeleteReview, setShowDeleteReview] = useState(false)


    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])


    useEffect(() => {
        dispatch(getBusinessReviewsThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId, showDeleteReview])


    const ratingCount = (int) => {
        let ratings = []
        for (let num = 1; num <= 5; num++) {
            if (num <= int) {
                ratings.push(
                    <div>
                        <img className='rating-showcase' src={starChecked}></img>
                    </div>
                )
            } else {
                ratings.push(
                    <div>
                        <img className='rating-showcase' src={starUnchecked}></img>
                    </div>
                )
            }
        }
        return ratings.map(rating => {
            return rating
        })
    }

    return (
        isLoaded && (
            <div className='all-reviews-container'>
                {getAllReviewArr.map(review => {
                    return (
                        <div className='single-review-container' key={review.id}>
                            <div className='user-pic-name-options-conatiner' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                <div className='box'>
                                    <div className='user-name'>
                                        {allUsersArr && allUsersArr.map(user => {
                                            return (
                                                <> {review.userId === user.id ? (
                                                    <div className='user-pic-name' key={review.userId === user.id ? user.id : ''}>
                                                        <img
                                                            className='reviewUserPic'
                                                            src={review.userId === user.id ? user.profileImageUrl : ''}
                                                            alt={brokenImg}
                                                            onError={e => { e.currentTarget.src = brokenImg }}
                                                        ></img>
                                                        <div className='single-review-username'>
                                                            {review.userId === user.id ? user.first_name : ''}&nbsp;
                                                            {review.userId === user.id ? user.last_name : ''}
                                                        </div>
                                                    </div>) : ''}
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                {!sessionUser ? null : sessionUser.id === review.userId && (
                                    <div className='viewThisResult'>
                                        <div className='review-options-container'>
                                            <img className='edit-review-bttn' src={editButton} onClick={() => { setShowUpdateReview(true); setCurrReview(review) }}></img>
                                            <img className='delete-review-bttn' src={deleteButton} onClick={() => { setShowDeleteReview(true); setCurrReview(review) }}></img>
                                            {showUpdateReview && (
                                                <Modal onClose={() => setShowUpdateReview(false)}>
                                                    <EditReviewForm currReview={currReview} setShowUpdateReview={setShowUpdateReview} />
                                                </Modal>
                                            )}
                                            {showDeleteReview && (
                                                <Modal onClose={() => setShowDeleteReview(false)}>
                                                    <DeleteReviewForm businessId={businessId} currReview={currReview} setShowDeleteReview={setShowDeleteReview} />
                                                </Modal>
                                            )}
                                        </div>
                                    </div>

                                )}
                            </div>
                            <div className='review-body'>
                                <div className='review-rating-date'>
                                    <div className='rating-showcase-container'>
                                        {ratingCount(review.stars)}
                                    </div>
                                    <div>{review.created_at.slice(8, 11)} {review.created_at.slice(5, 7)}, {review.created_at.slice(12, 16)}</div>
                                </div>
                                <div className='review'>
                                    {review.review}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        )
    )

}

export default BusinessReviews
