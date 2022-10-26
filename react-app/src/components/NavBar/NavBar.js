import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { getAllUsersThunk } from '../../store/users';
import { getAllBusinessesThunk } from '../../store/businesses';

import * as sessionActions from "../../store/session";

import LogoutButton from '../auth/LogoutButton'

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  if (sessionUser) {
    return (
      <nav className='nav-container-auth'>
        <div className='nav-left-container-auth'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
        </div>
        <div className='nav-right-container-auth'>
          <button onClick={logout}>
            Log Out &nbsp; &nbsp; &nbsp; &nbsp;
          </button>
        </div>
      </nav>
    );
  } if (!sessionUser) {
    return (
      <nav className='nav-container-noAuth'>
        <div className='nav-wrapper-noAuth'>
           <div className='nav-left-container-noAuth'>
          <div>
            <NavLink to='/'>
              <img className='nav-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/2560px-Yelp_Logo.svg.png'></img>
            </NavLink>
          </div>
        </div>
        <div className='nav-right-container-noAuth'>
          <div className='login-signup-container-noAuth'>
            <NavLink to='/login' >
              <div className='login-bttn'>Login</div>
            </NavLink>
            <NavLink to='/sign-up'>
              <div className='signup-bttn'>Sign Up</div>
            </NavLink>
          </div>
        </div>
        </div>

      </nav>
    );
  };

  // return (
  //   <nav>
  //     <ul>
  //       <li>
  //         <NavLink to='/' exact={true} activeClassName='active'>
  //           Home
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/login' exact={true} activeClassName='active'>
  //           Login
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //           Sign Up
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/users' exact={true} activeClassName='active'>
  //           Users
  //         </NavLink>
  //       </li>
  //       <li>
  //         <LogoutButton />
  //       </li>
  //     </ul>
  //   </nav>
  // );
}

export default NavBar;
