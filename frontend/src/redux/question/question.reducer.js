import questionTypes from "./question.types"


const INITIAL_STATE = {
    // handles my categories
    fetchQuestionsPending: false,
    questionsById: {}, // object => by id }
    questionsIdList: [], // orderList

    // handles favoriting categories


    // handles creating categories
    createQuestionPending: false,
    createdQuestion: null,
    createQuestionError: null,
}





const questionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        case questionTypes.CREATE_QUESTION_START:
            return {...state, createQuestionPending: true, createQuestionError: null}
        case questionTypes.CREATE_QUESTION_SUCCESS:
            return {...state, createQuestionPending: false, createdQuestion: action.payload, createQuestionError: null}
        case questionTypes.CREATE_QUESTION_ERROR:
            return {...state, createQuestionPending: false, createdQuestion: null, createQuestionError: action.payload}

        case questionTypes.FETCH_QUESTIONS_START:
            return {...state, fetchQuestionsPending: true}
        case questionTypes.FETCH_QUESTIONS_SUCCESS:

            return {
                ...state, 
                fetchQuestionsPending: false,
                questionsById: action.payload.idObject,
                questionsIdList: action.payload.idList
            }
        case questionTypes.FETCH_QUESTIONS_ERROR:
            return {...state, fetchQuestionsPending: false}
        
        default:
            return state
    }
}

export default questionReducer