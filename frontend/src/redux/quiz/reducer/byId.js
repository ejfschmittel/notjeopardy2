import quizTypes from "../quiz.types"
import {combineReducers} from "redux"

const createQuizReducer = () => {
    const idReducer = (state=null, action) => {
        switch(action.type){
            case quizTypes.CREATE_QUIZ_SUCCESS:
            case quizTypes.FETCH_QUIZ_SUCCESS:
                return action.response.id
            default: return state
        }
    }

    const titleReducer = (state="", action) => {
        switch(action.type){
            case quizTypes.CREATE_QUIZ_SUCCESS:
            case quizTypes.FETCH_QUIZ_SUCCESS:
                return action.response.title
            default: return state
        }
    }

    const creatorReducer = (state={}, action) => {
        switch(action.type){
            case quizTypes.CREATE_QUIZ_SUCCESS:
            case quizTypes.FETCH_QUIZ_SUCCESS:
                return action.response.creator
            default: return state
        }
    }

    const quizCategoriesReducer = (state=[], action) => {
        switch(action.type){
            case quizTypes.CREATE_QUIZ_SUCCESS:
            case quizTypes.FETCH_QUIZ_SUCCESS:
                return action.response.categories.map(quizCategory => quizCategory.category.id)
            default: return state
        }
    }

    const quizQuestionsReducer = (state=[], action) => {
        switch(action.type){
            default: return state
        }
    }

    const error = (state=null, action) => {
        switch(action.type){
            case quizTypes.FETCH_QUIZ_ERROR:
                return action.error
            case quizTypes.FETCH_QUIZ_SUCCESS:
            case quizTypes.CREATE_QUIZ_SUCCESS:
                return null
            default: return state
        }
    }

    const isPending = (state=false, action) => {

        switch(action.type){
            case quizTypes.FETCH_QUIZ_START:
                return true
            case quizTypes.FETCH_QUIZ_START:
            case quizTypes.FETCH_QUIZ_ERROR:
                return false
            default: return state
        }
    }

    return combineReducers({
        id: idReducer,
        title: titleReducer,
        creator: creatorReducer,
        categories: quizCategoriesReducer,
        questions: quizQuestionsReducer,
        error,
        isPending
    })

}



const ById = (state={}, action) => {
    switch(action.type){
        case quizTypes.FETCH_QUIZ_START:
        case quizTypes.CREATE_QUIZ_SUCCESS:
        case quizTypes.FETCH_QUIZ_SUCCESS:
            const quizReducer = createQuizReducer()
            return {
                ...state,
                [action.id]: quizReducer(state[action.id], action)
            }

        default: return state
    }
}

export default ById