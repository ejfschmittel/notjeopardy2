import React, {useEffect, useState, useMemo} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getCatgories, favoriteCategory, unfavoriteCategory} from "../../redux/category/category.actions"
import {Link} from "react-router-dom"
import "./category-list.styles.scss"


const CategoryList = () => {
    const categoryIdList = useSelector(({categoryReducer}) => categoryReducer.categoryIdList)
    const categoriesById = useSelector(({categoryReducer}) => categoryReducer.categoriesById)
    const categoriesFavoritePending = useSelector(({categoryReducer}) => categoryReducer.categoriesFavoritePending)
    console.log(categoriesFavoritePending)

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
    const categoriesFavoritePending = useSelector(({categoryReducer}) => categoryReducer.categoriesFavoritePending)

    // memoize
    const isPending = categoriesFavoritePending.includes(category.id)


    const dispatchFavoriteCategory = (categoryid) => {

        dispatch(favoriteCategory(categoryid))
    }


    return (
        <div className="category-display">
            <div className="category-diaplay__name">{category.name}</div>

            <div className="category-display__questions">
                <Link to={`quest`}>
                    {`#${category.name}-questions`}
                </Link>
            </div>

            {category.is_favorited ? 
            <button disabled={isPending} className="category-display__unfavorite-btn" onClick={() => dispatch(unfavoriteCategory(category.id))}>
                {isPending ? "...saving" : "Unfavorite"}
            </button>
            :
            <button disabled={isPending} className="category-display__favorite-btn" onClick={() => dispatchFavoriteCategory(category.id)}>
                {isPending ? "...saving" : "Favorite"}
            </button>    
            }
        </div>
    )
}

export default CategoryList