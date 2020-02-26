import { combineReducers } from "redux"

import authReducer from "./auth/auth.reducer"
import categoryReducer from "./category/reducer"
import questionReducer from "./question/reducer"

export default combineReducers({
    authReducer, 
    categoryReducer,
    questionReducer
})