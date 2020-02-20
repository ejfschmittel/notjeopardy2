import { combineReducers } from "redux"

import authReducer from "./auth/auth.reducer"
import categoryReducer from "./category/category.reducer"
import questionReducer from "./question/question.reducer"

export default combineReducers({
    authReducer, 
    categoryReducer,
    questionReducer
})