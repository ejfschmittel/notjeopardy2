import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"

export const useItemHook = (item, baseStateSelctor, utilMap) => {
    const [isPending, setIsPending] = useState(false)
    const [currentAction, setCurrentAction] = useState(null)
    const [error, setError] = useState(null)

    const baseState = useSelector(baseStateSelctor)

    useEffect(() => {
        
        const pendingList = baseState[utilMap.ITEMS_PENDING_LIST]
        const isPending = pendingList.includes(item.id)
        setIsPending(isPending)

        const itemStatusObject = baseState[utilMap.ITEMS_STATUS_OBJECT]

        const itemStatus = itemStatusObject[item.id]
        if(itemStatus){
            const itemError = itemStatus.error ? itemStatus.error : null;
            setError(itemError)

            const itemAction = itemStatus.action ? itemStatus.action : null;
            const currentAction = itemAction && isPending ? itemAction : null
            setCurrentAction(currentAction)
        }else{
            setError(null)
            setCurrentAction(null)
        }


    }, [baseState, item])

    return {
        error,
        isPending,
        currentAction
    }
}

export const UTIL_NAME_DEFIINITION = {
    ITEMS_ID_OBJECT: "ITEMS_ID_OBJECT",
    ITEMS_ID_LIST: "ITEMS_ID_LIST",
    ITEMS_PENDING_LIST: "ITEMS_PENDING_LIST",
    ITEMS_STATUS_OBJECT: "ITEMS_STATUS_OBJECT"
}

const EMPTY_UTIL_NAME_MAP = {
    [UTIL_NAME_DEFIINITION.ITEMS_ID_OBJECT]: null,
    [UTIL_NAME_DEFIINITION.ITEMS_ID_LIST]: null,
    [UTIL_NAME_DEFIINITION.ITEMS_PENDING_LIST]: null,
    [UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT]: null,

}

export const ITEM_ACTIONS = {
    DELETE: "DELETE",
    UPDATE: "UPDATE",
    FAVORITE: "FAVORITE",
    UNFAVORITE: "UNFAVORITE"
}




export const createIdObjectandIdList = (itemList) => {

    const idList = itemList.reduce((list, item) => {
        if(!item.id) throw new Error("No Id found while creating id List from response")
        // maybe add temp id
        return [...list, item.id]
    }, [])

    const idObject = itemList.reduce((obj, item) => {
        if(!item.id) throw new Error("No Id found while creating id Object from response")
        return ({...obj, [item.id]:item})
    }, {})

    return {
        rawResponse: itemList,
        idObject,
        idList,
    }
}

class ReducerUtils{

    constructor(StateNameMapping){
        this.nameMap = {
            ...EMPTY_UTIL_NAME_MAP,
            ...StateNameMapping,
        }
    }

    getState = (state, nameKey, nameMap=this.nameMap) => {
        const stateKey = nameMap[nameKey]

        if(!stateKey) throw new Error("State name not defined in settings.")

        return state[stateKey]
    }

    setState = (state, nameKey, value, nameMap=this.nameMap) => {
        const stateKey = nameMap[nameKey]
        if(!stateKey) throw new Error(`State name not defined in settings.`)

        return {
            ...state, 
            [stateKey]: value
        }
    }

    removeItemById = (state, itemId, nameMap=this.nameMap) => {
        let newState = {...state}   

        // remove from id list
        newState = this.removeFromList(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_LIST, itemId, nameMap)     

        // remove from id object
        newState = this.deleteFromObject(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_OBJECT, itemId, nameMap)

        // remove from status object
        newState = this.deleteFromObject(newState, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, itemId, nameMap)

        // remove from pending list
        newState = this.removeFromList(newState, UTIL_NAME_DEFIINITION.ITEMS_PENDING_LIST, itemId, nameMap)

        return newState
    }

    startItemAction = (state, itemId, action, nameMap=this.nameMap) => {
        if(! Object.keys(ITEM_ACTIONS).map(key => ITEM_ACTIONS[key]).includes(action)) throw new Error(`${action} is not a valid item action.`)

        // prevent starting item actions on non existant items
        if(!this.itemExists(state, itemId, nameMap)) return state;

        let newState = {...state}

        // add to pending list
        newState = this.insertIntoList(newState, UTIL_NAME_DEFIINITION.ITEMS_PENDING_LIST, itemId, nameMap)

        // update status object
        const itemStatusObject = this.getObject(state, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, nameMap)
        const itemStatus = {...itemStatusObject[itemId],  action}
        newState = this.insertIntoObject(newState, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, itemId, itemStatus, nameMap)

        return newState
    }

