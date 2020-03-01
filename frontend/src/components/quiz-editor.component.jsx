import React, {useEffect, useMemo, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {quizStatus} from "../redux/quiz/quiz.types"
import {setQuizStatusEditBaseInfo, setQuizStatusEditQuestions, fetchQuizDetail} from "../redux/quiz/quiz.actions"

import QuizEditBaseInfo from "./quiz-edit-base.component"
import QuizEditQuestions from "./quiz-edit-questions.component"

import "../styles/components/quiz-editor-header.styles.scss"

// basically just controls which part of the quiz edit process gets shown
// also provides hud with optional information and controls


// handle loading when edit => check for url parameter



const QuizEditor = ({match}) => {
    const dispatch = useDispatch()
    const [currentQuiz, setCurrentQuiz] = useState({})
    const currentQuizStatus = useSelector(({quizReducer}) => quizReducer.edit.status)
    const currentQuizId = useSelector(({quizReducer}) => quizReducer.edit.current.id)
    const currentQuizTitle = useSelector(({quizReducer}) => quizReducer.edit.current.title)

    const quizzesById = useSelector(({quizReducer}) => quizReducer.byId)

    /*
        id & status
    */

    

   
   

    useEffect(() => {
        const cQuiz = quizzesById[match.params.quizid] ? quizzesById[match.params.quizid] : {};
        console.log(cQuiz)
        console.log("here")
        setCurrentQuiz(cQuiz)

    }, [[match.params.quizId], quizzesById])

    useEffect(() => {
       const urlQuizId = match.params.quizid;
       setCurrentQuiz()

       if(urlQuizId){
        dispatch(fetchQuizDetail(urlQuizId))
       }
       
    }, [match.params.quizId])

    const loadQuizFromUrl = () => {

    }

    return (
        <div className="quiz-editor">
            <QuizEditorHeader status={currentQuizStatus} />
            {currentQuizStatus !== quizStatus.EDIT_QUESTIONS ?
                <QuizEditBaseInfo currentQuiz={currentQuiz} />
                :
                <QuizEditQuestions currentQuiz={currentQuiz}/>
            }
        </div>
    )
}


/*
    shwho create or / edit
    move url to edit

    Create / Edit
    buttons for switching
    OPtions Button (round gear wheel) => overlay 
        - information (created, creator, plays, views)
        - delete

*/

const QuizEditorHeader = ({status, quizId, title}) => {
    const dispatch = useDispatch()

    return (
        <div className="container">
            <section className="section">
                <header className="quiz-editor-header">
                        <h1 className="quiz-editor-header__title">
                            {!quizId ?
                                "Create new quiz"
                                :
                                "Edit: " + title
                            }                
                        </h1>

                        {quizId &&
                            <div className="quiz-editor-header__switch-btn">
                                {status === quizStatus.EDIT_BASE_INFO ?
                                    <button onClick={() => dispatch(setQuizStatusEditQuestions)}>
                                        Edit Questions
                                    </button>
                                    :
                                    <button onClick={() => dispatch(setQuizStatusEditBaseInfo)}>
                                        Edit Base Info
                                    </button>
                                }
                            </div>
                        }

                        <div className="quiz-editor-header__options-wrapper">
                            
                        </div>
                            
                                   
                </header>
            </section>
        </div>      
    )
}

export default QuizEditor