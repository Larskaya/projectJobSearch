import React, { useState } from 'react';
import UserRepository from '../repositories/user';
import url from '../repositories/url';

export default function SignUpForm() {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('employer');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = (e) => {
        setLogin(e.target.value);
        setSubmitted(false);
    };

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
        if (login === '' || email === '' || password === '') {
            return (
                <h> enter fields </h>
            );
        } else {
            if (validateEmail(email) && validateLogin(login) && validatePassword(password)) {
                setSubmitted(true);
                let uRep = new UserRepository(url);
                uRep.logIn(login, email, password, type);

            } else {
                return (
                    <h> invalid data </h>
                );
            };
        };
    };

    const handleSelectType = (e) => {
        setType(e.target.value);
        setSubmitted(false);
    }

    
    // const successMessage = () => {
    //     return (
    //     <div
    //         className="success"
    //         style={{
    //             display: submitted ? '' : 'none',
    //         }}>
    //         <h3 className='success-register'> successfully registered </h3>
    //     </div>
    //     );
    // };

    
    const error409 = () => {
        return (
            <div style={{
                display: error ? '' : 'none', }}
                className='error'> 
                <h3> data already in use </h3> 
            </div>
        );
    };


    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
        return String(email)
            .toLowerCase()
            .match(re);
    };

    const validateLogin = (login) => {
        return login.length >= 8;
    };

    const validatePassword = (psw) => {
        return psw.length >= 8;
    };

    

    return (
        <div className="form">
            <div>
                <h2> registration </h2>
            </div>

            {error409()}
            {/* {successMessage()} */}

            <form>
                <label className="label"> login </label>
                <input onChange={handleLogin} className="input"
                defaultValue={login} type="text" />

                <label className="label"> email </label>
                <input onChange={handleEmail} className="input"
                defaultValue={email} type="email" />

                <label className="label"> password </label>
                <input onChange={handlePassword} className="input"
                defaultValue={password} type="password" />

                <div>
                    are you an employer or an employee? 
                    <select defaultValue={type} onChange={handleSelectType}>
                        <option value="DEFAULT">employer</option>
                        <option value="employee">employee</option>
                    </select>
                </div>

                <button onClick={handleSubmit} className="btn" type="submit">
                    sign up
                </button>
            </form>
            
        </div>
    );
};
