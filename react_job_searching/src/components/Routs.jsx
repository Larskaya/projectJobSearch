import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import SignUpForm from "./signUpForm";
import SignInForm from "./signInForm";
import SignOutForm from "./signOutForm";
import VacanciesList from "./vacanciesList";

const Main = function () {
  return <h2 className='hello'> дратути </h2>;
};

const Menu = function () {
  return (
    <div className='header-menu'>
          <a href="/"> start page </a>
          <a href="/register"> sign up </a>
          <a href="/login"> sign in </a>
          <a href="/vacancies"> vacancies </a>
    </div>
  );
};

export default function Routs() {
    return (
      <>
      <Menu/>
        <Router>
          <Routes>
            
            <Route
              path="/"
              element={<Main />}
            />
            <Route
              path="/register"
              element={<SignUpForm />}
            />
            <Route
              path="/login"
              element={<SignInForm />}
            />
            <Route
              path="/logout"
              element={<SignOutForm />}
            />
            <Route
              path="/vacancies"
              element={<VacanciesList />}
            />
            
          </Routes>
        </Router>
      </>
    );
  }