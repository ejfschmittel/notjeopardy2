import React from 'react'
import CreateCategoryForm from "./create-category-form.component"
import CategoryList from "./category-list.component"

const ManageCategories = () => {
    return (
        <div className="container">
            <CreateCategoryForm />
            <CategoryList />
        </div>
    )
}


export default ManageCategories