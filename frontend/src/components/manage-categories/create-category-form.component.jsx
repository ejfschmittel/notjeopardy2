import React, {useState, useEffect, useRef} from 'react'
import RecommenderInput from "./recommender-input.component"
import {createCategory} from "../../redux/category/category.actions"
import {useSelector, useDispatch} from "react-redux"


import "./create-category-form.styles.scss";


const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current; 
}

const useRequestFinished = (pending, callback, dependencies) => {
    const prevPending = usePrevious(pending)
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback, ...dependencies]);
    

    useEffect(() => {
        if(prevPending !== undefined && prevPending === true && pending === false){
            // request has finished
            callback()
            
        }
    }, [pending])
}

const CreateCategoryForm = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch()

    const createCategoryPending = useSelector(({categoryReducer}) => categoryReducer.create.isPending) 
    const createdCategory = useSelector(({categoryReducer}) => categoryReducer.createdCategory)
    const createCategoryError = useSelector(({categoryReducer}) => categoryReducer.create.error)




    const onChange = (e) => {
        setName(e.target.value)
    }

    const onCreateCategory = (e) => {
        e.preventDefault();
        dispatch(createCategory({name}))
    }

    if(createCategoryError){
        console.log(createCategoryError.name[0])
    }



    return (
    <section className="section section--border-bottom">
        <form className="form">
            <h3 className="form__headline">Create new category</h3>
            <p className="form__subheadline">
                To create a new category its name must be unique and formed only by lower case characters, spaces and numbers.
                If a category already exists you can favorite it instead.
            </p>

            {createCategoryError && 
                <div>
                   {createCategoryError.name}
                   {createCategoryError.name[0] === "category with this name already exists." && <span>
                        You can <button>favorite it</button>  
                    </span>} 
                </div>
            }

             <div className="form__field form__field--inline">
                <input name="name" value={name} onChange={onChange}/>
                <button disabled={createCategoryPending} onClick={onCreateCategory}>Create Category</button>
             </div>
             
             
        </form>
    </section>
    )
}


export default CreateCategoryForm