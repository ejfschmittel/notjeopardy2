import {post, get, rdelete} from "../auth/auth.actions"
import categoryTypes from "./category.types"
import { bindActionCreators } from "redux";

const BASE_API_URL = "http://127.0.0.1:8000/api";
const CATEGORY_CREATE_URL = BASE_API_URL + "/categories/"
const FETCH_CATEGORIES_URL = BASE_API_URL + "/categories/"


const FAVORITE_CATEGORY_URL = BASE_API_URL + "/categories/favorite/"
const UNFAVORITE_CATEGORY_URL = BASE_API_URL + "/categories/unfavorite/"


/* FETCH CATEGORIES */

const getCategoriesStart = () => ({
    type: categoryTypes.FETCH_CATEGORIES_START
})

const getCategoriesSuccess = (categoriesById, categoryIdList) => ({
    type: categoryTypes.FETCH_CATEGORIES_SUCCESS,
    payload: {
        categoriesById,
        categoryIdList
    }
})

const getCategoriesError = (error) => ({
    type: categoryTypes.FETCH_CATEGORIES_ERROR,
    payload: error
})

export const getCatgories = () => async (dispatch) => {

    dispatch(getCategoriesStart())

    try{
        const response = await get(FETCH_CATEGORIES_URL)

        const categoryIdList = response.reduce((list, category) => [...list, category.id], [])
        const categoriesById = response.reduce((obj, category) => ({...obj, [category.id]:category}), {})

        dispatch(getCategoriesSuccess(categoriesById, categoryIdList))
    }catch(error){
        dispatch(getCategoriesError(error.response))
    }
}


/* CREATE CATEGORY */

const createCategoryStart = () => ({
    type: categoryTypes.CREATE_CATEGORY_START
})

const createCategorySuccess = (category) => ({
    type: categoryTypes.CREATE_CATEGORY_SUCCESS,
    payload: category
})

const createCategoryError = (error, alreadyExisted=false) => ({
    type: categoryTypes.CREATE_CATEGORY_ERROR,
    payload: {error, alreadyExisted}
})

export const createCategory = (categoryData) => async (dispatch) => {
    dispatch(createCategoryStart())

    try{
        const response = await post(CATEGORY_CREATE_URL, categoryData)
        dispatch(createCategorySuccess(response))
    }catch(error){

        if(error.raw_response.status === 400 && error.response.name[0] === "category with this name already exists."){
            dispatch(createCategoryError(error.response, true))
        }else{
            dispatch(createCategoryError(error.response))
        }
    }
}


/* FAVORITE / UNFAVORITE CATEGORY */

const categoryFavoriteStart = (categoryid) => ({
    type: categoryTypes.CATEGORY_FAVORITE_START,
    payload: categoryid
})

const categoryFavoriteSuccess = (categoryid) => ({
    type: categoryTypes.CATEGORY_FAVORITE_SUCCESS,
    payload: categoryid
})

const categoryUnFavoriteSuccess = (categoryid) => ({
    type: categoryTypes.CATEGORY_UNFAVORITE_SUCCESS,
    payload: categoryid
})


const categoryFavoriteError = (categoryid) => ({
    type: categoryTypes.CATEGORY_FAVORITE_ERROR,
    payload: categoryid
})


export const favoriteCategory = (categoryid) => async (dispatch) => {
    dispatch(categoryFavoriteStart(categoryid))

    console.log(categoryid)

    const url = BASE_API_URL + `/categories/${categoryid}/favorite/`;

    try{
        const response = await post(url, {category: categoryid})
        dispatch(categoryFavoriteSuccess(categoryid))
    }catch(error){
        dispatch(categoryFavoriteError(categoryid))
    }
}

export const unfavoriteCategory = (categoryid) => async (dispatch) => {
    dispatch(categoryFavoriteStart(categoryid))

    const url = BASE_API_URL + `/categories/${categoryid}/unfavorite/`;

    try{
        const response = await post(url, {category: categoryid})
        dispatch(categoryUnFavoriteSuccess(categoryid))
    }catch(error){
        console.log(error)
        dispatch(categoryFavoriteError(categoryid))
    }
}

