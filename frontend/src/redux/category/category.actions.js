import {post, get, rdelete} from "../auth/auth.actions"
import categoryTypes from "./category.types"
import { bindActionCreators } from "redux";

const BASE_API_URL = "http://127.0.0.1:8000/api";
const CATEGORY_CREATE_URL = BASE_API_URL + "/categories/"
const FETCH_CATEGORIES_URL = BASE_API_URL + "/categories/"


const FAVORITE_CATEGORY_URL = BASE_API_URL + "/categories/favorite/"
const UNFAVORITE_CATEGORY_URL = BASE_API_URL + "/categories/unfavorite/"


export const getCatgories = () => async (dispatch) => {

    dispatch({ type: categoryTypes.FETCH_USER_CATEGORIES_START})

    try{
        const response = await get(FETCH_CATEGORIES_URL)

        return dispatch({
            type: categoryTypes.FETCH_USER_CATEGORIES_SUCCESS,
            response,
        })
    }catch(error){
        dispatch({
            type: categoryTypes.FETCH_USER_CATEGORIES_ERROR,
            error: error.response,
        })
    }
}

export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({type: categoryTypes.CREATE_CATEGORY_START})

    const url = BASE_API_URL + "/categories/"

    try{
        const response = await post(url, categoryData)
        dispatch({
            type: categoryTypes.CREATE_CATEGORY_SUCCESS,
            response
        })
    }catch(error){    
        dispatch({
            type: categoryTypes.CREATE_CATEGORY_ERROR,
            error: error.response || "Failed to create new category"
        })
    }
}

export const favoriteCategory = (categoryid) => async (dispatch) => {
    dispatch({
        type: categoryTypes.CATEGORY_FAVORITE_START,
        categoryid
    })

    const url = BASE_API_URL + `/categories/${categoryid}/favorite/`;

    try{
        const response = await post(url, {category: categoryid})
        dispatch({
            type: categoryTypes.CATEGORY_FAVORITE_SUCCESS,
            categoryid
        })
    }catch(error){
        dispatch({
            type: categoryTypes.CATEGORY_FAVORITE_ERROR,
            categoryid
        })
    }
}

export const unfavoriteCategory = (categoryid) => async (dispatch) => {
    dispatch({
        type: categoryTypes.CATEGORY_FAVORITE_START,
        categoryid
    })

    const url = BASE_API_URL + `/categories/${categoryid}/unfavorite/`;

    try{
        const response = await post(url, {category: categoryid})
        dispatch({
            type: categoryTypes.CATEGORY_UNFAVORITE_SUCCESS,
            categoryid
        })
    }catch(error){
        dispatch({
            type: categoryTypes.CATEGORY_FAVORITE_ERROR,
            categoryid
        })
    }
}


