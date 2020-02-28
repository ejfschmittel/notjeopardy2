import React, {useState} from 'react'
import {DebouncedSuggestionInput} from "./suggestion-input"
import {get} from "../redux/auth/auth.actions"

const CategorySuggestionInput = (props) => {
    const [categorySuggestions, setCategorySuggestions] = useState([])




    const onLoadSuggestions = async (suggestion) => {
        if(suggestion.name){

            const BASE_URL = "http://127.0.0.1:8000/api/"
            const url = BASE_URL + `categories/suggestions?s=${suggestion.name}`

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
            autoComplete="off"
            suggestions={categorySuggestions}
            suggestionKey="name"
            valueKey="name"
            onLoadSuggestions={onLoadSuggestions} 
            {...props}
        />
    )
}

export default CategorySuggestionInput