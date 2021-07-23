import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'
// 아무나 진입 가능한 페이지: Landing Page
// 로그인 한 회원은 진입 못하는 페이지: Login Page, Register Page

function App() { // (option: null, false, true)
  return(
    <Router>
      <Switch>
        <Route exact path = "/" component = {Auth(LandingPage, null)} />
        <Route path = "/login" component = {Auth(LoginPage, false)} />
        <Route path = "/register" component = {Auth(RegisterPage, false)} />
      </Switch>
    </Router>
  )
}
export default App;