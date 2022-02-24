// import Routs from "./Routs"
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
import VacancyOpen from "./vacancyOpen";


const Main = function () {
    return <h2 className='hello'> дратути </h2>;
  };
  
  const Menu = function () {
    return (
      <div className='header-menu'>
            <a href="/"> start page </a>
            <a href="/register"> sign up </a>
            <a href="/login"> sign in </a>
            <a href="/logout"> sign out </a>
      </div>
    );
  };

  const Vacancies = function () {
      return (
          <div>
            <a href="/vacancies"> vacancies </a>
          </div>
      )
  }

export default function NavigationBar() {
    return (
        <>
            <nav>
            <Menu/>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Main />}
                        />
                        <Route
                            path="/logout"
                            element={<SignOutForm />}
                        />

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
                        
                    </Routes>
                </Router>
            </nav>
            <Vacancies/>
            <Router>
                <Routes>
                    <Route 
                        path="/vacancies" element={<VacanciesList />} 
                    />

                    <Route
                        path="/vacancies/:vacancy_id" element={<VacancyOpen />}
                    /> 
                </Routes>
            </Router>
        </>
        
    );
}