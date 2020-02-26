import { combineReducers } from "redux"
import questionTypes from "../question.types"

const isPending = (state = false, action) => {
    switch(action.type){
        case questionTypes.CREATE_QUESTION_START:
            return true;
        case questionTypes.CREATE_QUESTION_ERROR:
        case questionTypes.CREATE_QUESTION_SUCCESS:
            return false;
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case questionTypes.CREATE_QUESTION_START:
        case questionTypes.CREATE_QUESTION_SUCCESS:
            return null;
        case questionTypes.CREATE_CATEGORY_ERROR:
            return action.error
        default:
            return state
    }
}

const lastCreated = (state = null, action) => {
    switch(action.type){
        case questionTypes.CREATE_QUESTION_SUCCESS:
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