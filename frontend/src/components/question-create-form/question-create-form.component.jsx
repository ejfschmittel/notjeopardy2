import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {createQuestion, getQuestions} from "../../redux/question/question.actions"
import "./question-create-form.style.scss"


/*

    QuestionCreateForm 

*/


const emptyQuestionFormState = {
    question: "",
    answers: [
        {answer: "", correct: true},
        {answer: "", correct: false},
        {answer: "", correct: false},
        {answer: "", correct: false},
    ]
}



const useQuestionForm = (data = emptyQuestionFormState) => {
    const [formData, setFormData] = useState(data)

    const onQuestionChange = (e) => {
        setFormData({...formData, question:e.target.value})
    }

    const onAnswerChange = (index, newAnswer) => {
        const {answers} = formData

        let checkedAnswerNowEmpty = !newAnswer.answer && newAnswer.correct
        if(checkedAnswerNowEmpty){
            newAnswer = {...newAnswer, correct: false}
        }

        const newAnswers = answers.map((answer, idx) => {

            if(idx !== index && checkedAnswerNowEmpty && answer.answer){
                checkedAnswerNowEmpty = false
                return {...answer, correct: true}           
            }else if(idx !== index && newAnswer.correct){
                return {...answer, correct: false}
            }else if(idx === index){
                return newAnswer
            }else{
                return answer
            }
        })

        if(checkedAnswerNowEmpty){
            newAnswers[0] = {...newAnswers[0], correct: true}
        }

        setFormData({...formData, answers: newAnswers})
    }

 
    return {
        formData,
        QuestionFormFields: QuestionFormFields,
        questionFormProps: {
            onAnswerChange,
            onQuestionChange,
            data: formData
        }
    }
}


const flattenDjangoErrorObject = (errors) => {
    return Object.keys(errors).reduce((res, key) => 
            [...res, errors[key].map(error => `${key}: ${error}`)]
        ,[])
}

const useReduxError = (selector) => {
    const rawError = useSelector(selector)
    const [errorMessageList, setErrorMessageList] = useState(null) 
    const [firstError, setFirstError] = useState(null)


    useEffect(() => {
        if(rawError){
            const errorList = flattenDjangoErrorObject(rawError)
            setErrorMessageList(errorList)
            setFirstError(errorList[0])
        }else{
            setErrorMessageList(null)
            setFirstError(null)
        } 
    }, [rawError])


    return {
        errorMessageList,
        rawError,
        firstError
    }
}

const QuestionCreateForm = () => {
    const {formData, QuestionFormFields, questionFormProps} = useQuestionForm()
    const { firstError: createErrorMessage  } = useReduxError(({questionReducer}) => questionReducer.createQuestionError)
    const questions = useSelector(({questionReducer}) => questionReducer.questionsById)
    const dispatch = useDispatch();
    console.log(questions)

   useEffect(() => {
       dispatch(getQuestions())
   }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        
        // remove empty questions before sending
        let sendData = {
            ...formData,
            answers: formData.answers.reduce((res, answer) => 
                answer.answer ? [...res, answer] : res
            ,[])
        }

        dispatch(createQuestion(sendData))
    }

    return (
        <section className="section section--border-bottom">
            <form className="form">
                <h3 className="form__headline">Create new question</h3>

                {createErrorMessage && <div style={{color: "red"}}>{createErrorMessage}</div>}
                <QuestionFormFields {...questionFormProps} />
                  
                <div className="form__field">
                    <button onClick={onSubmit}>Create Category</button>
                </div>              
            </form>
        </section>
    )
}


const QuestionFormFields = ({onQuestionChange, onAnswerChange, data}) => {
    console.log(data)
    // => 
    return (
        <React.Fragment>
            <div className="form__field form__field--big">
                <input name="name" placeholder="question..." value={data.question} onChange={onQuestionChange}/>
            </div>

            <div className="form__field">
                <AnswerInput answers={data.answers} index={0} onAnswerChange={onAnswerChange}/>
            </div>

            <HideShowSlider>
                <div className="form__field">
                    <AnswerInput answers={data.answers} index={1} onAnswerChange={onAnswerChange}/>
                </div>

                <div className="form__field">
                    <AnswerInput answers={data.answers} index={2} onAnswerChange={onAnswerChange}/>
                </div>

                <div className="form__field">
                    <AnswerInput answers={data.answers} index={3} onAnswerChange={onAnswerChange}/>
                </div>
            </HideShowSlider>
        </React.Fragment>
    )
}


/* value, onChange =>  */


const HideShowSlider = ({children, show=false}) => {
    const [showBody, setShowBody] = useState(show)

    const bodyStyle = "slider__body" + (showBody ? "" : " slider__body--hide")

    const toggleShow = (e) => {
        e.preventDefault();
        setShowBody(!showBody)
    }

    return (
        <div className="slider">
            <div className={bodyStyle}>
                {children}
            </div>
            <div className="slider-toggle">
                <button onClick={toggleShow}>{showBody ? "Hide": "Show"}</button>
            </div>
        </div>
    )
}

const AnswerInput = ({index, answers, onAnswerChange}) => {

    const value = answers[index]

    const onSelectQuestion = (e) => {
        
 
        if(!value.answer || value.answer === "") return;
        if(value.correct) return;
  
        const newAnswer = {
            ...value,
            correct: true
        }
        console.log("???")
        onAnswerChange(index, newAnswer)
    }

    const onAnswerTextChange = (e) => {

        const newAnswer = {
            ...value,
            answer: e.target.value
        }
        console.log(newAnswer)
        onAnswerChange(index, newAnswer)
    }

    return (
        <div className={`form__field form__field--inline answer-input ${value.answer ? "" : "answer-input--empty"}`}>
            <input name="answer_1" placeholder="answer..." value={value.answer} onChange={onAnswerTextChange}/>
            
            <label className="answer-input__radio-label">
                <input className="answer-input__radio-btn" type="radio" name="right_answer" checked={value.correct} onClick={onSelectQuestion}/>
                <div className="answer-input__radio-btn-display" />
            </label>
        </div>
    )
}

export default QuestionCreateForm