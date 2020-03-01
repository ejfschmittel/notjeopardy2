import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import CategorySuggestionInputList, {useCategorySuggestionInputList} from "./category-suggestion-input-list.component"
import {createQuiz} from "../redux/quiz/quiz.actions"
import quizTypes from "../redux/quiz/quiz.types"


const FormError = ({errors, displayKey}) => {
    if(!errors) return null;

    const createErrorMessage = (errorKey, errors) => {
        const message = errors[errorKey]
        return `${errorKey}: ${message}`
    }

    const errorKey = displayKey ? displayKey : Object.keys(errors)[0]
    const displayError = createErrorMessage(errorKey, errors)

    return (
    <div className="form__error">
        {displayError}
    </div>
    )
}

const QuizCreator = ({history}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [categories, setCategories, categorySuggestionProps] = useCategorySuggestionInputList(6)

    const isPending = useSelector(({quizReducer}) => quizReducer.create.isPending)
    const errors = useSelector(({quizReducer}) => quizReducer.create.error)

    const onTitleChange = (e) => setTitle(e.target.value)



    const onCreate = (e) => {
        e.preventDefault();
        const sendData = {
            title,
            categories: categories.reduce((res, category) => category.name ? [...res, category] : res, [])
        }



        dispatch(createQuiz(sendData)).then((action) => {
         
            if(action && action.type === quizTypes.CREATE_QUIZ_SUCCESS){
                // redirect to edit
                //history.push(`/quiz/${action.response.id}/edit/`)
            }
        })
    }

    const onAutoFillCategories = (e) => {
        e.preventDefault();
        const sendData = {
            categories: categories.reduce((res, category) => category.name ? [...res, category] : res, [])
        }
    }

    return (
        <div className="container">
            <section className="section">
                <header className="header">
                    <h1>Create Quiz</h1>
                </header>
                <form className="form">
                    <FormError errors={errors}/>
                    <div className="form__field">
                        <input name="title" placeholder="title..." value={title} onChange={onTitleChange}/>
                    </div>

                    <CategorySuggestionInputList 
                        {...categorySuggestionProps}
                    />
                    
                    <div className="form__field" >
                        <button disabled={isPending}>
                            Autofill categories
                        </button>
                    </div>
                    <div className="form__field">
                        <button onClick={onCreate} disabled={isPending}>
                            Create quiz
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default QuizCreator