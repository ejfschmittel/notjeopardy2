import { combineReducers } from "redux"
import categoryTypes from "../category.types"
import quizTypes from "../../quiz/quiz.types"

const catObj = (state = {}, action) => {
    switch(action.type){
        case categoryTypes.CATEGORY_FAVORITE_START:
            return {...state, isPending: true}
        case categoryTypes.CATEGORY_FAVORITE_ERROR: 
            return {...state, isPending: false}  
        case categoryTypes.CATEGORY_FAVORITE_SUCCESS:
            return {...state, isPending: false, is_favorited: true}
        case categoryTypes.CATEGORY_UNFAVORITE_SUCCESS:
            return {...state, isPending: false, is_favorited: false}
        default:
            return state
    }
}

const byId = (state = {}, action) => {
    let newState = null
    switch(action.type){
        case categoryTypes.FETCH_CATEGORIES_SUCCESS:
        case categoryTypes.FETCH_USER_CATEGORIES_SUCCESS:
        case categoryTypes.FETCH_OFFICIAL_CATEGORIES_SUCCESS:
            newState = {...state}
            action.response.forEach(category => {
                newState[category.id] = category
            })
            return newState

        case quizTypes.CREATE_QUIZ_SUCCESS:
            newState = {...state}
            action.response.categories.forEach(({category}) => {
                newState[category.id] = category
            })
            return newState

        case categoryTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                [action.response.id]: {...action.response, justCreated: true }
            }
        case categoryTypes.CATEGORY_FAVORITE_START:
        case categoryTypes.CATEGORY_FAVORITE_ERROR:   
        case categoryTypes.CATEGORY_FAVORITE_SUCCESS:
        case categoryTypes.CATEGORY_UNFAVORITE_SUCCESS:
            return {
                ...state,
                [action.categoryid]: catObj(state[action.categoryid], action)
            }

        // favorite with category reducer
        default:
            return state
    }
}



export default byId