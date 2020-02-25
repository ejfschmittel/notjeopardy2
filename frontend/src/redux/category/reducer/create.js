import { combineReducers } from "redux"
import categoryTypes from "../category.types"

const isPending = (state = false, action) => {
    switch(action.type){
        case categoryTypes.CREATE_CATEGORY_START:
            return true;
        case categoryTypes.CREATE_CATEGORY_SUCCESS:
        case categoryTypes.CREATE_CATEGORY_ERROR:
            return false;
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case categoryTypes.CREATE_CATEGORY_START:
            return true;
        case categoryTypes.CREATE_CATEGORY_SUCCESS:
        case categoryTypes.CREATE_CATEGORY_ERROR:
            return false;
        default:
            return state
    }
}

const lastCreated = (state = null, action) => {
    switch(action.type){
        case categoryTypes.CREATE_CATEGORY_SUCCESS:
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