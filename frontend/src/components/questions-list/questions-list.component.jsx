import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getQuestions, deleteQuestion, favoriteQuestion, unfavoriteQuestion} from "../../redux/question/question.actions"


import "./questions-list.styles.scss"

const QuestionsList = () => {
    const dispatch = useDispatch()
    const questionsById = useSelector(({questionReducer}) => questionReducer.byId)
    const questionsIdList = useSelector(({questionReducer}) => questionReducer.byList.questions.list)


    useEffect(() => {
        dispatch(getQuestions())
    }, [])

    return (
        <section className="section">
            {questionsIdList && questionsIdList.map((questionId) => {

                return <QuestionRecord key={questionId} questionid={questionId} question={questionsById[questionId]}/>
            })}
        </section>
    )
}

const QuestionRecord = ({questionid, question}) => {
    const dispatch = useDispatch()
   
    //const question = useSelector(({questionReducer}) => questionReducer.byId)

    //const question = useSelector(({questionReducer}) => questionReducer.byId[questionid])

   
    const performDelte = () => {
        dispatch(deleteQuestion(question.id))
    }

    const performFavorite = () => {

    }



    return (
        <div className="question-item">
            <h4>{question.question}</h4>
            {question.error && <div className="error-msg">{question.error}</div>}

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
                {question.is_favorited ? 
                    <button disabled={question.isPending}  onClick={() => dispatch(unfavoriteQuestion(question.id))}>
                        {question.isFavoriting ? "...saving" : "Unfavorite"}
                    </button>
                    :
                    <button disabled={question.isPending} onClick={() => dispatch(favoriteQuestion(question.id))}>
                        {question.isFavoriting ? "...saving" : "Favorite"}
                    </button>    
                }


                {question.is_owner && (
                    <React.Fragment>
                        <button disabled={question.isPending}>Edit</button>
                        <button onClick={performDelte} disabled={question.isPending}>
                            {question.isDeleting ? "deleting..." : "Delete" }
                        </button>
                    </React.Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default QuestionsList
