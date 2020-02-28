import {combineReducers} from "redux"

import edit from "./edit"

const isPending = (state = false, action) => {
    console.log(action)
    return state
}

export default combineReducers({
    edit,
    isPending
})