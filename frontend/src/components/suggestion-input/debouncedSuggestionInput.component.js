import React, {useEffect, useState} from 'react'
import useDebounce from "./useDebounce.hook"
import SuggestionInput from "./suggestion-input.component"

/*
    normal input props

    From SuggestionInput
        - suggestions
        - renderSuggestion: overrides render for 
        - displayKey: default display if suggestion is object
        - valueKey: return onChange if suggestion is object
        - loading ? not added yet

    - debounceDelay: sets the debounce delay
    - onLoadSuggestion: (term) gets called after debounce delay with search term
*/

const DebouncedSuggestionInput = ({debounceDelay, value, onLoadSuggestions,...otherProps}) => {
    //const [isLoading, setIsLoading] = useState(false)
    const debouncedSearchTerm = useDebounce(value, debounceDelay);

    useEffect(() => {
        const handleLoadingAsync = async (debouncedSearchTerm) => {
            console.log("handle load")
            // set loading
            await onLoadSuggestions(debouncedSearchTerm)
            // end loading
        }
       
        handleLoadingAsync(debouncedSearchTerm)
    } , [debouncedSearchTerm])


    return (
        <SuggestionInput 
            {...otherProps}
            value={value}
        />
    )
}

DebouncedSuggestionInput.defaultProps = {
    debounceDelay: 500,
    onLoadSuggestions: () => console.log("no load function defined")
}

export default DebouncedSuggestionInput