
import React, {useState} from 'react'
import CategorySelection, {useCategoriesSelectionComponent} from "../quiz/category-selection.component"

const QuizCreateFrom = () => {
    const [title, setTitle] = useState()
    const { categories,getSendCategories,categoryComponentProps } = useCategoriesSelectionComponent()

    console.log(categoryComponentProps)

    return (
        <div className="container">
            <div>
                <h2>Create Quiz</h2>
                <form className="form">
                    <div className="form__field">
                        <input 
                            name="title"
                            placeholder="title"
                        />
                    </div>
                    
                    <CategorySelection {...categoryComponentProps} />
                </form>
            </div>
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

