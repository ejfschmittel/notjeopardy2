import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./components/header/header.component"

import LoginPage from "./components/login/login.component"
import SignupPage from "./components/signup/signup.component"
import ManageCategories from "./components/manage-categories/manage-categories.component"
import ManageQuestionPage from "./components/questions-manage-page/questions-manage.page"

import QuizCreateForm from "./components/quiz/quiz-create-form.component"

import "./styles/main.scss";

/*
  <SuggestionInput>
      <div className>
        {map}
      </div>
  </SuggestionINput>

  ...normal input props
  suggestions
  renderSuggestion={(suggestion, onClick,) => {}}

*/
/*
import {SuggestionInput2} from "./components/suggestion-input/suggestion-input.component"
import DebouncedSuggestionInput from "./components/suggestion-input/debouncedSuggestionInput.component"
const suggestions2 = [
  {name: "test1", idx: 1},
  {name: "test2", idx: 2},
  {name: "test3", idx: 3},
  {name: "test4", idx: 4},
  {name: "test5", idx: 5},
  {name: "test6", idx: 6},
]


const Home = () => {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState(suggestions2)
  const [loading, setLoading] = useState(false)
  // id / some text
  const onChange = (e, suggestion) => {
      console.log("on change")
      console.log(suggestion)
      setValue(suggestion)
  }

  //const suggestions = ["test1","test2","test3","test4","test5","test6"]


  const suggestions3 = [
    {name: "test1", idx: 1},
    {name: "test2", idx: 2},
    {name: "test3", idx: 3},
    {name: "test4", idx: 4},
    {name: "test5", idx: 5},
    {name: "test6", idx: 6},
  ]

  const loadSuggestions = (term) => {
    const suggestions = suggestions2.filter(item => item.name.includes(term))

    setSuggestions(suggestions)
  } 


  return (
    <div>
      <DebouncedSuggestionInput 
        placeholder="input..."
        onChange={onChange}
        value={value}
        suggestions={suggestions}
        displayKey={"name"}
        valueKey={"name"}
        onLoadSuggestions={loadSuggestions}
      
      />
    </div>
  )
}*/

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
      
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
          <Route path="/quiz/create/" component={QuizCreateForm}/>
          <Route path="/users/:username/categories" component={ManageCategories}/>
          <Route path="/users/:username/questions" component={ManageQuestionPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
