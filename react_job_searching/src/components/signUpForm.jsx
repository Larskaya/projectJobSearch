import { useEffect, useState } from 'react';

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
                goToAuth();
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
        console.log('email', email)
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


    const goToAuth = () => {
        fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({'login': login, 'email': email, 'password': password, 'type': type})
        }).then(response => {
            console.log('response:', response)
            if (response.ok) {
                window.location.href = '/auth';
            } else if (response.status === 409) {
                console.log('\t this is conflict!!');
                setError(true);
            };
        }).then(data => console.log('data:', data));
    };


    return (
        <div className="form">
            <div>
                <h2> registration </h2>
            </div>

            {error409()}
            {successMessage()}

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
