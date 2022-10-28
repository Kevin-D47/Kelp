import React from "react";
import { useDispatch } from "react-redux";
import { deleteBusinessThunk } from "../../store/businesses";
import { useHistory } from "react-router-dom";

import './deleteBusinessForm.css'


function DeleteBusinessForm({ businessId, setShowDeleteBusiness }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(deleteBusinessThunk(businessId))
            .then(() => setShowDeleteBusiness(false))
            .then(() => history.push("/restaurants"))
    };

    return (
        <div>
        <div className='delete-business-container'>
          <h3>Warning! This business will be deleted permently. Are you sure you want to proceed? </h3>
          <div className="delete-buttons-container">
            <button className="delete-business-button-yes" onClick={onSubmit}>YES</button>
            <button className="delete-business-button-no" onClick={() => setShowDeleteBusiness(false)}>NO</button>
          </div>
        </div>
      </div>
    );
}

export default DeleteBusinessForm;
