import {post, get, rdelete} from "../auth/auth.actions"
import questionTypes from "./question.types"


const BASE_API_URL = "http://127.0.0.1:8000/api/";



export const getQuestions = () => async (dispatch) => {

    dispatch({type: questionTypes.FETCH_QUESTIONS_START})

    const url = `${BASE_API_URL}questions/`

    try{
        const response = await get(url)
       
        dispatch({
            type: questionTypes.FETCH_QUESTIONS_SUCCESS,
            response
        })
    }catch(error){
        dispatch({
            type: questionTypes.FETCH_QUESTIONS_ERROR,
            error: error.response
        })
    }
}


export const createQuestion = (questionData) => async (dispatch) => {

    dispatch({type: questionTypes.CREATE_QUESTION_START})

    const url = BASE_API_URL + "questions/"

    try{
        const response = await post(url, questionData)

        dispatch({
            type: questionTypes.CREATE_QUESTION_SUCCESS,
            response
        })
    }catch(error){
        dispatch({
            type: questionTypes.CREATE_QUESTION_ERROR,
            error: error.response || "Failed to create question."
        })
    }
}





export const deleteQuestion = (questionId) => async (dispatch) => {

    dispatch({
        type: questionTypes.DELETE_QUESTION_START,
        id: questionId
    })

    const url = `${BASE_API_URL}questions/${questionId}/`


    try{
        const response = await rdelete(url)

        dispatch({
            type: questionTypes.DELETE_QUESTION_SUCCESS,
            id: questionId
        }) 
    }catch(error){
        dispatch({
            type: questionTypes.DELETE_QUESTION_ERROR,
            id: questionId,
            error: error.response
        })
    }
}

export const favoriteQuestion = (questionId) => async (dispatch) => {
    dispatch({
        type: questionTypes.FAVORITE_QUESTION_START,
        id: questionId
    })

    const url = `${BASE_API_URL}questions/${questionId}/favorite/`

    try{
        const response = await post(url)

        dispatch({
            type: questionTypes.FAVORITE_QUESTION_SUCCESS,
            id: questionId
        }) 
    }catch(error){
        dispatch({
            type: questionTypes.FAVORITE_QUESTION_ERROR,
            id: questionId,
            error: error.response
        })
    }
}

export const unfavoriteQuestion = (questionId) => async (dispatch) => {
    dispatch({
        type: questionTypes.FAVORITE_QUESTION_START,
        id: questionId
    })

    const url = `${BASE_API_URL}questions/${questionId}/unfavorite/`

    try{
        const response = await post(url)

        dispatch({
            type: questionTypes.UNFAVORITE_QUESTION_SUCCESS,
            id: questionId
        }) 
    }catch(error){
        dispatch({
            type: questionTypes.FAVORITE_QUESTION_ERROR,
            id: questionId,
            error: error.response
        })
    }
}


