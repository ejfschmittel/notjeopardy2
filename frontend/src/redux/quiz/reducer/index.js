import {combineReducers} from "redux"

import edit from "./edit"
import create from "./edit"
import byId from "./byId"


export const getQuizFrameById = (state, id) => {
    return state.byId[id]
}

export default combineReducers({
    create,
    edit,
    byId,
})