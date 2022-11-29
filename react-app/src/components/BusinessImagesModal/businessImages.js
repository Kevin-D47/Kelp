import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';

import { getBusinessImagesThunk, } from '../../store/images'
import { getOneBusinessThunk } from '../../store/businesses';
import { getAllUsersThunk } from '../../store/users'

import { Modal } from '../../context/Modal';
import ImageDetails from '../BusinessImageDetails/imageDetails';

import imgNotFound from '../../icons/image-not-found.png'
import cameraIcon from "../../icons/camera-icon.png";
import closeIcon from "../../icons/x-icon.png";

import './businessImages.css'


const BusinessImages = ({ setShowAllBusinessImages, businessId }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)
    const currBusiness = useSelector(state => state.businesses[businessId])

    const allImages = useSelector(state => state.images)
    const getAllImageArr = Object.values(allImages)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const [isLoaded, setIsLoaded] = useState(false)
    const [displayAllImages, setDisplayAllImages] = useState(false)
    const [currImage, setCurrImage] = useState(false)

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
        dispatch(getBusinessImagesThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])


    return (
        isLoaded && (
            <div className='all-images-modal-container'>
                {displayAllImages === false ?
                    <div>
                        <div className='close-all-images-modal-container'>
                            <button className="close-all-images-modal" onClick={() => setShowAllBusinessImages(false)}>Close</button>
                            <img className='close-icon' src={closeIcon} onClick={() => setShowAllBusinessImages(false)}></img>
                        </div>
                        <div className='all-images-header-container'>
                            <div className='all-images-business-title'>Photos from {currBusiness.name}</div>
                            <Link to={`/businesses/${businessId}/images/new`}>
                                <button className='add-photo-bttn-modal'>
                                    <img className='camera-icon' src={cameraIcon}></img>
                                    Add photo
                                </button>
                            </Link>
                        </div>
                        <div className='all-business-images-container'>
                            {getAllImageArr.map((image) => {
                                return (
                                    <>
                                        <div single-business-image onClick={() => { setDisplayAllImages(!displayAllImages); setCurrImage(image) }}>
                                            <img
                                                className='single-business-image'
                                                src={image.imgUrl}
                                                alt={imgNotFound}
                                                onError={e => { e.currentTarget.src = imgNotFound }}
                                            />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div> :
                    <div>
                        <ImageDetails currImage={currImage} setDisplayAllImages={setDisplayAllImages} setShowAllBusinessImages={setShowAllBusinessImages} />
                    </div>
                }
            </div>
        )
    )
}

export default BusinessImages
