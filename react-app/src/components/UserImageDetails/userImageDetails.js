import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getOneImageThunk } from '../../store/images';

import UserDeleteImageForm from './userDeleteImageForm';
import UserEditImageForm from './userEditImageForm';

import imgNotFound from '../../icons/image-not-found.png'
import brokenImg from '../../icons/broken-img-icon.png'
import editButton from '../../icons/edit-icon.png'
import deleteButton from '../../icons/delete-icon.png'
import closeIcon from "../../icons/x-icon.png";


import './userImageDetails.css'


const UserImageDetails = ({ image, businessId, setShowUserImageDetails }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const currBusiness = useSelector(state => state.businesses[businessId])

    const [isLoaded, setIsLoaded] = useState(false)
    const [displayUserImageDetails, setDisplayUserImageDetails] = useState(true)
    const [closeDeleteModal, setCloseDeleteModal] = useState(false)

    useEffect(() => {
        dispatch(getOneImageThunk(businessId, image.id)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        isLoaded && (
            <div className='user-image-details-container'>
                {displayUserImageDetails === true ?
                    <div className='image-details-container'>
                        <div className='image-details-container-left'>
                            <div className='image-details-options-container'>
                                <div className='user-edit-delete-image-container'>
                                    <img className='edit-image-bttn' src={editButton} onClick={() => setDisplayUserImageDetails('editImage')} />
                                    <img className='delete-image-bttn' src={deleteButton} onClick={() => setDisplayUserImageDetails('deleteImage')}></img>
                                </div>
                            </div>
                            <div className='detail-single-image-container'>
                                <img
                                    className='single-business-image-detail'
                                    src={image.imgUrl}
                                    alt={imgNotFound}
                                    onError={e => { e.currentTarget.src = imgNotFound }}
                                />
                            </div>
                        </div>
                        <div className='image-details-container-right'>
                            <div className='user-close-all-images-modal-container'>
                                <button className="close-all-images-modal" onClick={() => setShowUserImageDetails(false)}>Close</button>
                                <img className='close-icon' src={closeIcon} onClick={() => setShowUserImageDetails(false)}></img>
                            </div>
                            <div className='image-details-business-title'>Photos for {currBusiness.name}</div>
                            <div className='image-detail-user-info-container'>
                                <div className='image-detail-date'> Posted on {image.created_at.slice(8, 11)} {image.created_at.slice(5, 7)}, {image.created_at.slice(12, 16)}</div>
                                <div className='image-detail-description'>{image.description}</div>
                            </div>
                        </div>
                    </div> : ""
                }
                {displayUserImageDetails === 'editImage' ?
                    <div className='image-details-edit-container'>
                        <div className='user-close-edit-photo-modal-container'>
                            <button className="close-all-images-modal" onClick={() => setShowUserImageDetails(false)}>Close</button>
                            <img className='close-icon' src={closeIcon} onClick={() => setShowUserImageDetails(false)}></img>
                        </div>
                        <div>
                            <UserEditImageForm businessId={currBusiness.id} currImage={image} setDisplayUserImageDetails={setCloseDeleteModal} />
                        </div>
                    </div> : ""
                }
                {displayUserImageDetails === 'deleteImage' ?
                    <div className='image-details-delete-container'>
                        <div className='user-close-delete-photo-modal-container'>
                            <button className="close-all-images-modal" onClick={() => setShowUserImageDetails(false)}>Close</button>
                            <img className='close-icon' src={closeIcon} onClick={() => setShowUserImageDetails(false)}></img>
                        </div>
                        <div>
                            <div>
                                <UserDeleteImageForm businessId={currBusiness.id} currImage={image} setDisplayUserImageDetails={setDisplayUserImageDetails} />
                            </div>
                        </div>
                    </div> : ""
                }
            </div >
        )
    )
}

export default UserImageDetails
