import {post} from "../auth/auth.actions"
import quizTypes from "./quiz.types"

const BASE_URL = "http://127.0.0.1:8000/api/"

/**
    set_quiz_data: titlte + categories
    set_quiz_question: // in quiz questions

    quiz_question => foreig key
    

    qutofill_categories: autofille missing categories / => directly set on server ???
    autofill_questions: autofills missing questions / categories

    delete_quiz
*/

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