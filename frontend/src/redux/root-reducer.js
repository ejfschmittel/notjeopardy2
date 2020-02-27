import { combineReducers } from "redux"

import authReducer from "./auth/auth.reducer"
import categoryReducer from "./category/reducer"
import questionReducer from "./question/reducer"
import quizReducer from "./quiz/reducer"

export default combineReducers({
    authReducer, 
    categoryReducer,
    questionReducer,
    quizReducer
})