import React from "react";
import ReviewItem from "./reviewItem";
import ReviewRepository from "../repositories/review";
import url from '../repositories/url';
let reviewRep = new ReviewRepository(url);

class ReviewsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
    }

    async componentDidMount() {
        const reviews = await reviewRep.getReviews(this.props.vacancyId);
        if (!reviews) {
            return (
                <h1 style={{textAlign: 'center'}}>
                    reviews not found!
                </h1>
            );
        } else {
            this.setState({reviews: reviews});
        };
    }

    render() {
        let items = [];
        for (let i = 0; i < this.state.reviews.length; i++) {
            items.push(<ReviewItem review={this.state.reviews[i]} key={i} />)
        }
    
        return (
            <div>
                {items}
            </div>
        );
    }
}

export default ReviewsList;