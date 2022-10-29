import { useDispatch } from "react-redux";
import { deleteReviewThunk, getBusinessReviewsThunk } from "../../store/reviews"

import './deleteReviewForm.css'


const DeleteReviewForm = ({ businessId, currReview, setShowDeleteReview }) => {
  
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteReviewThunk(businessId, currReview.id))
    .then(() => setShowDeleteReview(false))
    .then(() => getBusinessReviewsThunk(businessId))
  };

  return (
    <div >
      <div className='delete-business-container'>
        <h3>Warning! This review will be deleted permently. Are you sure you want to proceed? </h3>
        <div className="delete-buttons-container">
          <button className="delete-business-button-yes" onClick={onSubmit}>YES</button>
          <button className="delete-business-button-no" onClick={() => setShowDeleteReview(false)}>NO</button>
        </div>
      </div>
    </div >
  )
}

export default DeleteReviewForm
