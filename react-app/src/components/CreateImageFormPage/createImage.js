import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect, useParams } from "react-router-dom";

import { createImageThunk } from "../../store/images";
import { getOneBusinessThunk } from '../../store/businesses'

import photoFrame from '../../icons/photo-frame.png'

import './createImage.css'


const CreateImageForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { businessId } = useParams();
    const currBusiness = useSelector((state) => state.businesses[businessId])

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    const [isLoaded, setIsLoaded] = useState(false)
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])


    useEffect(() => {
        const errors = [];

        if (!imgUrl) errors.push("Please provide a image");
        if (!description || !description.split(" ").join("").length) errors.push("Please provide a description");
        if (description.length > 300) errors.push("Description cannot be over 300 characters long");

        setErrors(errors);
    }, [imgUrl, description]);


    if (sessionUser === null) {
        alert("You must be logged in to make a business");
        return <Redirect to="/" />;
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (errors.length > 0) {
            return alert("There was an error with your submission, Please recheck your inputs");
        }

        const createdImage = dispatch(createImageThunk(userId, businessId, imgUrl, description));

        if (createdImage) {
            history.push(`/businesses/${businessId}`);
        }
    };


    const errorList = errors.map((error) => (
        <p className='create-review-single-error' key={error}>{error}</p>
    ))


    return (
        isLoaded && (
            <div className="create-image-container">
                <div className="create-image-wrapper">
                    <div className="create-image-header">
                        <NavLink to={`/businesses/${businessId}`}>
                            <div className="create-image-business-title">{currBusiness.name}:</div>
                        </NavLink>
                        <div className="title-add-photo">Add Photos</div>
                    </div>
                    <div className="create-review-errors">
                        {hasSubmitted && errorList}
                    </div>
                    <div className="create-image-form-container">
                        <img className="photo-frame" src={photoFrame}></img>
                        <form className="create-image-form" onSubmit={onSubmit}>
                            <div className="create-bus-input-field">
                                <input
                                    type="text"
                                    placeholder="Image Url"
                                    value={imgUrl}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                />
                                <input
                                    className="create-bus-input-field"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="create-review-submit-container">
                                <button
                                    className="create-bus-form-bttn"
                                    type="submit"
                                    disabled={hasSubmitted && errors.length > 0}
                                >
                                    Submit Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}


export default CreateImageForm
