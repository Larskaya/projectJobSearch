import React from "react";
import { Link } from "react-router-dom";


const VacancyItem = (props) => {
    console.log('vacancy id from props:', props.vacancy['id']);
    return (
        <div className='vacancy'>
            <div className='vacancy_content'>
                <h3> {props.vacancy['title']} </h3>  
                <div> {props.vacancy['description']} </div>
                
            </div>
            <Link to={`/vacancies/${props.vacancy['id']}`}> open </Link>
        </div>
    );
};

export default VacancyItem;
