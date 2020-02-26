import React from 'react'

import "./suggestion-input.styles.scss"


/*
    TODO.
    ADD LOADING
    TEST

*/

const SuggestionInput = ({dropDownClasses, suggestions, loading, displayKey , onSuggestionClick, ...inputProps}) => {

    const test = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("ts")
    }
   
    return (
        <div className="suggestion-input">
            <input {...inputProps}/>
            <div className={dropDownClasses}>
                {suggestions.map((suggestion, idx) => {
                    if(!suggestion) return null;

                    const displayValue = typeof suggestion === 'object' ? suggestion[displayKey] : suggestion;
                    const key = `${idx}-${displayValue}`
                    return (
                        <div key={key} className={`${dropDownClasses}-item`} onClick={test}>
                            {displayValue}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

SuggestionInput.defaultProps  = {
    dropDownClasses: "suggestion-input__dropdown",
    displayKey: null,
    suggestions: [],
    onSuggestionClick: () => null
}

export default SuggestionInput