
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import CategorySelection, {useCategoriesSelectionComponent} from "../quiz/category-selection.component"
import {createQuiz} from "../../redux/quiz/quiz.actions"
/*
    TODO
    - test create quiz (title + x catgories)
    - create autofill function (backend, reduxlist) () => official only /categories/official/
    - ask autofill if not 6 categories
    - cap at 6 categories per quiz


*/

const QuizCreateFrom = () => {
    const [title, setTitle] = useState("")
    const { categories,getSendCategories,categoryComponentProps } = useCategoriesSelectionComponent()
    const dispatch = useDispatch()
    const isLoading = useSelector(({quizReducer}) => quizReducer.create.isPending)
    console.log(isLoading)
    console.log("isloading")
    const onCreateClick = (e) => {
        e.preventDefault();

        const sendData = {
            title,
            categories: getSendCategories(categories)
        }
       
        dispatch(createQuiz(sendData))    
    }

    const onTitleChange = (e) => setTitle(e.target.value) 

    return (
       
        <div className="container">
            <section className="section">
                <div>
                    <h2>Create Quiz</h2>
                    <form className="form">
                        <div className="form__field">
                            <input 
                                value={title}
                                name="title"
                                placeholder="title"
                                onChange={onTitleChange}
                            />
                        </div>
                        
                        <CategorySelection {...categoryComponentProps} />
                        <div className="form__field">
                            <button disabled={isLoading} onClick={onCreateClick}>AutoFill Categories</button>
                        </div>
                        <div className="form__field" >
                            <button onClick={onCreateClick} disabled={isLoading}>Create Quiz</button>
                        </div>
                        
                    </form>
                </div>
            </section>
        </div>
     
    )
}

export default QuizCreateFrom

/*
    title 
    + category selection
*/

/*
    => quiz edit
        delete,
        change title + categories => 

        main quiz grid
            => edit quiz overlay
            => preview
            => game overlay


    handler
    surrounding: 
        handler
        state
        form

    state,
    form

    FormShape
    FormShapeState

    ComponentForm
    cosnt {state, componentProps, helpers} = useComponentFormState(initialState)

    cosnt {state, componentProps, helpers} = useComponentFormState(initialState, name)
    cosnt {state, componentProps, helpers} = useComponentFormState(initialState, name)
    export {
        state: {...state, state}
        props: {
            questionPRops: props
        }
    }
    map nested state ??? 

    <SuggestionInput
        name=null
        value=null
        suggestions=[]
        onChange={(e, suggesiton, name) => }
    >


    // has loading
    <DebounceSuggestionInput 
        value
        suggestions
        onLoadSuggestions={(value) => }
    />
    
*/

