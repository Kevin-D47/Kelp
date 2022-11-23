import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { Modal } from "../../context/Modal";
import EditBusinessForm from '../BusinessForms/editBusinessForm';
import DeleteBusinessForm from '../BusinessForms/deleteBusinessForm';
import BusinessReviews from '../BusinessReviews/businessReviews';
import BusinessImages from '../BusinessImagesModal/businessImages'

import { getOneBusinessThunk } from '../../store/businesses';
import { getBusinessReviewsThunk } from '../../store/reviews';
import { getBusinessImagesThunk } from '../../store/images'
import { getAllUsersThunk } from '../../store/users'

import imgNotFound from '../../icons/image-not-found.png'
import brokenImg from '../../icons/broken-img-icon.png'
import phoneIcon from "../../icons/phone-icon.png";
import directionIcon from "../../icons/direction-icon.png";
import starIcon from "../../icons/star-icon.png";
import cameraIcon from "../../icons/camera-icon.png";
import checkMark from "../../icons/check-mark-icon.png"
import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

import './businessDetails.css'


const BusinessDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const { businessId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    
    const currBusiness = useSelector(state => state.businesses[businessId])

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewsArr = Object.values(allReviews)

    const allImages = useSelector(state => state.images)
    const getAllImagesArr = Object.values(allImages)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);
    const [showDeleteBusiness, setShowDeleteBusiness] = useState(false);
    const [disableCreateReview, setDisableCreateReview] = useState(false);
    const [showAllBusinessImages, setShowAllBusinessImages] = useState(false);

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBusinessReviewsThunk(businessId))
        dispatch(getBusinessImagesThunk(businessId))
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])


    let sessionUserReview;

    if (sessionUser) {
        sessionUserReview = getAllReviewsArr.find((review) => review.userId === sessionUser.id)
    }

    useEffect(() => {
        if (sessionUserReview !== undefined) {
            setDisableCreateReview(true)
        } else {
            setDisableCreateReview(false)
        }
    }, [sessionUser, sessionUserReview])


    let phonesString;
    if (isLoaded) {
        phonesString = JSON.stringify(currBusiness.phone)
    }

    let numOfReviews;
    if (isLoaded) {
        numOfReviews = JSON.stringify(getAllReviewsArr.length)
    }

    let avgRating = 0
    if (isLoaded) {
        const allRatings = getAllReviewsArr.map(review => {
            return review.stars
        })

        let sum = 0;
        allRatings.forEach((rating) => { sum += rating });
        avgRating = sum / allRatings.length;
    }


    const roundedAvgRating = Math.round(avgRating)

    const ratingCount = (int) => {
        let ratings = []
        for (let num = 1; num <= 5; num++) {
            if (num <= int) {
                ratings.push(
                    <div>
                        <img className='rating-details-showcase' src={starChecked}></img>
                    </div>
                )
            } else {
                ratings.push(
                    <div>
                        <img className='rating-details-showcase' src={starUnchecked}></img>
                    </div>
                )
            }
        }
        return ratings.map(rating => {
            return rating
        })
    }

    const emptyRating = <div className='details-overall-rating'>
        <img className='rating-details-showcase' src={starUnchecked}></img>
        <img className='rating-details-showcase' src={starUnchecked}></img>
        <img className='rating-details-showcase' src={starUnchecked}></img>
        <img className='rating-details-showcase' src={starUnchecked}></img>
        <img className='rating-details-showcase' src={starUnchecked}></img>
    </div>

    if (!sessionUser) {
        history.push('/404')
    }

    return (
        isLoaded && (
            <div className='business-details-container'>
                <div className='business-images-container'>
                    {getAllImagesArr.map((image) => {
                        return (
                            <div>
                                <img
                                    className='business-image'
                                    src={image.imgUrl}
                                    alt={imgNotFound}
                                    onError={e => { e.currentTarget.src = imgNotFound }}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className='business-details-header-container'>
                    <div className='business-details-bus-name' style={{ fontSize: '46px', color: 'white', fontWeight: 'bold' }}>{currBusiness.name}</div>
                    <div className='business-details-header-info'>
                        <div className='business-details-header-info-inner'>
                            {!avgRating ? <div>{emptyRating}</div> : <div className='details-overall-rating'>{ratingCount(roundedAvgRating)}</div>}
                            <div style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>{numOfReviews} reviews</div>
                            <div style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>{currBusiness.price}</div>
                        </div>
                        <div>
                            <button className='all-photos-bttn' onClick={() => setShowAllBusinessImages(true)}>See All Photos</button>
                            {showAllBusinessImages && (
                                <Modal onClose={() => setShowAllBusinessImages(false)}>
                                    <BusinessImages businessId={businessId} setShowAllBusinessImages={setShowAllBusinessImages} />
                                </Modal>
                            )}
                        </div>
                    </div>
                    <div className='claimed-conatiner'>
                        <img className='check-mark' src={checkMark}></img>
                        <div className='claimed-txt'>Claimed</div>
                    </div>
                </div>
                <div className='business-details-bttm-container'>
                    <div className='business-details-bttm-wrapper'>
                        <div className='business-details-bttm-left'>
                            <div className='upload-bttn-container'>
                                {sessionUser.id === currBusiness.userId ? (
                                    <div className='review-diabled-container'>
                                        <div className='add-review-disable-bttn'>
                                            <img className='star-icon' src={starIcon}></img>
                                            <div>Write a review</div>
                                        </div>
                                        <div style={{ fontSize: '12.5px', color: 'red' }}>Owners cannot review their own business</div>
                                    </div>
                                ) :
                                    disableCreateReview === false && sessionUser && (
                                        <Link to={`/businesses/${businessId}/reviews/new`}>
                                            <button className='review-bttn'>
                                                <img className='star-icon' src={starIcon}></img>
                                                Write a review
                                            </button>
                                        </Link>
                                    )}
                                {disableCreateReview && (
                                    <div className='review-diabled-container'>
                                        <div className='add-review-disable-bttn'>
                                            <img className='star-icon' src={starIcon}></img>
                                            <div>Write a review</div>
                                        </div>
                                        <div style={{ fontSize: '12.5px', color: 'red' }}>You have already made a review</div>
                                    </div>
                                )}
                                <Link to={`/businesses/${businessId}/images/new`}>
                                    <button className='add-photo-bttn'>
                                        <img className='camera-icon' src={cameraIcon}></img>
                                        Add photo
                                    </button>
                                </Link>
                            </div>
                            <div className='description-container'>
                                <div className='description-title'>About Business</div>
                                <div className='user-name'>
                                    {allUsersArr && allUsersArr.map(user => {
                                        return (
                                            <> {currBusiness.userId === user.id ? (
                                                <div className='user-pic-name' key={currBusiness.userId === user.id ? user.id : ''}>
                                                    <img
                                                        className='reviewUserPic'
                                                        src={currBusiness.userId === user.id ? user.profileImageUrl : ''}
                                                        alt={brokenImg}
                                                        onError={e => { e.currentTarget.src = brokenImg }}
                                                    ></img>
                                                    <div>
                                                        <div className='business-details-owner-name' style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                                            {currBusiness.userId === user.id ? user.first_name : ''}&nbsp;
                                                            {currBusiness.userId === user.id ? user.last_name : ''}
                                                        </div>
                                                        <div style={{ color: 'gray' }}>Business Owner</div>
                                                    </div>

                                                </div>) : ''}
                                            </>
                                        )
                                    })}
                                </div>
                                <div className='business-details-description'>{currBusiness.description}</div>
                            </div>
                            <div className='reviews-container'>
                                <h2>Recommended Reviews</h2>
                                <div className='reviews-header-info'>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Overall rating</div>
                                    {!avgRating ? <div>{emptyRating}</div> : <div className='details-overall-rating'>{ratingCount(roundedAvgRating)}</div>}
                                    <div style={{ fontSize: '18px', color: 'gray' }}>{numOfReviews} reviews</div>
                                    <div></div>
                                </div>
                                <div className='details-reviews-wrapper'>
                                    <BusinessReviews businessId={businessId} sessionUser={sessionUser} />
                                </div>
                            </div>
                        </div>
                        <div className='business-details-bttm-right'>
                            {currBusiness.userId === sessionUser?.id && (
                                <div className='owner-options'>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Owner Options: </div>
                                    <div className='owner-options-bttns'>
                                        <button className='review-bttn' onClick={() => setShowUpdateBusiness(true)}>Edit Business</button>
                                        <button className='review-bttn' onClick={() => setShowDeleteBusiness(true)}>Delete Business</button>
                                        {showUpdateBusiness && (
                                            <Modal onClose={() => setShowUpdateBusiness(false)}>
                                                <EditBusinessForm businessId={businessId} setShowUpdateBusiness={setShowUpdateBusiness} />
                                            </Modal>
                                        )}
                                        {showDeleteBusiness && (
                                            <Modal onClose={() => setShowDeleteBusiness(false)}>
                                                <DeleteBusinessForm businessId={businessId} setShowDeleteBusiness={setShowDeleteBusiness} />
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className='business-phone-location'>
                                <div className='details-phone'>
                                    ({phonesString.slice(0, 3)}) {phonesString.slice(4, 7)}-{phonesString.slice(5, 9)}
                                    <img className='phone-sign-icon' src={phoneIcon}></img>
                                </div>

                                <div className='directions-title'>Get Directions</div>
                                <div className='details-location'>
                                    <div className='business-address'>
                                        {currBusiness.address} {currBusiness.city}, {currBusiness.state} {currBusiness.zip}
                                    </div>
                                    <img className='phone-sign-icon' src={directionIcon}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )


}

export default BusinessDetails
