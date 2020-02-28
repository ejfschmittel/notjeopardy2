

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

const currentQuizReducer = (state = null, action) => {

        const idReducer = (state=null, action) => {
            return state
        }
    
        const titleReducer = (state="", action) => {
            return state
        }
    
        const quizCategoriesReducer = (state=[], action) => {
            return state
        }
    
        const creatorReducer = (state={}, action) => {
            return state
        }
    
        const quizQuestionReducer = (state=[], action) => {
            return state
        }
    
        return combineReducers({
            id: idReducer,
            title: titleReducer,
            creator: creatorReducer,
            categories: quizCategoriesReducer,
            questions: quizQuestionReducer // all quiz question ids as array => 
        })
}

export default combineReducers({
    isPending,
    error,
    current: currentQuizReducer
})