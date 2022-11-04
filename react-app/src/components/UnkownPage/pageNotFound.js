import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import kelpLogo from '../../icons/Kelp-logo.png'

import "./pageNotFound.css";

export function PageNotFound() {

  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    history.push('/login');
  };


  if (!sessionUser) {
    return (
      <div className="login-container-PNF">
        <div className="inner-login-PNF">
          <img className="logo-PNF" src={kelpLogo}></img>
          <div className="title-PNF">Sign In Required</div>
          <button className="login-bttn-PNF" onClick={onLogin}>
            Click here to login
          </button>
        </div>
      </div>
    );
  }
  else return (
    <div className="login-container-PNF">
      <div className="inner-login-PNF">
        <img className="logo-PNF" src={kelpLogo}></img>
        <div className="title-PNF">Page Not Found</div>
        <div className="link-error">
          <NavLink to="/restaurants" className='link-error-text'>Click here to go back to all businesses page</NavLink>
        </div>
      </div>
    </div>
  );
}
