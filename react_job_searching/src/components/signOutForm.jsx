// import React, { useState } from 'react';
import UserRepository from '../repositories/user';
import url from '../repositories/url';

export default function SignUpForm() {
    let u_rep = new UserRepository(url);
    if (u_rep.logOut()) {
        localStorage.removeItem('token');
    };
};

