import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {createQuestion, getQuestions} from "../../redux/question/question.actions"
import SuggestionInput from "../suggestion-input/suggestion-input.component"
import {get} from "../../redux/auth/auth.actions"
import "./question-create-form.style.scss"


/*

    QuestionCreateForm 

*/


const emptyQuestionFormState = {
    question: "",
    category: "",
    answers: [
        {answer: "", correct: true},
        {answer: "", correct: false},
        {answer: "", correct: false},
        {answer: "", correct: false},
    ]
}

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

const CategorySuggestionInput = ({onSuggestionClick, value, ...otherProps}) => {
    const [categorySuggestions, setCategorySuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        if(debouncedSearchTerm){
            loadSuggestions(debouncedSearchTerm)
        }else{
            setCategorySuggestions([])
        }
    } , [debouncedSearchTerm])

    const loadSuggestions = async (searchText) => {
        setIsLoading(true)
        const BASE_URL = "http://127.0.0.1:8000/api/"
        const url = BASE_URL + `categories/suggestions?s=${searchText}`

        try {
            const response = await get(url)
            setCategorySuggestions(response)
            console.log(response)
        }catch(error){

            console.log(error)
        }
        setIsLoading(false)    
    }

    return (
        <SuggestionInput 
            placeholder="categories..."
            suggestions={categorySuggestions}
            onSuggestionClick={onSuggestionClick}
            value={value}
            displayKey="name"
            {...otherProps}
        />
    )
}



const useQuestionForm = (data = emptyQuestionFormState) => {
    const [formData, setFormData] = useState(data)

    const onQuestionChange = (e) => {
        setFormData({...formData, question:e.target.value})
    }

    const onCategoryChange = (e) => {
        setFormData({...formData, category:e.target.value})
    }
    
    const onCategorySuggestionClick = (suggestion) => {
        setFormData({...formData, category: suggestion.name})
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
            onCategoryChange,
            onAnswerChange,
            onQuestionChange,
            data: formData,
            onCategorySuggestionClick
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
 
    const dispatch = useDispatch();


   useEffect(() => {
       dispatch(getQuestions())
   }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        
        const {category, ...otherFormData} = formData
        // remove empty questions before sending
        let sendData = {
            ...otherFormData,
            answers: formData.answers.reduce((res, answer) => 
                answer.answer ? [...res, answer] : res
            ,[]),
            category_name_input: category
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


const QuestionFormFields = ({onQuestionChange,onCategorySuggestionClick, onAnswerChange, onCategoryChange, data}) => {


    
    // => 
    return (
        <React.Fragment>
            <div className="form__field form__field--big">
                <input name="name" placeholder="question..." value={data.question} onChange={onQuestionChange}/>
            </div>

            <div className="form__field">
                <CategorySuggestionInput value={data.category} onChange={onCategoryChange} onSuggestionClick={onCategorySuggestionClick} />
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