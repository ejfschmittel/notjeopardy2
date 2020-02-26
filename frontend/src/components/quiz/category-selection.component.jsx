import React, {useState} from 'react'
import {CategorySuggestionInput} from "../question-create-form/question-create-form.component"


const defaultNames = new Array(6).fill().map((_, idx) => `category_${idx+1}`)



const getEmptyState = (names) => {
    const obj = {}
    names.forEach(name => {
        obj[name] = {name: ""}
    })
    return obj;
}

export const useCategoriesSelectionComponent = (categoryNames=defaultNames, initialCategories=getEmptyState(categoryNames)) => {
    const [categories, setCategories] = useState(initialCategories)

    const onChange = (e) => {

    }

    const getSendCategories = (categories) => {
        return Object.keys(categories).map(catKey => ({...categories[catKey]}))
    }

    return {
        categories,
        getSendCategories,
        categoryComponentProps: {
            categories,
            onChange,
            categoryComponentNames: categoryNames
        }
    }
}



const CategoriesSelectionComponent = ({categories, onChange, categoryComponentNames}) => {

    const onCategoryChange = (e, suggestion, name) => {
        let value = null;

        if(!name){
            name = e.target.name
            value = e.target.value
        }else{
            value = suggestion.name
        }

        onChange(e, name, value)
    }


    return (
        <div>
            {categoryComponentNames.map(name => {
                return (
                    <div key={name} className="form__field">
                        <CategorySuggestionInput 
                            value={categories[name]}
                            onChange={onCategoryChange}
                            onSuggestionClick={(e, suggestion) => onCategoryChange(e, suggestion, name)}
                            name={name}
                            dataKey={"name"}
                            
                        />
                    </div>     
                )
            })}     
        </div>
    )
}

export default CategoriesSelectionComponent