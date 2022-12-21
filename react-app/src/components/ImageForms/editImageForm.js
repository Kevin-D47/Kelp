import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from 'react-router-dom';

import { updateImageThunk } from '../../store/images';

import './editImageForm.css'

const EditImageForm = ({ businessId, currImage, setDisplayImageDetail }) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const id = currImage.id

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [imgUrl, setImgUrl] = useState(currImage.imgUrl)
    const [description, setDescription] = useState(currImage.description)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = [];

        if (!imgUrl) errors.push("Please provide a image");
        if (!description || !description.split(" ").join("").length) errors.push("Please provide a description");
        if (description.length > 300) errors.push("Description cannot be over 300 characters long");

        setErrors(errors);
    }, [imgUrl, description]);


    if (sessionUser === null) {
        alert("You must be logged in to edit a review");
        return <Redirect to="/" />;
    }


    async function onSubmit(e) {
        e.preventDefault()

        setHasSubmitted(true)

        if (errors.length === 0) {
            dispatch(updateImageThunk(id, userId, businessId, imgUrl, description))
            
            window.location.reload()
        }
    };


    const errorList = errors.map((error) => (
        <p className='edit-review-single-error' key={error}>{error}</p>
    ))


    return (
        <div className="create-image-container">
            <div className="create-image-wrapper">
                <div className="edit-image-header">
                    <div className="title-add-photo">Edit Photo</div>
                    <div>Update your informations about your photo below.</div>
                </div>
                <div className="create-review-errors">
                    {hasSubmitted && errorList}
                </div>
                <div className="create-image-form-container">
                    <form className="create-image-form" onSubmit={onSubmit}>
                        <div className="create-bus-input-field">
                            <input
                                type="text"
                                placeholder="Image Url"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                            <textarea
                                className="description-input-field"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="edit-photo-submit-container">
                            <button
                                className="create-bus-form-bttn"
                                type="submit"
                                disabled={hasSubmitted && errors.length > 0}
                            >
                                Submit Image
                            </button>
                            <button className="edit-photo-button-no" onClick={() => setDisplayImageDetail(true)}>NO</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditImageForm
