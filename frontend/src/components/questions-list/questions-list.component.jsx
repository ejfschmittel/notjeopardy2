import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getQuestions, deleteQuestion} from "../../redux/question/question.actions"
import {QUESTION_STATE, QUESTION_REDUCER_UTIL_MAP} from "../../redux/question/question.reducer"
import {useItemHook, ITEM_ACTIONS} from "../../redux/utils/ReducerUtils"
import "./questions-list.styles.scss"

const QuestionsList = () => {
    const dispatch = useDispatch()
    const questionsById = useSelector(({questionReducer}) => questionReducer[QUESTION_STATE.QUESTIONS_BY_ID])
    const questionsIdList = useSelector(({questionReducer}) => questionReducer[QUESTION_STATE.QUESTION_ID_LIST])


    useEffect(() => {
        dispatch(getQuestions())
    }, [])

    return (
        <section className="section">
            {questionsIdList && questionsIdList.map((questionId) => {

                return <QuestionRecord key={questionId} question={questionsById[questionId]}/>
            })}
        </section>
    )
}

const QuestionRecord = ({question}) => {
    const dispatch = useDispatch()
    const {error, isPending, currentAction} = useItemHook(question, ({questionReducer}) => questionReducer, QUESTION_REDUCER_UTIL_MAP)



    const performDelte = () => {
        dispatch(deleteQuestion(question.id))
    }

    return (
        <div className="question-item">
            <h4>{question.question}</h4>
            <div className="question-item__body">
                <div className="question-item__show-answers-btn">

                </div>
                <div className="question-item__answers-container">
                    {question.answers.map(answer => {
                        const s = answer.correct  ? {background: "green"} : null;
                        return (
                            <div key={answer.id} style={s}>
                                {answer.answer}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="question-item__footer">
                <button disabled={isPending}>Edit</button>
                <button onClick={performDelte} disabled={isPending}>
                    {currentAction === ITEM_ACTIONS.DELETE ? "deleting..." : "Delete" }
                </button>
            </div>
        </div>
    )
}

export default QuestionsList
