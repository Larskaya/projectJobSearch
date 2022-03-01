import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VacancyRepository from "../repositories/vacancy";
import url from '../repositories/url';
// import ReviewsList from "./reviewsList";
import ReviewRepository from "../repositories/review";
let vacancyRep = new VacancyRepository(url);
let reviewRep = new ReviewRepository(url);

const VacancyOpen = () => {
    const [vacancy, setVacancy] = useState();
    const [reviews, setReviews] = useState();

    let { vacancy_id } = useParams();

    useEffect(() => {
        vacancyRep.getVacancy(vacancy_id)
            .then((vacData) => {
                setVacancy(vacData);
            });
    }, [])

    useEffect(() => {
        reviewRep.getReviews(vacancy_id)
            .then((reviewData) => {
                setReviews(reviewData);
            });
    }, [])

    return  (
        <div className='open_vacancy_page'>
            <div className='open_vacancy'>
                <h3> {vacancy && vacancy['title']}</h3>
                <div> {vacancy && vacancy['description']} </div>
            </div>
            <div className='vacancy_review'>
                Reviews:
                <input type="text" value="review"/>
                {/* <ReviewsList/> */}
                {reviews}
            </div>
        </div>
    );
};

export default VacancyOpen;