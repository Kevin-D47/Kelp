import { useDispatch } from "react-redux";
import { deleteImageThunk, getBusinessImagesThunk } from "../../store/images";


const UserDeleteImageForm = ({ businessId, currImage, setDisplayUserImageDetails }) => {

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteImageThunk(businessId, currImage.id))

    window.location.reload()
  };

  return (
    <div >
      <div className='delete-business-container'>
        <h3>Warning! This photo will be deleted permently. Are you sure you want to proceed? </h3>
        <div className="delete-buttons-container">
          <button className="delete-business-button-yes" onClick={onSubmit}>YES</button>
          <button className="delete-business-button-no" onClick={() => setDisplayUserImageDetails(true)}>NO</button>
        </div>
      </div>
    </div >
  )
}

export default UserDeleteImageForm
