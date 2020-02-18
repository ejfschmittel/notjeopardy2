import authTypes from "./auth.types"

import { getJWTToken, isTokenAlive, getDecodedToken, isDecodedTokenAlive } from '../../utils/jwt';
import {AUTH_TOKEN_NAME} from "./auth.types"

let INITIAL_STATE = {
    token: null,
    user: null,
    isAuthenticated: false,

    isLoggingIn: false,
    logginError: null,

    isSigningUp: false,
    signupError: null,
}



const checkLogin = () => {
      const token = getJWTToken(AUTH_TOKEN_NAME)
     
      if(token){
        const decodedToken = getDecodedToken(AUTH_TOKEN_NAME)
        if(isDecodedTokenAlive(decodedToken)){
          console.log("auto login")
          INITIAL_STATE = {
            ...INITIAL_STATE,
            token,
            user: {
                username: decodedToken.username,
                email: decodedToken.email,
                user_id: decodedToken.user_id
            },
            isAuthenticated: true
          }
        }
      }
}

checkLogin();

const authReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case authTypes.SIGNUP_START: 
            return {...state, isSigningUp: true}
        case authTypes.SIGNUP_SUCCESS: 
            return {...state, isSigningUp: false, signupError: null}
        case authTypes.SIGNUP_ERROR: 
            return {...state, isSigningUp: false, signupError: action.payload}

        case authTypes.LOGIN_START: 
            return {...state, isLoggingIn: true}
        case authTypes.LOGIN_SUCCESS: 
            return {
                ...state, 
                isLoggingIn: false, 
                logginError: null, 
                user: action.payload.user, 
                token: action.payload.token, 
                isAuthenticated: true
            }
        case authTypes.LOGIN_ERROR: 
            return {...state, isLoggingIn: false, logginError: action.payload}

        case authTypes.LOGOUT:
            return {...state, isLoggingIn: false, logginError: null, user: null, isAuthenticated: false, token: null}

        default:
            return state
    }
}

export default authReducer