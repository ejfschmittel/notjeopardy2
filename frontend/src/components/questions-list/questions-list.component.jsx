import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getQuestions} from "../../redux/question/question.actions"
import "./questions-list.styles.scss"

const QuestionsList = () => {
    const dispatch = useDispatch()
    const questionsById = useSelector(({questionReducer}) => questionReducer.questionsById)
    const questionsIdList = useSelector(({questionReducer}) => questionReducer.questionsIdList)

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
    return (
        <div className="question-item">
            <h4>{question.question}</h4>
            <div className="question-item__body">
                <div className="question-item__show-answers-btn">

                </div>
                <div className="question-item__answers-container">
                    {question.answers.map(answer => {
                        return (
                            <div key={answer.id}>
                                {answer.answer}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="question-item__footer">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default QuestionsList
