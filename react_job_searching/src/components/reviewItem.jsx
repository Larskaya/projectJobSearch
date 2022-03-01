const ReviewItem = (props) => {
    const [review, setReview] = useState();
    return (
        <div className='reviews'> 
            <h4> {props.review.user_id} </h4>
            <div>
                {props.review.description}
            </div>
            <h5> {props.review.created_at}</h5>
        </div>
    )
}

export default ReviewItem;