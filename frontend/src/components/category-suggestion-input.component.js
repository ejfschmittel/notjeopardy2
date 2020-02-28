import React, {useState} from 'react'
import {DebouncedSuggestionInput} from "./suggestion-input"

const CategorySuggestionInput = (props) => {
    const [categorySuggestions, setCategorySuggestions] = useState([])


    const onLoadSuggestions = async (searchText) => {
        if(searchText){
            const BASE_URL = "http://127.0.0.1:8000/api/"
            const url = BASE_URL + `categories/suggestions?s=${searchText}`

            try {
                const response = await get(url)
                setCategorySuggestions(response)
                
            }catch(error){
                console.log(error)
            }
        }else{
            setCategorySuggestions([])
        }
    }


    return (
        <DebouncedSuggestionInput 
            placeholder="categories..."
            autocomplete="off"
            suggestions={categorySuggestions}
            displayKey="name"
            valueKey="name"
            onLoadSuggestions={onLoadSuggestions}
            {...props}
        />
    )
}

export default CategorySuggestionInput