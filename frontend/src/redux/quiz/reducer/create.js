

import { combineReducers } from "redux"
import quizTypes from "../quiz.types"

const isPending = (state = false, action) => {
    console.log(action)
    switch(action.type){
        case quizTypes.CREATE_QUIZ_START:
            console.log("quiz create started")
            return true;
        case quizTypes.CREATE_QUIZ_ERROR:
        case quizTypes.CREATE_QUIZ_SUCCESS:
            return false;
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case quizTypes.CREATE_QUIZ_START:
        case quizTypes.CREATE_QUIZ_SUCCESS:
            return null;
        case quizTypes.CREATE_QUIZ_ERROR:
            return action.error
        default:
            return state
    }
}

const lastCreated = (state = null, action) => {
    switch(action.type){
        case quizTypes.CREATE_QUIZ_SUCCESS:
            return action.response
        default:
            return state
    }
}

export default combineReducers({
    isPending,
    error,
    lastCreated
})