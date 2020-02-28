
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import CategorySelection, {useCategoriesSelectionComponent} from "../quiz/category-selection.component"
import {createQuiz} from "../../redux/quiz/quiz.actions"

/*
    https://stackoverflow.com/questions/37833307/django-rest-framework-post-update-if-existing-or-create
    currentGameQuiz: {}
        quizDetail: { // used for create / edit / or detail}

    }

    {
        id:
        title:
        categoryObject: {
            cat1: {id: "", "name"},
            cat2: {id: "", "name"}
        },
        quizQuestions: {
            cat1: [{}]
        }
    }

    quizQuestion: {
        quizQuestionID: "xyz"
        catid: "xyz"
        questionid: "xyz"
        points: 
    }

*/

/*
    TODO
    - test create quiz (title + x catgories)
    - create autofill function (backend, reduxlist) () => official only /categories/official/
    - ask autofill if not 6 categories
    - cap at 6 categories per quiz


*/

/*const useOfficialCategories = () => {
    const officalCategoriesIdList = useSelector(({quizReducer}) => quizReducer.byList.official.list)
    const allCategoriesById = useSelector(({quizReducer}) => quizReducer.byId)
    const dispatch = useDispatch()
    const [officialCategories, setOfficialCategories] = useState([])

    useEffect(() => {
        setOfficialCategories(
            officalCategoriesIdList.map(catID => allCategoriesById[catID])
        )
    }, [officalCategoriesIdList])

    const loadOfficialCategories = async () => {
        // dispatch
        await dispatch()
    }

    const autoFillCategories = async (categoryMap) => {
        if(!officalCategoriesIdList || officalCategoriesIdList.length == 0){
            await loadOfficialCategories()
        }
    }


    return {
        officialCategories,
        officalCategoriesIdList,
        loadOfficialCategories,
        autoFillCategories,
    }

    {
        title:
        categories: [{name: "", id: null}]
    }

}*/

const QuizCreateFrom = () => {
    const [title, setTitle] = useState("")
    const { categories,getSendCategories,categoryComponentProps, setCategories} = useCategoriesSelectionComponent()
    const dispatch = useDispatch()
    const isLoading = useSelector(({quizReducer}) => quizReducer.create.isPending)

  

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
                        <div className="form__field" onClick={autoFillCategories}>
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

