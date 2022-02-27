import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VacancyRepository from "../repositories/vacancy";
import url from '../repositories/url';
let vRep = new VacancyRepository(url);


const VacancyOpen = () => {
    const [vacancy, setVacancy] = useState();
    const [review, setReview] = useState();
    let { vacancy_id } = useParams();
    useEffect(() => {
        vRep.getVacancy(vacancy_id)
            .then((vacData) => {
                // console.log('vac data:', vacData);
                setVacancy(vacData);
            });
    }, [])
        
    //     
    //     if (!vac) {
    //         return (
    //             <h1 style={{textAlign: 'center'}}>
    //                 vacancy not found!
    //             </h1>
    //         );
    //     } 

    return  (
        <div className='open_vacancy_page'>
            <div className='open_vacancy'>
                <h3> {vacancy && vacancy['title']}</h3>
                <div> {vacancy && vacancy['description']} </div>
            </div>
            <div className='vacancy_review'>
                review:
                <input type="text"/>
            </div>
        </div>
    );
};

export default VacancyOpen;