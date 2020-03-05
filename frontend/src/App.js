import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./components/header/header.component"

import LoginPage from "./components/login/login.component"
import SignupPage from "./components/signup/signup.component"
import ManageCategories from "./components/manage-categories/manage-categories.component"
import ManageQuestionPage from "./components/questions-manage-page/questions-manage.page"

// import QuizCreateForm from "./components/quiz/quiz-create-form.component"
import QuizEditor from "./components/quiz-editor.component"
import QuizCreate from "./components/quiz-create.component"

import ApolloClient, {gql} from "apollo-boost"

import "./styles/main.scss";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/"
})

client
  .query({
    query: gql`
      {
        allCategories{
          id,
          name
        }
      }
    `
  })
  .then(result => console.log(result));




function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
      
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
         
          <Route path="/quiz/create/" component={QuizCreate}/>
          <Route path="/quiz/edit/:quizid/" component={QuizEditor}/>
          <Route path="/quiz/edit/" component={QuizEditor} />
          <Route path="/users/:username/categories" component={ManageCategories}/>
          <Route path="/users/:username/questions" component={ManageQuestionPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
