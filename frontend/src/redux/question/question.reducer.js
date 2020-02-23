import questionTypes from "./question.types"

import ReducerUtils, {UTIL_NAME_DEFIINITION, ITEM_ACTIONS} from "../utils/ReducerUtils"


// questions state name map
const QUESTION_STATE = {
    FETCH_QUESTION_PENDING: "FETCH_QUESTION_PENDING",
    QUESTIONS_BY_ID: "QUESTIONS_BY_ID",
    QUESTION_ID_LIST: "QUESTION_ID_LIST", 

    CREATE_QUESTION_PENDING: "CREATE_QUESTION_PENDING",
    CREATED_QUESTION: "CREATE_QUESTION_SUCCESS",
    CREATE_QUESTION_ERROR: "CREATE_QUESTION_ERROR",

    QUESTION_ITEM_PENDING: "QUESTION_ITEM_PENDING",
    QUESTION_ITEM_STATUS: "QUESTION_ITEM_STATUS"

}

// maps question state names to reducer util definitions
const {ITEMS_ID_LIST, ITEMS_ID_OBJECT, ITEMS_PENDING_LIST, ITEMS_STATUS_OBJECT} = UTIL_NAME_DEFIINITION
const {
    QUESTION_ID_LIST, 
    QUESTIONS_BY_ID, 
    QUESTION_ITEM_PENDING, 
    QUESTION_ITEM_STATUS,

    FETCH_QUESTION_PENDING,
    CREATE_QUESTION_PENDING,
    CREATED_QUESTION,
    CREATE_QUESTION_ERROR
} = QUESTION_STATE

const QuestionReducerUtil = new ReducerUtils({
    [ITEMS_ID_LIST]: QUESTION_ID_LIST,
    [ITEMS_ID_OBJECT]: QUESTIONS_BY_ID,
    [ITEMS_PENDING_LIST]: QUESTION_ITEM_PENDING,
    [ITEMS_STATUS_OBJECT]: QUESTION_ITEM_STATUS
  })


const INITIAL_STATE = {
    [QUESTION_STATE.FETCH_QUESTION_PENDING]: false,
    [QUESTION_STATE.QUESTIONS_BY_ID]: {},
    [QUESTION_STATE.QUESTION_ID_LIST]: [],

    [QUESTION_STATE.QUESTION_ITEM_PENDING]: [],
    [QUESTION_STATE.QUESTION_ITEM_STATUS]: {},

    [QUESTION_STATE.CREATE_QUESTION_PENDING]: false,
    [QUESTION_STATE.CREATED_QUESTION]: null,
    [QUESTION_STATE.CREATE_QUESTION_ERROR]: null
}


const questionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        // create new question
        case questionTypes.CREATE_QUESTION_START:
            return {
                ...state, 
                [CREATE_QUESTION_PENDING]: true, 
                [CREATE_QUESTION_ERROR]: null
            }
        case questionTypes.CREATE_QUESTION_SUCCESS:
            return {
                ...state, 
                [CREATE_QUESTION_PENDING]: false, 
                [CREATED_QUESTION]: action.payload, 
                [CREATE_QUESTION_ERROR]: null
            }
        case questionTypes.CREATE_QUESTION_ERROR:
            return {
                ...state, 
                [CREATE_QUESTION_PENDING]: false, 
                [CREATED_QUESTION]: null, 
                [CREATE_QUESTION_ERROR]: action.payload
            }

        // fetch questions
        case questionTypes.FETCH_QUESTIONS_START:
            return {
                ...state, 
                [FETCH_QUESTION_PENDING]: true
            }
        case questionTypes.FETCH_QUESTIONS_SUCCESS:
            const stateWithQuestions = QuestionReducerUtil.insertItemsOverride(state, action.payload)
            return {...stateWithQuestions}

        case questionTypes.FETCH_QUESTIONS_ERROR:
            return {...state, [FETCH_QUESTION_PENDING]: false}
        
       
        // delete question
        case questionTypes.DELETE_QUESTION_START:
            const stateWithDeleteAction = QuestionReducerUtil.startItemAction(state, action.payload, ITEM_ACTIONS.DELETE)
            return {...stateWithDeleteAction}
        case questionTypes.DELETE_QUESTION_SUCCESS:
            const stateWithDeleteActionEnd = QuestionReducerUtil.endItemAction(state, action.payload)
            const stateWithoutItem = QuestionReducerUtil.removeItemById(stateWithDeleteActionEnd, action.payload)
            return {...stateWithoutItem}
        case questionTypes.DELETE_QUESTION_ERROR:
            const stateWithActionError = QuestionReducerUtil.endItemAction(state, action.payload.id, action.payload.error)
            return {...stateWithActionError}
        default:
            return state
    
    }
}

export default questionReducer