import React, {useState} from 'react'

import {useDispatch, useSelector} from "react-redux"
import CategorySuggestionListInput, {useCategorySuggestionInputList} from "./category-suggestion-input-list.component"
import {createQuiz} from "../redux/quiz/quiz.actions"




/*
    quiz/create/
        - empty form no prev input
        -

    quiz/:quizid/edit/ => edit

*/


const QuizEditBaseInfo = () => {
   
    const [title, setTitle] = useState("")
    
    const dispatch = useDispatch()
    const isLoading = useSelector(({quizReducer}) => quizReducer.edit.isPending)
    const [categories, setCategories, categoryListProps] = useCategorySuggestionInputList(6)
  
    const editState = useSelector(({quizReducer}) => quizReducer.edit.current)
    const byId = useSelector(({categoryReducer}) => categoryReducer.byId)

    const onCreateClick = (e) => {
        e.preventDefault();

        const sendData = {
            title,
            categories: categories.reduce((res, category) => category.name ? [...res, category] : res, [])
        }

        dispatch(createQuiz(sendData))    
    }

    const onTitleChange = (e) => setTitle(e.target.value) 


    return (
        <div className="container">
            <section className="section">
                <form className="form">
                    <div className="form__field">
                        <input 
                            value={title}
                            name="title"
                            placeholder="title"
                            onChange={onTitleChange}
                        />
                    </div>
                    
                    <CategorySuggestionListInput {...categoryListProps}/>
                    <div className="form__field" >
                        <button disabled={isLoading} >AutoFill Categories</button>
                    </div>
                    <div className="form__field" >
                        <button onClick={onCreateClick} disabled={isLoading}>Create Quiz</button>
                    </div>
                    
                </form>
            </section>
        </div>
     
    )
}

export default QuizEditBaseInfo




