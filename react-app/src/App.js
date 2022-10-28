import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import HomePage from "./components/HomePage/home";
import GetAllBusinesses from './components/RestaurantsPage/restaurants';
import CreateBusinessForm from './components/CreateBusinessFormPage/createBusiness';
import BusinessDetails from './components/BusinessDetailsPage/businessDetails';
import CreateReviewForm from './components/CreateReviewFormPage/creatReview';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/businesses/:businessId/reviews/new'>
          <CreateReviewForm />
        </Route>
        <Route path="/businesses/:businessId" exact={true}>
          <BusinessDetails />
        </Route>
        <Route path="/restaurants" exact={true}>
          <GetAllBusinesses />
        </Route>
        <Route path="/new" exact={true}>
          <CreateBusinessForm />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
