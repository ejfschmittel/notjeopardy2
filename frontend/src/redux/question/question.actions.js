import {post, get, rdelete} from "../auth/auth.actions"
import questionTypes from "./question.types"


const BASE_API_URL = "http://127.0.0.1:8000/api/";


const getQuestionsStart = () => ({
    type: questionTypes.FETCH_QUESTIONS_START
})

const getQuestionsnSuccess = (questions) => ({
    type: questionTypes.FETCH_QUESTIONS_SUCCESS,
    payload: questions
})

const getQuestionsError = (error) => ({
    type: questionTypes.FETCH_QUESTIONS_ERROR,
    payload: error
})


const createIdObjectandIdList = (itemList) => {

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

export const getQuestions = () => async (dispatch) => {

    dispatch(getQuestionsStart())

    const url = `${BASE_API_URL}questions/`

    try{
        const response = await get(url)
        const questions = createIdObjectandIdList(response)
        dispatch(getQuestionsnSuccess(questions))
    }catch(error){
        dispatch(getQuestionsError(error.response))
    }
}


const createQuestionStart = () => ({
    type: questionTypes.CREATE_QUESTION_START
})

const createQuestionSuccess = (createdQuestion) => ({
    type: questionTypes.CREATE_QUESTION_SUCCESS,
    payload: createdQuestion
})

const createQuestionError = (error) => ({
    type: questionTypes.CREATE_QUESTION_ERROR,
    payload: error
})


export const createQuestion = (questionData) => async (dispatch) => {

    dispatch(createQuestionStart())

    const url = `${BASE_API_URL}questions/`

    try{
        const response = await post(url, questionData)

        dispatch(createQuestionSuccess(response))
    }catch(error){
        dispatch(createQuestionError(error.response))
    }
}
