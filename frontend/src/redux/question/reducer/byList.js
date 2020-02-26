import { combineReducers } from "redux"
import questionTypes from "../question.types"



const createQuestionList = () => {
    const list = (state = [], action) => {
        switch(action.type){
            case questionTypes.CREATE_QUESTION_SUCCESS:
                return [...state, action.response.id]
            case questionTypes.FETCH_QUESTIONS_SUCCESS:
                return action.response.map(category => category.id);

            case questionTypes.DELETE_QUESTION_SUCCESS: 
                return state.filter(questionid => action.id !== questionid)
            default:
                return state
        }    
    }
   
    const isPending = (state = true, action) => {
        switch(action.type){
            case questionTypes.FETCH_QUESTIONS_START:
                return true;
            case questionTypes.FETCH_QUESTIONS_SUCCESS:
            case questionTypes.FETCH_QUESTIONS_ERROR:
                return false;
            default:
                return state
        }    
    }

    return combineReducers({
        list,
        isPending
    })
}

export default combineReducers({
    questions: createQuestionList(),
    //userCategories: createUserCategories()
})