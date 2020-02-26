import React from 'react'

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

const SuggestionInput = ({suggestions, renderSuggestion, displayKey, valueKey, loading, onChange, name, ...inputProps}) => {

    

    const onSuggestionInputChange = (e, suggestion=null) => {
        const passValue = !suggestion ? e.target.value : !valueKey ? suggestion : suggestion[valueKey];
        onChange(e, passValue, name)
    }

    return (
        <div className="suggestion-input2">
            <input {...inputProps} onChange={onSuggestionInputChange} name={name}/>


            <div className="suggestion-input2__default-body">
                {suggestions.map((suggestion, idx) => {
                    return (
                        <div onMouseDown={(e) => onSuggestionInputChange(e, suggestion)}>
                            {
                                renderSuggestion ? 
                                    renderSuggestion(suggestion)
                                :
                                (
                                    <DefaulSuggestionItem 
                                        displayKey={displayKey}
                                        suggestion={suggestion}
                                        onClick={onSuggestionInputChange}
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
    renderSuggestion: null
}

const DefaulSuggestionItem = ({suggestion, displayKey}) => (
    <div className="suggestion-input2__default-item" >
        {typeof suggestion === 'object' ? suggestion[displayKey] : suggestion}
    </div>
)

export default SuggestionInput