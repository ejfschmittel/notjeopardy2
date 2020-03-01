import quizTypes from "../quiz.types"
import {combineReducers} from "redux"

const isPending = (state=false, action) => {
    switch(action.type){
        case quizTypes.CREATE_QUIZ_START:
            return true
        case quizTypes.CREATE_QUIZ_ERROR:
        case quizTypes.CREATE_QUIZ_SUCCESS:
            return false
        default: return state
    }
}

const error = (state=null, action) => {
    switch(action.type){
        case quizTypes.CREATE_QUIZ_START:
        case quizTypes.CREATE_QUIZ_SUCCESS:
            return null
        case quizTypes.CREATE_QUIZ_ERROR:
            return action.error
        default: return state
    }
}

export default combineReducers({
    isPending,
    error,

})