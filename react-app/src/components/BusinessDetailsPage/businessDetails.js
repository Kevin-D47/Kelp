import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";

import { Modal } from "../../context/Modal";
import EditBusinessForm from '../BusinessForms/editBusinessForm';

import { getAllBusinessesThunk } from '../../store/businesses';
import { getOneBusinessThunk } from '../../store/businesses';
import { getAllUsersThunk } from '../../store/users';

import phoneIcon from "../../icons/phone-icon.png";
import directionIcon from "../../icons/direction-icon.png";
import starIcon from "../../icons/star-icon.png";
import cameraIcon from "../../icons/camera-icon.png";

import './businessDetails.css'


const BusinessDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const { businessId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const currBusiness = useSelector(state => state.businesses[businessId])

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);

    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])


    let phonesString
    if (isLoaded) {
        phonesString = JSON.stringify(currBusiness.phone)
    }


    return (
        isLoaded && (
            <div className='business-details-container'>
                <div className='business-images-container'>
                    <img className='business-image' src={currBusiness.previewImageUrl}></img>
                </div>
                <div className='business-details-header-container'>
                    <div style={{ fontSize: '46px', color: 'white', fontWeight: 'bold' }}>{currBusiness.name}</div>
                    <div className='business-details-header-info'>
                        <div className='business-details-header-info-inner'>
                            <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>RATINGS HERE</div>
                            <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>#REVIEWS</div>
                            <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>{currBusiness.price}</div>
                        </div>
                        <div>
                            {/* <NavLink to= > */}
                            <div className='all-photos-bttn'>See All Photos</div>
                            {/* </NavLink> */}
                        </div>
                    </div>
                </div>
                <div className='business-details-bttm-container'>
                    <div className='business-details-bttm-wrapper'>
                        <div className='business-details-bttm-left'>
                            <div className='upload-bttn-container'>
                                <button className='review-bttn'>
                                    <img className='star-icon' src={starIcon}></img>
                                    Write a review
                                </button>
                                <button className='add-photo-bttn'>
                                    <img className='camera-icon' src={cameraIcon}></img>
                                    Add photo
                                </button>
                            </div>
                            <div className='reviews-container'>
                                <div>REVIEWS HERE</div>
                            </div>
                        </div>
                        <div className='business-details-bttm-right'>
                            {currBusiness.userId === sessionUser?.id && (
                                <div className='owner-options'>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Owner Options: </div>
                                    <div className='owner-options-bttns'>
                                        <button className='review-bttn' onClick={() => setShowUpdateBusiness(true)}>Edit Business</button>
                                        <button className='review-bttn'>Delete Business</button>
                                        {showUpdateBusiness && (
                                            <Modal onClose={() => setShowUpdateBusiness(false)}>
                                                <EditBusinessForm businessId={businessId} setShowUpdateBusiness={setShowUpdateBusiness} />
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
                                    {currBusiness.address} {currBusiness.city}, {currBusiness.state} {currBusiness.zip}
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
