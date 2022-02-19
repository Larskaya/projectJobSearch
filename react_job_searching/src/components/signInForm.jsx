import React, { useState } from 'react';
import UserRepository from '../repositories/user'
import VcancyRepository from '../repositories/vacancy'
import url from '../repositories/url';

let u_rep = new UserRepository(url);
let v_rep = new VcancyRepository(url);

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [json_error, setJson]

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setSubmitted(false);
            setError(true);
        } else {
            
            let is_access = u_rep.getAccess(email, password);
            if (!is_access[0]) {
                error = is_access[1];
                setError(true);
            } else {
                if (localStorage.getItem('token')) {
                    setSubmitted(true);
                    v_rep.getVacancies();
                };    
            };

            // console.log('token from ls:', localStorage.getItem('token'));
           
            // setSubmitted(true);
            // setError(false);
        };
    };

    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h3> logged in  </h3>
        </div>
        );
    };

    const errorMessage = (e) => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <h3 className='enter-fields'> {e} </h3>
        </div>
        );
    };
    

    return (
        <div className="auth">
            <div>
                <h3> authorization </h3>
            </div>

            <div className="unsuccess-auth">
                {errorMessage(error)}
                
            </div>

            <div className='success-auth'>
                {successMessage()}
            </div>

            <form>
                <label className="label"> email </label>
                <input onChange={handleEmail} className="input"
                defaultValue={email} type="text" />

                <label className="label"> password </label>
                <input onChange={handlePassword} className="input"
                defaultValue={password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    sign in
                </button>
            </form>
        </div>
    );

};



