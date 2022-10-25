import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import { getAllUsersThunk } from '../../store/users';
import { getAllBusinessesThunk } from '../../store/businesses';

import LogoutButton from '../auth/LogoutButton'

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);


  if (user) {
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

        </div>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>

      </nav>
    );
  } if (!user) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
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
