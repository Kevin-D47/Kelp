import { useDispatch } from "react-redux";
import { deleteImageThunk, getBusinessImagesThunk } from "../../store/images";


const DeleteImageForm = ({ businessId, currImage, setDisplayImageDetail, setDisplayAllImages }) => {

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteImageThunk(businessId, currImage.id))
    .then(() => setDisplayAllImages(true))
  };

  return (
    <div >
      <div className='delete-business-container'>
        <h3>Warning! This Image will be deleted permently. Are you sure you want to proceed? </h3>
        <div className="delete-buttons-container">
          <button className="delete-business-button-yes" onClick={onSubmit}>YES</button>
          <button className="delete-business-button-no" onClick={() => setDisplayImageDetail(true)}>NO</button>
        </div>
      </div>
    </div >
  )
}

export default DeleteImageForm
