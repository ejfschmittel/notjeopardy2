import React, {useState} from 'react'
import CategorySuggestionInput from "./category-suggestion-input.component"


const emptyCategoryDefault = {id: null, name: ""}


/*

    editQuiz: {
        title: "",
        categories: ["id", "id"]
    }
*/

const generateDuplicateList = (count, value) => {
    return new Array(count).fill().map((_, index) => value)
}


export const autofillCategories = async (categories=[]) => {
   // make post request to autofill 
   // wait for request to finish => 
}

export const useCategorySuggestionInputList = (count=0, initialState=[], emptyCategory=emptyCategoryDefault) => {
    
    const [categories, setCategories] = useState(initialState && initialState.length != 0 ? initialState : generateDuplicateList(count, emptyCategory))


    const onCategoryChange = (e, category, index) => {
        const newCategories = [...categories]
        newCategories[index] = category
        setCategories(newCategories)
    }

    const autoFillCategories = async () => {
        
    }

    return [
        categories,
        setCategories,
        {
            onChange: onCategoryChange,
            categories
        }
    ]
}


const CategorySuggestionInputList = ({categories, onChange}) => {

    // get categories from redux 
    // use to fill local state
    // change local state
    // send update to server
    // set updates to redux

   


    return(
        <React.Fragment>
            {categories.map((category, index) => {
                return (
                    <div className="form__field" key={`quiz-category-${index}`}>
                        <CategorySuggestionInput
                            value={category}
                            onChange={(e, value, name) => onChange(e, value, index)}                      
                            name={`quiz-category-${index}`}    
                        />
                    </div>
                )
            })}           
        </React.Fragment>
    )
}


CategorySuggestionInputList.defaultProps = {
    categories: [],
    onChange: () => null
}

export default CategorySuggestionInputList