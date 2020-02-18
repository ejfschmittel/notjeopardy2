import authTypes, {AUTH_TOKEN_NAME} from "./auth.types"
import {request, mergeRequestSettings} from "../../utils/request"
import store from "../index"
import {isTokenAlive, removeJWTToken, tokenExpiresInTimeDelta, getJWTToken, setJWTToken} from "../../utils/jwt"

// rename to auth



const AUTH_TOKEN_REFRESH_DELTA = 10 * 60  // 10min

const BASE_API_URL = "http://127.0.0.1:8000/api";
const USERS_BASE_URL = BASE_API_URL + "users/"


const USER_SIGNUP_API_URL = BASE_API_URL + "/users/"
const USER_LOGIN_API_URL = BASE_API_URL + "/users/login/"


const isUserLoggedIn = () => {

    console.log(store.getState())
    if(store.getState().authReducer.isAuthenticated){

        if(!isTokenAlive(AUTH_TOKEN_NAME)){
            store.dispatch(logoutUser())
            return false;
        }

        return true;
    }
    return false;
}

const shouldRefreshAuthToken = () => tokenExpiresInTimeDelta(AUTH_TOKEN_NAME, AUTH_TOKEN_REFRESH_DELTA)


const refreshAuthToken = async () => {
    const url = BASE_API_URL + "users/refresh_token/"

    return await request(url, {
        method: "POST",
        body: JSON.stringify({token: getJWTToken(AUTH_TOKEN_NAME)})
    }).then(async response => {
        await store.dispatch(loginSuccess(response))
    })

}

const authenticatedRequest = async (url, settings={}) => {
    let requestSettings = {...settings}

    console.log("authenticated request")
    console.log(isUserLoggedIn())
    if(isUserLoggedIn()){
        if(shouldRefreshAuthToken()){
            await refreshAuthToken();
        }
        console.log("authenticated request 2")
        
        requestSettings = mergeRequestSettings({headers: getAuthHeaders()}, requestSettings)

    }

    return await request(url, requestSettings)
}



const getAuthHeaders = () => ({'Authorization': 'JWT ' + getJWTToken(AUTH_TOKEN_NAME)})


export const get = async (url, settings={}) => authenticatedRequest(url, {...settings, methods: "GET"})

export const post = async (url, postData, settings={}) => {
    const requestSettings = {
        ...settings,
        body: JSON.stringify(postData),
        method: "POST"
    }

    return await authenticatedRequest(url, requestSettings) 
}

export const rdelete = async (url, data, settings={}) => {
    const requestSettings = {
        ...settings,
        body: JSON.stringify(data),
        method: "DELETE"
    }

    return await authenticatedRequest(url, requestSettings) 
}

export const postMedia = async (url, postData, settings={}) => {
    const requestSettings = mergeRequestSettings({},settings)
    return await post(url, postData, requestSettings)
}

const loginSuccess = (data) => {
    setJWTToken(data.token)
    return{
      type: authTypes.LOGIN_SUCCESS,
      payload: {
        ...data,
        loading: false,
        isAuthenticated: true,
      }
    }
  }


  

const loginUserStart = () => ({
    type: authTypes.LOGIN_START
})

export const loginUserSuccess = (data) => {
    setJWTToken(AUTH_TOKEN_NAME, data.token)

    return {
        type: authTypes.LOGIN_SUCCESS,
        payload: data
    }
}

const loginUserError = (error) => ({
    type: authTypes.LOGIN_ERROR,
    payload: error
})

export const loginUser = (loginData) => async (dispatch) => {
    dispatch(loginUserStart())

    try{
        const response = await post(USER_LOGIN_API_URL, loginData)
        dispatch(loginUserSuccess(response))
    }catch(error){
        dispatch(loginUserError(error.response))
    }
}

export const logoutUser = () => {
    removeJWTToken(AUTH_TOKEN_NAME);
  
    return {
      type: authTypes.LOGOUT
    }
}


const signUpUserStart = () => ({
    type: authTypes.SIGNUP_START
})

const signUpUserSuccess = (data) => ({
    type: authTypes.SIGNUP_SUCCESS
})

const signUpUserError = (error) => ({
    type: authTypes.SIGNUP_ERROR,
    payload: error
})

export const signUpUser = (signupData) => async (dispatch) => {
    dispatch(signUpUserStart())

    try{
        const response = await post(USER_SIGNUP_API_URL, signupData)
        dispatch(signUpUserSuccess())
    }catch(error){
        dispatch(signUpUserError(error.response))
    }
}