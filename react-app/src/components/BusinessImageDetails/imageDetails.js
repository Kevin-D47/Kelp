import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getOneImageThunk } from '../../store/images';

import EditImageForm from '../ImageForms/editImageForm';
import DeleteImageForm from '../ImageForms/deleteImageForm';

import imgNotFound from '../../icons/image-not-found.png'
import brokenImg from '../../icons/broken-img-icon.png'
import editButton from '../../icons/edit-icon.png'
import deleteButton from '../../icons/delete-icon.png'
import closeIcon from "../../icons/x-icon.png";

import './imageDetails.css'


const ImageDetails = ({ currImage, setDisplayAllImages, setShowAllBusinessImages }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { businessId } = useParams()

    const { imageId } = useParams()

    const sessionUser = useSelector(state => state.session.user)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const currBusiness = useSelector(state => state.businesses[businessId])

    const [isLoaded, setIsLoaded] = useState(false)
    const [displayImageDetail, setDisplayImageDetail] = useState(true)

    useEffect(() => {
        dispatch(getOneImageThunk(businessId, imageId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        isLoaded && (
            <div className='image-details-container'>
                {displayImageDetail === true ?
                    <div className='image-details-container'>
                        <div className='image-details-container-left'>
                            <div className='image-details-options-container'>
                                <button className='back-to-photos-bttn' onClick={() => setDisplayAllImages(false)}> Back to photos</button>
                                {currImage.userId === sessionUser?.id && (
                                    <div className='edit-delete-image-container'>
                                        <img className='edit-image-bttn' src={editButton} onClick={() => setDisplayImageDetail('editImage')} />
                                        <img className='delete-image-bttn' src={deleteButton} onClick={() => setDisplayImageDetail('deleteImage')}></img>
                                    </div>
                                )}
                            </div>
                            <div className='detail-single-image-container'>
                                <img
                                    className='single-business-image-detail'
                                    src={currImage.imgUrl}
                                    alt={imgNotFound}
                                    onError={e => { e.currentTarget.src = imgNotFound }}
                                />
                            </div>
                        </div>
                        <div className='image-details-container-right'>
                            <div className='close-all-images-modal-container'>
                                <button className="close-all-images-modal" onClick={() => setShowAllBusinessImages(false)}>Close</button>
                                <img className='close-icon' src={closeIcon} onClick={() => setShowAllBusinessImages(false)}></img>
                            </div>
                            <div className='image-details-business-title'>Photos for {currBusiness.name}</div>
                            <div className='image-detail-user-info-container'>
                                {allUsersArr.map((user) => {
                                    return (
                                        <> {currImage.userId === user.id ? (
                                            <div className='user-pic-name' key={currImage.userId === user.id ? user.id : ''}>
                                                <img
                                                    className='image-user-pic'
                                                    src={currImage.userId === user.id ? user.profileImageUrl : ''}
                                                    alt={brokenImg}
                                                    onError={e => { e.currentTarget.src = brokenImg }}
                                                ></img>
                                                <div>
                                                    <div className='business-details-owner-name' style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                                        {currImage.userId === user.id ? user.first_name : ''}&nbsp;
                                                        {currImage.userId === user.id ? user.last_name : ''}
                                                    </div>
                                                </div>
                                            </div>) : ''}
                                        </>
                                    )
                                })}
                                <div className='image-detail-date'> Posted on {currImage.created_at.slice(8, 11)} {currImage.created_at.slice(5, 7)}, {currImage.created_at.slice(12, 16)}</div>
                                <div className='image-detail-description'>{currImage.description}</div>
                            </div>
                        </div>
                    </div> : ""
                }
                {displayImageDetail === 'editImage' ?
                    <div className='image-details-edit-container'>
                        <div className='close-edit-photo-modal-container'>
                            <button className="close-all-images-modal" onClick={() => setShowAllBusinessImages(false)}>Close</button>
                            <img className='close-icon' src={closeIcon} onClick={() => setShowAllBusinessImages(false)}></img>
                        </div>
                        <div>
                            <EditImageForm businessId={currBusiness.id} currImage={currImage} setDisplayImageDetail={setDisplayImageDetail} setDisplayAllImages={setDisplayAllImages} />
                        </div>
                    </div> : ""
                }
                {displayImageDetail === 'deleteImage' ?
                    <div className='image-details-delete-container'>
                        <div className='close-delete-photo-modal-container'>
                            <button className="close-all-images-modal" onClick={() => setShowAllBusinessImages(false)}>Close</button>
                            <img className='close-icon' src={closeIcon} onClick={() => setShowAllBusinessImages(false)}></img>
                        </div>
                        <div>
                            <div>
                                <DeleteImageForm businessId={currBusiness.id} currImage={currImage} setDisplayImageDetail={setDisplayImageDetail} setDisplayAllImages={setDisplayAllImages} />
                            </div>
                        </div>
                    </div> : ""
                }
            </div >
        )
    )
}

export default ImageDetails
