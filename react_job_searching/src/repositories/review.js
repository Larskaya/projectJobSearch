class ReviewRepository {
    constructor(url) {
        this.url = url;
    }

    async getReviews(vacancyId) {
        const data = fetch(`${this.url}/api/vacancies/${vacancyId}/reviews`, 
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return data.json;
    };
};

export default ReviewRepository;