import {post} from "../auth/auth.actions"
import quizTypes from "./quiz.types"

const BASE_URL = "http://127.0.0.1:8000/api/"

export const createQuiz = (quizData) => async (dispatch) => {
 
    dispatch({type: quizTypes.CREATE_QUIZ_START})

    try {
        const url = BASE_URL + "quiz/"
        const response = await post(url, quizData)
        dispatch({
            type: quizTypes.CREATE_QUIZ_SUCCESS,
            response
        })
    }catch(error){
        dispatch({
            type: quizTypes.CREATE_QUIZ_ERROR,
            error: error.response
        })
    }
}

/*
export const createQuiz = (quizData) => async (dispatch) => {
    console.log(dispatch)
    dispatch({type: quizTypes.CREATE_QUIZ_START})
    console.log(quizData)

    /*try {
        const url = BASE_URL + "quiz/"
        const response = post(url, quizData)
        dispatch({
            type: quizTypes.CREATE_QUIZ_SUCCESS,
            response
        })
    }catch(error){
        dispatch({
            type: quizTypes.CREATE_QUIZ_ERROR,
            error: error.response
        })
    }

}*/