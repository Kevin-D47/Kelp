import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { getAllBusinessesThunk } from "../../store/businesses";
import { getAllReviewsThunk } from "../../store/reviews";
import { getAllImagesThunk } from "../../store/images";

import { Modal } from '../../context/Modal';
import EditBusinessForm from '../BusinessForms/editBusinessForm';
import DeleteBusinessForm from '../BusinessForms/deleteBusinessForm';
import EditReviewForm from '../ReviewForms/editReviewForm';
import DeleteReviewForm from '../ReviewForms/deleteReviewForm';
import UserImageDetails from "../UserImageDetails/userImageDetails";

import businessIcon from '../../icons/business-icon.png'
import reviewsIcon from '../../icons/rating-checked.png'
import photosIcon from '../../icons/camera-icon-2.png'
import imgNotFound from '../../icons/image-not-found.png'
import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'
import editButton from '../../icons/edit-icon.png'
import deleteButton from '../../icons/delete-icon.png'

import './user.css'

const User = () => {

    const [user, setUser] = useState({});
    const [tab, setTab] = useState(1);
    let [ratingSum, setRatingSum] = useState(0);
    const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);
    const [showDeleteBusiness, setShowDeleteBusiness] = useState(false);
    const [currReview, setCurrReview] = useState(false)
    const [showUpdateReview, setShowUpdateReview] = useState(false)
    const [showDeleteReview, setShowDeleteReview] = useState(false)
    const [showUserImageDetails, setShowUserImageDetails] = useState(false)
    const [currUserImage, setCurrUserImage] = useState(false)

    const { userId } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBusinessesThunk());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllReviewsThunk());
    }, [dispatch, showDeleteReview])

    useEffect(() => {
        dispatch(getAllImagesThunk());
    }, [dispatch])

    const allBusinesses = useSelector((state) => state.businesses);
    const allReviews = useSelector((state) => state.reviews);
    const allImages = useSelector((state) => state.images)
    const allBusinessesArr = Object.values(allBusinesses);
    const allReviewsArr = Object.values(allReviews);
    const allImagesArr = Object.values(allImages)

    const userBusinessesArr = allBusinessesArr.filter((business) => business.userId == userId);
    const userReviewsArr = allReviewsArr.filter((review) => review.userId == userId);
    const userImagesArr = allImagesArr.filter((image) => image.userId == userId)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);


    let createdAtDate;

    if (user.id == userId) {
        const createdAtObject = user.created_at;
        const createdAtString = JSON.stringify(createdAtObject);
        const date = createdAtString.slice(5, 8);
        const month = createdAtString.slice(9, 12);
        const year = createdAtString.slice(13, 17);
        createdAtDate = `${month} ${date}, ${year}`;
    }


    const ratingCount = (int) => {
        let ratings = []
        for (let num = 1; num <= 5; num++) {
            if (num <= int) {
                ratings.push(
                    <div>
                        <img className='rating-restraunts-showcase' src={starChecked}></img>
                    </div>
                )
            } else {
                ratings.push(
                    <div>
                        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
                    </div>
                )
            }
        }
        return ratings.map(rating => {
            return rating
        })
    }

    const emptyRating = <div className='single-rest-avgRating-containter'>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
    </div>


    if (!user) {
        return null;
    }


    return (
        <div className="profile-container">
            <div className="profile-banner-bg"></div>
            <div className="profile-header-container">
                <img className="user-profile-pic" src={user.profileImageUrl}></img>
                <div className="user-profile-header-info-container">
                    <div className="user-profile-name">{user.first_name} {user.last_name}</div>
                    <div className="user-profile-header-info">
                        <div className="profile-header-info">
                            <img className="business-icon" src={businessIcon}></img>
                            <div style={{ fontWeight: 'bold' }}>{userBusinessesArr.length}</div> &nbsp;Businesses
                        </div>
                        <div className="profile-header-info">
                            <img className="review-icon" src={reviewsIcon}></img>
                            <div style={{ fontWeight: 'bold' }}>{userReviewsArr.length}</div> &nbsp;Reviews
                        </div>
                        <div className="profile-header-info">
                            <img className="photo-icon" src={photosIcon}></img>
                            <div style={{ fontWeight: 'bold' }}>{userImagesArr.length}</div> &nbsp;Photos
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-profile-bottom-container">
                <div className="user-profile-tabs-container">
                    <div className="user-tabs-title-name">{user.first_name}'s Profile</div>
                    <div className={tab === 1 ? "user-tab-buttons-top active-tab-bg" : "user-tab-buttons-top"} onClick={() => setTab(1)}>Profile Overview</div>
                    <div className={tab === 2 ? "user-tab-buttons-mid active-tab-bg" : "user-tab-buttons-mid"} onClick={() => setTab(2)}>My Businesses</div>
                    <div className={tab === 3 ? "user-tab-buttons-mid active-tab-bg" : "user-tab-buttons-mid"} onClick={() => setTab(3)}>My Reviews</div>
                    <div className={tab === 4 ? "user-tab-buttons-bottom active-tab-bg" : "user-tab-buttons-bottom"} onClick={() => setTab(4)}>My Photos</div>
                </div>
                <div className="user-profile-info-right-container">
                    {tab === 1 ? <div className="profile-overview">
                        <div className="profile-overview-name">About {user.first_name} {user.last_name}</div>
                        <div className="joined-date">
                            <div style={{ fontWeight: 'bold' }}>Kelping Since</div>
                            {createdAtDate}
                        </div>
                        <div className="joined-date">
                            <div style={{ fontWeight: 'bold' }}>Username</div>
                            {user.username}
                        </div>
                        <div className="joined-date">
                            <div style={{ fontWeight: 'bold' }}>Email</div>
                            {user.email}
                        </div>
                    </div> : ''
                    }
                    {tab === 2 ? <div className="profile-businesses-tab">
                        <div className="profile-businesses-title">My Businesses</div>
                        {userBusinessesArr.length === 0 ?
                            <div className="user-no-businesses-container">
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'gray' }}>You do not own any businesses</div>
                                <NavLink className='user-link-create-business' to='/new'>add your business click here</NavLink>
                            </div> :
                            userBusinessesArr.map((business) => {
                                return (
                                    <div className="all-restraunts-container" key={business.id}>
                                        <div className="profile-single-rest-container">
                                            <div className="single-rest-container-left">
                                                <NavLink to={`/businesses/${business.id}`}>
                                                    <img
                                                        className="restraunt-img"
                                                        src={business.previewImageUrl}
                                                        alt={imgNotFound}
                                                        onError={e => { e.currentTarget.src = imgNotFound }}
                                                    />
                                                </NavLink>
                                            </div>
                                            <div className="single-rest-container-right">
                                                <div className="profile-businesses-title-options">
                                                    <NavLink to={`/businesses/${business.id}`}>
                                                        <div className="profile-restraunt-name">{business.name}</div>
                                                    </NavLink>
                                                    <div className='viewThisResult'>
                                                        <div className='business-options-container'>
                                                            <img className='edit-review-bttn' src={editButton} onClick={() => { setShowUpdateBusiness(true) }}></img>
                                                            <img className='delete-review-bttn' src={deleteButton} onClick={() => { setShowDeleteBusiness(true) }}></img>
                                                            {showUpdateBusiness && (
                                                                <Modal onClose={() => setShowUpdateBusiness(false)}>
                                                                    <EditBusinessForm businessId={business.id} setShowUpdateBusiness={setShowUpdateBusiness} />
                                                                </Modal>
                                                            )}
                                                            {showDeleteBusiness && (
                                                                <Modal onClose={() => setShowDeleteBusiness(false)}>
                                                                    <DeleteBusinessForm businessId={business.id} setShowDeleteBusiness={setShowDeleteBusiness} />
                                                                </Modal>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="restraunt-info-container">
                                                    {business.reviews.map((review) => {
                                                        { ratingSum += review.stars }
                                                    })}
                                                    {!(ratingSum / business.reviews.length) ? <div>{emptyRating}</div> : <div className="single-rest-avgRating-containter"> {ratingCount(Math.round(ratingSum / business.reviews.length))}</div>}
                                                    <div>{business.reviews.length} Reviews</div>
                                                    <div>{business.price}</div>
                                                </div>
                                                <div className="ratingSum-hide">{ratingSum = 0}</div>
                                                <div className="restraunt-location">
                                                    {business.city}, {business.state}
                                                </div>
                                                <div className="restraunt-description">{business.description}</div>
                                                <div className="restraunt-type-container">Type of Seafood: <div className="restraunt-type">{business.type}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div> : ''
                    }
                    {tab === 3 ? <div className="profile-reviews-tab">
                        <div className="profile-review-title"> My Reviews</div>
                        {userReviewsArr.length === 0 ?
                            <div className="user-no-data-container" style={{ fontSize: '20px', fontWeight: 'bold', color: 'gray' }}>
                                You have no reviews
                            </div> :
                            userReviewsArr.map((review) => {
                                return (
                                    <>
                                        {allBusinessesArr.map((business) => {
                                            return (
                                                <>
                                                    {business.id === review.businessId ?
                                                        <div className='profile-review-container'>
                                                            <div className="profile-review-title-options">
                                                                <div className="profile-review-business">Review from&nbsp;
                                                                    <NavLink className='profile-review-business-link' to={`/businesses/${business.id}`}>{business.name}</NavLink>
                                                                </div>
                                                                <div className='viewThisResult'>
                                                                    <div className='profile-review-options-container'>
                                                                        <img className='edit-review-bttn' src={editButton} onClick={() => { setShowUpdateReview(true); setCurrReview(review) }}></img>
                                                                        <img className='delete-review-bttn' src={deleteButton} onClick={() => { setShowDeleteReview(true); setCurrReview(review) }}></img>
                                                                        {showUpdateReview && (
                                                                            <Modal onClose={() => setShowUpdateReview(false)}>
                                                                                <EditReviewForm currReview={currReview} setShowUpdateReview={setShowUpdateReview} />
                                                                            </Modal>
                                                                        )}
                                                                        {showDeleteReview && (
                                                                            <Modal onClose={() => setShowDeleteReview(false)}>
                                                                                <DeleteReviewForm businessId={currReview.businessId} currReview={currReview} setShowDeleteReview={setShowDeleteReview} />
                                                                            </Modal>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='review-rating-date'>
                                                                <div className='rating-showcase-container'>
                                                                    {ratingCount(review.stars)}
                                                                </div>
                                                                <div>{review.created_at.slice(8, 11)} {review.created_at.slice(5, 7)}, {review.created_at.slice(12, 16)}</div>
                                                            </div>
                                                            <div className='review'>
                                                                {review.review}
                                                            </div>
                                                        </div> : ""
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}

                    </div> : ''
                    }
                    {tab === 4 ? <div className="profile-reviews-tab">
                        <div className="profile-image-title"> My Photos</div>
                        <div className='profile-all-business-images-container'>
                            {userImagesArr.length === 0 ?
                                <div className="user-no-data-container user-no-data-photos" style={{ fontSize: '20px', fontWeight: 'bold', color: 'gray' }}>
                                    You have no photos
                                </div> :
                                userImagesArr.map((image) => {
                                    return (
                                        <div>
                                            <img
                                                onClick={() => { setShowUserImageDetails(true); setCurrUserImage(image) }}
                                                className='single-business-image'
                                                src={image.imgUrl}
                                                alt={imgNotFound}
                                                onError={e => { e.currentTarget.src = imgNotFound }}
                                            />
                                            {showUserImageDetails && (
                                                <Modal onClose={() => setShowUserImageDetails(false)}>
                                                    <UserImageDetails businessId={image.businessId} image={currUserImage} setShowUserImageDetails={setShowUserImageDetails} />
                                                </Modal>
                                            )}
                                        </div>
                                    )
                                })}
                        </div>
                    </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default User;
