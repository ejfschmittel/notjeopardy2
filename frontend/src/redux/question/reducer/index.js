import { combineReducers } from "redux"

import create from "./create"
import byId from "./byId"
import byList from "./byList"

/*
    state overview

    {
        create: {
            isPending,
            error
        },
        byId: {
            #id: questionObj
        },
        byList: {
            questions: [],
            userQuestions: []
        }
    }

*/


export default combineReducers({
    create,
    byId,
    byList
})

/** SELECTORS */
