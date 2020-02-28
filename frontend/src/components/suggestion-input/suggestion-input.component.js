import React, {useState, useEffect} from 'react'

import "./suggestion-input.styles.scss"


/*
    normal input props
    suggestions
    renderSuggestion: overrides render for 
    displayKey: default display if suggestion is object
    valueKey: return onChange if suggestion is object
    loading ? not added yet

    TODO:
    ADD down arrow support

*/



const SuggestionInput = ({suggestions, renderSuggestion, suggestionKey, valueKey, loading, onChange, name, value, getChangedObject, ...inputProps}) => {
    const valueIsObject = typeof value === 'object' 

    if(valueIsObject){
        if(!valueKey) throw new Error("If an object is supplied as value to SuggestionInput the 'valueKey' object must be set.")
    }
    

    /*const onSuggestionInputChange = (e, suggestion=null) => {
        console.log("on change")
        console.log(e)
        console.log(suggestion)
        const passValue = !suggestion ? e.target.value : !valueKey ? suggestion : suggestion[valueKey];
        onChange(e, passValue, name)
    } */
    

    const onSuggestionClick = (e, suggestion) => {
        onChange(e, suggestion, name)
    }

    const onInputChange = (e) => {
        const changedValue = valueIsObject ? getChangedObject(e.target.value, valueKey) : e.target.value; 
        onChange(e, changedValue, e.target.name)
    }
    
    const inputValue = !value ? "" : valueKey ? value[valueKey] : value; 

    return (
        <div className="suggestion-input2">
            <input value={inputValue} {...inputProps} onChange={onInputChange} name={name}/>


            <div className="suggestion-input2__default-body">
                {suggestions.map((suggestion, idx) => {
                    return (
                        <div key={suggestion.id || idx} onMouseDown={(e) => onSuggestionClick(e, suggestion)}>
                            {
                                renderSuggestion ? 
                                    renderSuggestion(suggestion)
                                :
                                (
                                    <DefaulSuggestionItem 
                                        suggestionKey={suggestionKey}
                                        suggestion={suggestion}
                           
                                    />
                                )
                            }       
                        </div>
                    )             
                })}
            </div>
        </div>
    )
}

SuggestionInput.defaultProps = {
    suggestions: [],
    renderSuggestion: null,
    getChangedObject: (value, valueKey) => ({[valueKey]: value, id: null})
}

const DefaulSuggestionItem = ({suggestion, suggestionKey}) => {

    return(
    <div className="suggestion-input2__default-item" >
        {typeof suggestion === 'object' ? suggestion[suggestionKey] : suggestion}
    </div>
)}

export default SuggestionInput