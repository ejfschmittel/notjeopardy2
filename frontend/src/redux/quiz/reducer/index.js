import {combineReducers} from "redux"

import edit from "./edit"
import create from "./edit"
import byId from "./byId"


export default combineReducers({
    create,
    edit,
    byId,
})