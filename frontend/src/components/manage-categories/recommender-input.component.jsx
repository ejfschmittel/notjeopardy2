import React, {useMemo} from 'react'

import "./recommender-input.styles.scss";


/*

suggestions
    - suggestions label

*/

// favorite by name or id

const RecommenderInput = ({recommendations, className, onItemClick, ...inputProps}) => {


    const inputClass = useMemo(
        () => className ? "recommender-input__input " + className : "recommender-input__input"
    , [className])

    console.log(inputProps)

    return (
        <div className="recommender-input">
            <input {...inputProps} className={inputClass} autoComplete="off" />
            <RecommenderList onItemClick={onItemClick} recommendations={recommendations}/>
        </div>
    )
}

const RecommenderList = ({recommendations, onItemClick}) => {
    if(!recommendations || recommendations.length === 0) return null;

    return (
        <div className="recommender-input__recommendation-list">
            {recommendations.map((recommendation, index) => 
                <RecommenderListItem 
                    item={recommendation}
                    onClick={onItemClick}
                    index={index}
                />    
            )}
        </div>
    )

}

// return item
// return recommendation id

const RecommenderListItem = ({onClick, item, index}) => {
  
    const onItemClick = (e) => {
        onClick(e, item, index)
    }

    return (
        <div onClick={onItemClick} className="recommender-input__recommendation-item">
            {item}
        </div>
    )
}

export default RecommenderInput