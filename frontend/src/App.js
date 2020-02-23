import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./components/header/header.component"

import LoginPage from "./components/login/login.component"
import SignupPage from "./components/signup/signup.component"
import ManageCategories from "./components/manage-categories/manage-categories.component"
import ManageQuestionPage from "./components/questions-manage-page/questions-manage.page"


import ReducerUtils, {UTIL_NAME_DEFIINITION, ITEM_ACTIONS} from "./redux/utils/ReducerUtils"

import "./styles/main.scss";


const QUESTION_STATE = {
  FETCH_QUESTION_PENDING: "FETCH_QUESTION_PENDING",
  QUESTIONS_BY_ID: "QUESTIONS_BY_ID",
  QUESTION_ID_LIST: "QUESTION_ID_LIST", 

  CREATE_QUESTION_PENDING: "CREATE_QUESTION_PENDING",
  CREATED_QUESTION: "CREATE_QUESTION_SUCCESS",
  CREATE_QUESTION_ERROR: "CREATE_QUESTION_ERROR",

  QUESTION_ITEM_PENDING: "QUESTION_ITEM_PENDING",
  QUESTION_ITEM_STATUS: "QUESTION_ITEM_STATUS"

}

let TEST_STATE = {
  [QUESTION_STATE.QUESTIONS_BY_ID]: {},
  [QUESTION_STATE.QUESTION_ID_LIST]: [],

  [QUESTION_STATE.QUESTION_ITEM_PENDING]: [],
  [QUESTION_STATE.QUESTION_ITEM_STATUS]: {},
}


const {ITEMS_ID_LIST, ITEMS_ID_OBJECT, ITEMS_PENDING_LIST, ITEMS_STATUS_OBJECT} = UTIL_NAME_DEFIINITION
const {QUESTION_ID_LIST, QUESTIONS_BY_ID, QUESTION_ITEM_PENDING, QUESTION_ITEM_STATUS} = QUESTION_STATE

const test = new ReducerUtils({
  [ITEMS_ID_LIST]: QUESTION_ID_LIST,
  [ITEMS_ID_OBJECT]: QUESTIONS_BY_ID,
  [ITEMS_PENDING_LIST]: QUESTION_ITEM_PENDING,
  [ITEMS_STATUS_OBJECT]: QUESTION_ITEM_STATUS
})




// set items 

/*
  todo:
  - check if item exists before doing actions


*/

const items = [
  {id: "101", name: "test1"},
  {id: "102", name: "test2"},
  {id: "103", name: "test3"},
]

const items2= [
  {id: "101", name: "test1"},
  {id: "105", name: "test5"},
  {id: "106", name: "test6"},
]

/*TEST_STATE = test.insertItem(TEST_STATE, "101", {name: "test"})
console.log(TEST_STATE)
TEST_STATE = test.insertItem(TEST_STATE, "102", {name: "test2"})
console.log(TEST_STATE)
TEST_STATE = test.insertItem(TEST_STATE, "103", {name: "test3"})
console.log(TEST_STATE) */
TEST_STATE = test.insertItems(TEST_STATE, items2)
console.log(TEST_STATE) 

TEST_STATE = test.startItemAction(TEST_STATE, "103", ITEM_ACTIONS.DELETE)
console.log(TEST_STATE)
TEST_STATE = test.endItemAction(TEST_STATE, "103")
console.log(TEST_STATE)
TEST_STATE = test.removeItemById(TEST_STATE, "103")
console.log(TEST_STATE)
 




const Home = () => {
  return (
    <h1>Home</h1>
  )
}

function App() {
 

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
          <Route path="/users/:username/categories" component={ManageCategories}/>
          <Route path="/users/:username/questions" component={ManageQuestionPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
