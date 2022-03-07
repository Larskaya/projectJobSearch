const ReviewItem = (props) => {
    return (
        <div className='reviews'> 
            <h4> {props.review.login} </h4>
            <div>
                {props.review.description}
            </div>
            <h5> {props.review.created_at}</h5>
        </div>
    )
}

export default ReviewItem;