import React, {useState} from 'react'
import {CategorySuggestionInput} from "../question-create-form/question-create-form.component"


const defaultNames = new Array(6).fill().map((_, idx) => `category_${idx+1}`)



const getEmptyState = (names) => {
    const obj = {}
    names.forEach(name => {
        obj[name] = ""
    })
    return obj;
}

export const useCategoriesSelectionComponent = (categoryNames=defaultNames, initialCategories=getEmptyState(categoryNames)) => {
    const [categories, setCategories] = useState(initialCategories)

    const onChange = (e, value, name) => {
        setCategories({
            ...categories,
            [name]: value
        })
    }

    const getSendCategories = (categories) => {
        return Object.keys(categories).reduce((res, catKey) => (categories[catKey] ? [...res, {name: categories[catKey]}] : res), [])
    }

    return {
        categories,
        getSendCategories,
        setCategories,
        categoryComponentProps: {
            categories,
            onChange,
            categoryComponentNames: categoryNames
        }
    }
}



const CategoriesSelectionComponent = ({categories, onChange, categoryComponentNames}) => {
    return (
        <div>
            {categoryComponentNames.map(name => {
                return (
                    <div key={name} className="form__field">
                        <CategorySuggestionInput 
                            value={categories[name]}
                            onChange={onChange}                      
                            name={name}                                
                        />
                    </div>     
                )
            })}     
        </div>
    )
}

export default CategoriesSelectionComponent