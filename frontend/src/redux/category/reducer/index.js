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
            #id: catObj
        },
        byList: {
            categories: [],
            userCategories: []
        }
    }

*/


export default combineReducers({
    create,
    byId,
    byList
})

/** SELECTORS */

export const getCategoryById = (state, categoryId) => {
    return state.byId[categoryId]
}

export const getCategories = (state, categories=[]) => {
    const foundCategories = []
    categories.forEach(categoryId => {
        const category = getCategoryById(state, categoryId)
        if(category){
            foundCategories.push(category)
        }
    })

    return foundCategories
}

