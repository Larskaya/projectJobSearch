import { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from "react-router-dom";


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
            setError(true);
        } else {
            if (validateEmail(email) & validateLogin(login) & validatePassword(password)) {
                // setEmail('');
                // setLogin('');
                // setPassword('');
                setSubmitted(true);
                setError(false);
                goToAuth();
            } else {
                setError(true);
            }
        };
    };

    const handleSelectType = (e) => {
        setType(e.target.value);
        setSubmitted(false);
    }

    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h3 className='success-register'> successfully registered </h3>
        </div>
        );
    };


    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
                display: error ? '' : 'none',
            }}>
            <h3 className='unsuccess-register'> enter all the fields </h3>
        </div>
        );
    };


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateLogin = (login) => {
        return login.length >= 8;
        // return login.match(/a-zA-Z\0-9/);
    };

    const validatePassword = (psw) => {
        return psw.length >= 8;
    };


    const goToAuth = () => {

        console.log('attempt to add user');
        (async () => {
            const rawResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({'login': login, 'email': email, 'password': password, 'type': type})
            });
            const content = await rawResponse.json();
            window.location.href = '/auth';
        })();
    };


    return (
        <div className="form">
            <div>
                <h3> registration </h3>
            </div>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                <label className="label"> login </label>
                <input onChange={handleLogin} className="input"
                defaultValue='qwertyuio' type="text" />

                <label className="label"> email </label>
                <input onChange={handleEmail} className="input"
                defaultValue='qwertyuio@mail.com' type="email" />

                <label className="label"> password </label>
                <input onChange={handlePassword} className="input"
                defaultValue='12345678' type="password" />

                <div>
                    are you an employer or an employee? 
                    <select defaultValue={'DEFAULT'} onChange={handleSelectType}>
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
