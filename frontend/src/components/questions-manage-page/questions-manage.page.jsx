import React from 'react'
import QuestionCreateForm from "../question-create-form/question-create-form.component"
import QuestionsList from "../questions-list/questions-list.component"

const QuestionsManagePage = () => {
    return (
        <div>
            <div className="container">
                <QuestionCreateForm />
                <QuestionsList />
            </div>
        </div>
    )
}

export default QuestionsManagePage