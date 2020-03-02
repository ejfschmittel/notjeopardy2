import React from 'react'


const FormError = ({errors, displayKey}) => {
    if(!errors) return null;

    const createErrorMessage = (errorKey, errors) => {
        const message = errors[errorKey]
        return `${errorKey}: ${message}`
    }

    const errorKey = displayKey ? displayKey : Object.keys(errors)[0]
    const displayError = createErrorMessage(errorKey, errors)

    return (
    <div className="form__error">
        {displayError}
    </div>
    )
}

export default FormError