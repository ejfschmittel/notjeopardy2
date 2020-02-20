import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./components/header/header.component"

import LoginPage from "./components/login/login.component"
import SignupPage from "./components/signup/signup.component"
import ManageCategories from "./components/manage-categories/manage-categories.component"
import ManageQuestionPage from "./components/questions-manage-page/questions-manage.page"


import "./styles/main.scss";

function App() {
 

  return (
    <div>
      <Router>
        <Header />
        <Switch>
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
