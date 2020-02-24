import categoryTypes from "./category.types"
import { bindActionCreators } from "redux"

const INITIAL_STATE = {
    // handles my categories
    fetchCategoriesPending: false,
    categoriesById: {}, // object => by id }
    categoryIdList: [], // orderList

    // handles favoriting categories
    categoriesFavoritePending: [], // saves ids of pending items

    // handles creating categories
    createCategoryPending: false,
    createdCategory: null,
    createCategoryError: null,
    categoryExistedWantToFavorite: null,

    categorySuggestions: [],
}


/*
    suggestionCategories = {
        ...
    }
    own create + favorited + official 
    => 50 + 5 + 20 / 100

    check if cateogrySuggestions exists / is Pending
        fetch
    use
*/

const removeFromFavoritePending = (state, action) => {
    return state.categoriesFavoritePending.filter(id => id !== action.payload)
}

const updateFavoritedCategory = (state, action) => {
    const updatedCategoriesById = {...state.categoriesById}
    updatedCategoriesById[action.payload] = {
        ...updatedCategoriesById[action.payload],
        is_favorited: true
    }
    return updatedCategoriesById
}

const updateUnfavoritedCategory = (state, action) => {
    const updatedCategoriesById = {...state.categoriesById}
    updatedCategoriesById[action.payload] = {
        ...updatedCategoriesById[action.payload],
        is_favorited: false
    }
    return updatedCategoriesById   
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        // create category
        case categoryTypes.CREATE_CATEGORY_START:
            return {...state, createCategoryPending: true}
        case categoryTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state, 
                createCategoryPending: false, 
                createdCategory: action.payload, 
                createCategoryError: null, 
                categoryExistedWantToFavorite: null,
                categoriesById: {
                    ...state.categoriesById,
                    [action.payload.id]: action.payload
                },
                categoryIdList: [action.payload.id, ...state.categoryIdList]
            }
        case categoryTypes.CREATE_CATEGORY_ERROR: 
            return {
                ...state, 
                createCategoryPending: false, 
                createdCategory: null, 
                createCategoryError: action.payload.error, 
                categoryExistedWantToFavorite: action.payload.existed
            }

        // fetch categories
        case categoryTypes.FETCH_CATEGORIES_START:
            return {...state, fetchCategoriesPending: true}
        case categoryTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state, 
                fetchCategoriesPending: false, 
                categoriesById: action.payload.categoriesById,
                categoryIdList: action.payload.categoryIdList
            }
        case categoryTypes.FETCH_CATEGORIES_ERROR:
            return {
                ...state, 
                fetchCategoriesPending: false
            }

        // favorite & unfavorite category
        case categoryTypes.CATEGORY_FAVORITE_START:     
            return {...state, categoriesFavoritePending: [...state.categoriesFavoritePending, action.payload]}
        case categoryTypes.CATEGORY_FAVORITE_SUCCESS:
            return {...state, categoriesFavoritePending: removeFromFavoritePending(state, action), categoriesById: updateFavoritedCategory(state, action)}
        case categoryTypes.CATEGORY_UNFAVORITE_SUCCESS:
            return {...state, categoriesFavoritePending: removeFromFavoritePending(state, action), categoriesById: updateUnfavoritedCategory(state, action)}
        case categoryTypes.CATEGORY_FAVORITE_ERROR:
            return {...state, categoriesFavoritePending: removeFromFavoritePending(state, action)}

        default:
            return state
    }
}

export default authReducer