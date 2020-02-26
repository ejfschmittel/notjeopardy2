import { combineReducers } from "redux"
import questionTypes from "../question.types"


const questinObj = (state = {}, action) => {
    switch(action.type){
        case questionTypes.DELETE_QUESTION_START:
            return {...state, isPending: true, isDeleting: true}
        case questionTypes.DELETE_QUESTION_SUCCESS: 
            return {...state, isPending: false, isDeleting: false}  
        case questionTypes.DELETE_QUESTION_ERROR:
            return {...state, isPending: false, isDeleting: false, error: action.error.detail}
        case questionTypes.FAVORITE_QUESTION_START:
            return {...state, isPending: true, isFavoriting: true} 
        case questionTypes.FAVORITE_QUESTION_SUCCESS:
            return {...state, isPending: false, isFavoriting: false, is_favorited: true} 
        case questionTypes.UNFAVORITE_QUESTION_SUCCESS:
            return {...state, isPending: false, isFavoriting: false, is_favorited: false} 
        case questionTypes.FAVORITE_QUESTION_ERROR:
            return {...state, isPending: false, isFavoriting: false, error: action.error} 
        default:
            return state
    }
}

const byId = (state = {}, action) => {
    switch(action.type){
        case questionTypes.FETCH_QUESTIONS_SUCCESS:
            const newState = {...state}
            action.response.forEach(category => {
                newState[category.id] = category
            })
            return newState

        case questionTypes.CREATE_QUESTION_SUCCESS:
            return {
                ...state,
                [action.response.id]: {...action.response, justCreated: true }
            }
        case questionTypes.DELETE_QUESTION_START:
        case questionTypes.DELETE_QUESTION_SUCCESS:
        case questionTypes.DELETE_QUESTION_ERROR:
        case questionTypes.FAVORITE_QUESTION_START:
        case questionTypes.UNFAVORITE_QUESTION_SUCCESS:
        case questionTypes.FAVORITE_QUESTION_SUCCESS:
        case questionTypes.FAVORITE_QUESTION_ERROR:
            return {
                ...state,
                [action.id]: questinObj(state[action.id], action)
            }
      /*  case questionTypes.CATEGORY_FAVORITE_START:
        case questionTypes.CATEGORY_FAVORITE_ERROR:   
        case questionTypes.CATEGORY_FAVORITE_SUCCESS:
        case questionTypes.CATEGORY_UNFAVORITE_SUCCESS:
            return {
                ...state,
                [action.categoryid]: catObj(state[action.categoryid], action)
            }*/

        // favorite with category reducer
        default:
            return state
    }
}



export default byId