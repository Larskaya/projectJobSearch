class UserRepository {
    constructor(url) {
        this.url = url;
    }

    async getAccess(email, password) {
        await fetch(`${this.url}/api/login`, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-type': 'application/json'
            }, 

            body: JSON.stringify({'email': email, 'password': password})
        }).then(response => response.json())
        .then(json => {
            console.log('response:', json);
            // console.log('token:', json.token);
            if (json['success']) {
                localStorage.setItem('token', json.token);
                console.log(localStorage)
                window.location.href = '/vacancies'
                return true
            } else {
                const json_error = json['error'];
                return false, json_error
            };
        })
        .catch(error => {
            console.log(error)
        });

    };


    async logIn(login, email, password, type) {
        await fetch(`${this.url}/api/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({'login': login, 'email': email, 'password': password, 'type': type})
        }).then(response => {
            if (response.ok) {
                window.location.href = '/auth';
            } else if (response.status === 409) {
                console.log('\t this is conflict!!');
                // setError(true);
            };
        }).then(data => console.log('data:', data));
    };


    async logOut(token) {
        await fetch(`${this.url}/api/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({'token': token})
        }).then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else if (response.status === 404) {
                console.log('token is not valid');
                // setError(true);
            };
        }).then(data => console.log('data:', data));
    };

};


export default UserRepository;