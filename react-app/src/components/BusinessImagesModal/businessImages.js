import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBusinessImagesThunk, } from '../../store/images'
import { getOneBusinessThunk } from '../../store/businesses';
import { getAllUsersThunk } from '../../store/users'

import imgNotFound from '../../icons/image-not-found.png'
import cameraIcon from "../../icons/camera-icon.png";

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
                <div className='all-images-header-container'>
                    <div className='all-images-business-title'>Photos from {currBusiness.name}</div>
                    <button className='add-photo-bttn-modal'>
                        <img className='camera-icon' src={cameraIcon}></img>
                        Add photo
                    </button>
                </div>
                <div className='all-business-images-container'>
                    {getAllImageArr.map((image) => {
                        return (
                            <div>
                                <img
                                    className='single-business-image'
                                    src={image.imgUrl}
                                    alt={imgNotFound}
                                    onError={e => { e.currentTarget.src = imgNotFound }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default BusinessImages
