import React from "react";
// import {useNavigate} from 'react-router-dom';



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

            {/* <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Открыть
            </MyButton> */} 
        </div>
    );
};

export default VacancyItem;


