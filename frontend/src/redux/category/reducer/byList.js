import { combineReducers } from "redux"
import categoryTypes from "../category.types"

const createCategories = () => {
    const list = (state = [], action) => {
        switch(action.type){
            case categoryTypes.FETCH_USER_CATEGORIES_SUCCESS:
                return action.response.map(category => category.id);
            default:
                return state
        }    
    }
   
    const isPending = (state = true, action) => {
        switch(action.type){
            case categoryTypes.FETCH_CATEGORIES_START:
                return true;
            case categoryTypes.FETCH_CATEGORIES_ERROR:
            case categoryTypes.FETCH_CATEGORIES_SUCCESS:
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

const createUserCategories = () => {
    const list = (state = [], action) => {
        switch(action.type){
            case categoryTypes.CREATE_CATEGORY_SUCCESS:
                return [...state, action.response.id]
            case categoryTypes.FETCH_USER_CATEGORIES_SUCCESS:
                return action.response.map(category => category.id);
            default:
                return state
        }    
    }
   
    const isPending = (state = true, action) => {
        switch(action.type){
            case categoryTypes.FETCH_USER_CATEGORIES_START:
                return true;
            case categoryTypes.FETCH_USER_CATEGORIES_ERROR:
            case categoryTypes.FETCH_USER_CATEGORIES_SUCCESS:
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
    categories: createCategories(),
    userCategories: createUserCategories()
})