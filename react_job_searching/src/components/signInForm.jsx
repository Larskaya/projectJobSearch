import { useState } from 'react';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            setError(true);
        } else {
            getAccess();
            setSubmitted(true);
            setError(false);
        };
    };

    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h3> successfully logged in  </h3>
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
            <h3 className='enter-fields'> enter all the fields </h3>
        </div>
        );
    };


    const getAccess = () => {
        const access = (async () => {
            await fetch('/api/auth', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json', 
                    'Content-type': 'application/json'
                }, 
            body: JSON.stringify({'email': email, 'password': password})
            }).then(function(response) {
                if (response.ok) {
                    window.location.href = '/vacancies'
                    return true;
                } else {
                    setError(true);
                    return false;
                };
            })();
        });
        console.log('get access:', access);
    };


    return (
        <div className="form">
            <div>
                <h3> authorization </h3>
            </div>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                <label className="label"> email </label>
                <input onChange={handleEmail} className="input"
                defaultValue='qwertyuio@mail.com' type="text" />

                <label className="label"> password </label>
                <input onChange={handlePassword} className="input"
                defaultValue='12345678' type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    sign in
                </button>
            </form>
        </div>
    );

};