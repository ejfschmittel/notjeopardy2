import {combineReducers} from "redux"
import { CategorySuggestionInput } from "../../../components/question-create-form/question-create-form.component"





const quizReducer = (state={}, action) => {

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

/**
    need selectors on root level to combine information
 */