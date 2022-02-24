import React from "react";
// import {useNavigate} from 'react-router-dom';
// import VacancyRepository from "../repositories/vacancy";
// import url from '../repositories/url';

import { Link } from "react-router-dom";

// import VacancyOpen from "./vacancyOpen";

// let v_rep = new VacancyRepository(url);


const VacancyItem = (props) => {
    
    // const router = useNavigate()
    // router('/');
    // console.log('kjhgbnm');
    return (
        <div className='vacancy'>
            <div className='vacancy_content'>
                <h3> {props.vacancy['title']} </h3>  
                <div> {props.vacancy['description']} </div>
                
            </div>

            {/* <button className='open-btn' onClick={() => {window.location.href = `/vacancies/${props.vacancy['id']}`}}> open </button> */}
            {/* <Link to={`/vacancies/${props.vacancy['id']}`}> open </Link> */}
            {/* <Link to={{ pathname: `/vacancies/${props.vacancy['id']}`, query: { vacancy_id: `${props.vacancy['id']}` } }}> open </Link> */}
            {/* <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Открыть
            </MyButton> */} 

            <Link to={`/vacancies/${props.vacancy['id']}`} query={{ vacancy_id: `${props.vacancy['id']}` }}> open </Link>
        </div>
    );
};

export default VacancyItem;


