import {combineReducers} from "redux"

import create from "./create"

const isPending = (state = false, action) => {
    console.log(action)
    return state
}

export default combineReducers({
    create,
    isPending
})