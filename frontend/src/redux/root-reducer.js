import { combineReducers } from "redux"

import authReducer from "./auth/auth.reducer"
import categoryReducer from "./category/category.reducer"

export default combineReducers({
    authReducer, 
    categoryReducer
})