    endItemAction = (state, itemId, error=null, nameMap=this.nameMap) => {
        let newState = {...state}

        // prevent ending item actions on non existant items
        if(!this.itemExists(state, itemId, nameMap)) return state;

        // remove from pending list
        newState = this.removeFromList(newState, UTIL_NAME_DEFIINITION.ITEMS_PENDING_LIST, itemId, nameMap)

        // set error status 
        const itemStatusObject = this.getObject(state, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, nameMap)
        const itemStatus = {...itemStatusObject[itemId],  error}
        newState = this.insertIntoObject(newState, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, itemId, itemStatus, nameMap)

        return newState
    }

    insertItems = (state, items, position=0, nameMap = this.nameMap) => {
        let newState = {...state}   

        const {idObject, idList} = createIdObjectandIdList(items)

        // merge items id list
        newState = this.mergeLists(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_LIST, idList, position, nameMap)
    
        // merge item id object
        newState = this.mergeObjects(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_OBJECT, idObject, nameMap)

        return newState
    }

    insertItemsOverride = (state, items, nameMap = this.nameMap) => {
        let newState = {...state}   

        const {idObject, idList} = createIdObjectandIdList(items)

        // write list
        newState = this.setState(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_LIST, idList, nameMap)
    
        // write idObject
        newState = this.setState(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_OBJECT, idObject, nameMap)

        // remove items from pending
        newState = this.setState(newState, UTIL_NAME_DEFIINITION.ITEMS_PENDING_LIST, [], nameMap)

        // remove items from status object
        newState = this.setState(newState, UTIL_NAME_DEFIINITION.ITEMS_STATUS_OBJECT, {}, nameMap)

        return newState
    }

    insertItem = (state, itemId, item, position=0, nameMap=this.nameMap) => {
        let newState = {...state}   

        // insert into idList
        newState = this.insertIntoList(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_LIST, itemId, position, nameMap)

        // insert into idObject
        newState = this.insertIntoObject(newState, UTIL_NAME_DEFIINITION.ITEMS_ID_OBJECT, itemId, item, nameMap)

        return newState
    }

    itemExists = (state, itemId, nameMap=this.nameMap) => {
        const itemIdList = this.getList(state, UTIL_NAME_DEFIINITION.ITEMS_ID_LIST, nameMap)
        return itemIdList.includes(itemId)
    }

    mergeObjects = (state, nameKey, object, nameMap=this.nameMap) => {
        const oldObject = this.getObject(state, nameKey, nameMap)
        const newObject = {...oldObject, ...object}
        return this.setState(state, nameKey, newObject, nameMap)
    }

    mergeLists = (state, nameKey, list, position=0, nameMap=this.nameMap) => {
        const oldList = this.getList(state, nameKey, nameMap)
        const mergedLists = [
            ...oldList.slice(0, position),
            ...list,
            ...oldList.slice(position)
        ];
        return this.setState(state, nameKey, mergedLists, nameMap)
    }

    insertIntoObject = (state, nameKey, key, value, nameMap=this.nameMap) => {
        const newObject = this.getObject(state, nameKey, nameMap)
        newObject[key] = value
        return this.setState(state, nameKey, newObject, nameMap)
    }

    insertIntoList = (state, nameKey, value, position=0, nameMap=this.nameMap) => {
        const newList = this.getList(state, nameKey, nameMap)
        newList.splice(position, 0, value);
        return this.setState(state, nameKey, newList, nameMap)
    }

    getObject = (state, nameKey, nameMap=this.nameMap) => {
        return {...this.getState(state, nameKey, nameMap)}
    }

    getList = (state, nameKey, nameMap=this.nameMap) => {
        const list = this.getState(state, nameKey, nameMap)
        if(!Array.isArray(list)) throw new Error(`${nameKey} is not a list.`)
        return [...list];
    }

    removeFromList = (state, nameKey,  value, nameMap=this.nameMap) => {
        const list = this.getList(state, nameKey, nameMap)
        const newList = list.filter(item => item !== value)
        return this.setState(state, nameKey, newList, nameMap)
    }


    deleteFromObject = (state, nameKey, objectKey, nameMap=this.nameMap) => {
        const newObject = this.getObject(state, nameKey, nameMap)
        delete newObject[objectKey]
        return this.setState(state, nameKey, newObject, nameMap)
    }


}

export default ReducerUtils