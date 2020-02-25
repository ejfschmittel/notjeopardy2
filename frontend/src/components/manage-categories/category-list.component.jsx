import React, {useEffect, useState, useMemo} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getCatgories, favoriteCategory, unfavoriteCategory} from "../../redux/category/category.actions"
import {Link} from "react-router-dom"
import "./category-list.styles.scss"


const CategoryList = () => {
    const categoryIdList = useSelector(({categoryReducer}) => categoryReducer.byList.userCategories.list)
    const categoriesById = useSelector(({categoryReducer}) => categoryReducer.byId)
    
    const dispatch = useDispatch()

    useEffect(() => {
        // fetch items
        dispatch(getCatgories())
    }, [])
    
    

    return (
        <section className="section">
            <h2>Created & Favorited Categories</h2>


            <div>
                {categoryIdList && categoryIdList.length > 0 ? 
                categoryIdList.map((categoryid) => 
                    <CategoryDisplay category={categoriesById[categoryid]}/>
                )
                : <div>No favorited categories yet</div>}
            </div>

        </section>
    )
}


const CategoryDisplay = ({category}) => {
    const dispatch = useDispatch()

    const dispatchFavoriteCategory = (categoryid) => {

        dispatch(favoriteCategory(categoryid))
    }

    const style = category.justCreated ? {background: "green"}: {};

    return (
        <div className="category-display" style={style}>
            <div className="category-diaplay__name">{category.name}</div>

            <div className="category-display__questions">
                <Link to={`quest`}>
                    {`#${category.name}-questions`}
                </Link>
            </div>

            {category.is_favorited ? 
            <button disabled={category.isPending} className="category-display__unfavorite-btn" onClick={() => dispatch(unfavoriteCategory(category.id))}>
                {category.isPending ? "...saving" : "Unfavorite"}
            </button>
            :
            <button disabled={category.isPending} className="category-display__favorite-btn" onClick={() => dispatchFavoriteCategory(category.id)}>
                {category.isPending ? "...saving" : "Favorite"}
            </button>    
            }
        </div>
    )
}

export default CategoryList