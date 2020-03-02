import React, {useState, useEffect, useMemo, useCallback} from 'react'

import {useDispatch, useSelector} from "react-redux"
import CategorySuggestionListInput, {useCategorySuggestionInputList} from "./category-suggestion-input-list.component"
import {createQuiz} from "../redux/quiz/quiz.actions"

import {getQuizById} from "../redux"


/*
    quiz/create/
        - empty form no prev input
        -

    quiz/:quizid/edit/ => edit

*/


const QuizEditBaseInfo = ({quizId}) => {
    console.log("quiz edit base")

    const selecor = useCallback((state) => getQuizById(state, quizId), [])

    const currentQuiz = useSelector(selecor)
    const [title, setTitle] = useState("")
    
    const dispatch = useDispatch()
    const isLoading = useSelector(({quizReducer}) => quizReducer.edit.isPending)
    const [categories, setCategories, categoryListProps] = useCategorySuggestionInputList(6)

    

    useEffect(() => {
        setTitle(currentQuiz.title)

        const cats =  new Array(6).fill().map((_, index) => 
            currentQuiz.categories[index] ? currentQuiz.categories[index] : {id: null, name: ""}
        )
        
       // console.log(cats)
        setCategories(cats)
    }, [currentQuiz])
  


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




