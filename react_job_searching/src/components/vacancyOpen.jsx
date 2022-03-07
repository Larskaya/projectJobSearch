import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VacancyRepository from "../repositories/vacancy";
import url from '../repositories/url';
import ReviewsList from "./reviewsList";
import ReviewRepository from "../repositories/review";
let vacancyRep = new VacancyRepository(url);
let reviewRep = new ReviewRepository(url);


const VacancyOpen = () => {
    const [vacancy, setVacancy] = useState();
    const [myReview, setMyReview] = useState('');
    const [reviews, setReviews] = useState();
    const [submitted, setSubmitted] = useState(false);

    let { vacancyId } = useParams();

    useEffect(() => {
        console.log('vacancy id:', vacancyId)
        vacancyRep.getVacancy(vacancyId)
        .then((vacData) => {
            setVacancy(vacData);
        });
        reviewRep.getReviews(vacancyId)
        .then((reviewData) => {
            setReviews(reviewData);
        });
    }, [])
    
    const handleReview = (e) => {
        setMyReview(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (myReview !== '') {
            setSubmitted(true);
            reviewRep.sendReview(myReview, localStorage.getItem('token'), vacancyId);
        };
    };

    return  (
        <div className='open_vacancy_page'>
            <div className='vacancy'>
                <h3> {vacancy && vacancy['title']}</h3>
                <div> {vacancy && vacancy['description']} </div>
            </div>
            <div className='vacancy_review'>
                Reviews:
                <label className="label"> my review </label>
                <input onChange={handleReview} className="review-input"
                defaultValue={myReview} type="text" />
                <button onClick={handleSubmit} className="btn" type="submit">
                    send
                </button>
                
                {/* {reviews} */}
                <ReviewsList vacancyId={vacancyId} reviews={reviews}/>
            </div>
        </div>
    );
};

export default VacancyOpen;