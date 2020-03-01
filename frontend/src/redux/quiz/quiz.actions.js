import {post, get} from "../auth/auth.actions"
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
// {"title":"test","categories":[{"id":"73f7a75e-2671-4855-894b-1deb0524991d","name":"gaming","official":true,"creator":{"id":1,"username":"ejfschmittel"},"is_favorited":false},{"name":"gamin","id":null},{"name":"test","id":null}]}


export const setQuizStatusEditQuestions = dispatch => dispatch({
    type: quizTypes.SET_QUIZ_STATUS_EDIT_QUESTIONS
})

export const setQuizStatusEditBaseInfo = dispatch => dispatch({
    type: quizTypes.SET_QUIZ_STATUS_EDIT_BASE_INFO
})
    

export const fetchQuizDetail = (quizId) => async (dispatch) => {
    dispatch({
        type: quizTypes.FETCH_QUIZ_START,
        id: quizId
    })

    try {
        const url = BASE_URL + "quiz/" + quizId + "/"

        const response = await get(url)

        dispatch({
            type: quizTypes.FETCH_QUIZ_SUCCESS,
            id: quizId,
            response
        })
    }catch(error){
     
        dispatch({
            type: quizTypes.FETCH_QUIZ_ERROR,
            id: quizId,
            error: error.response
        })
    }
}

export const createQuiz = (quizData) => async (dispatch) => {
 
    dispatch({type: quizTypes.CREATE_QUIZ_START})

    try {
        const url = BASE_URL + "quiz/"
        console.log(JSON.stringify(quizData))
        const response = await post(url, quizData)

        return dispatch({
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

