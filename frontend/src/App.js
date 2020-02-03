import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./components/header/header.component"
import { useSelector, useDispatch } from "react-redux"
import LoginPage from "./components/login/login.component"
import SignupPage from "./components/signup/signup.component"
import { getJWTToken, isTokenAlive, getDecodedToken, isDecodedTokenAlive } from './utils/jwt';
import {AUTH_TOKEN_NAME, loginUserSuccess} from "./redux/auth/auth.actions"


import "./styles/main.scss";

const useLoginUserAfterPageRefresh = () => {
    const isAuthenticated = useSelector(({authReducer}) => authReducer.isAuthenticated)
    const dispatch = useDispatch();

    useEffect(() => {
      const token = getJWTToken(AUTH_TOKEN_NAME)
     
      if(!isAuthenticated && token){
        const decodedToken = getDecodedToken(AUTH_TOKEN_NAME)
        if(isDecodedTokenAlive(decodedToken)){
          dispatch(loginUserSuccess({
            token,
            user: {
              username: decodedToken.username,
              emai: decodedToken.email,
              user_id: decodedToken.user_id
            }
          }))
        }
      }

      return () => null;
    }, [])
}

function App() {
  useLoginUserAfterPageRefresh();

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
