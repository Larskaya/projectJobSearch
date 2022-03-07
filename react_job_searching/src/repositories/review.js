class ReviewRepository {
    constructor(url) {
        this.url = url;
    }

    async getReviews(vacancyId) {
        const response = await fetch(`${this.url}/api/vacancies/${vacancyId}/reviews`, 
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        // console.log('all reviews', data['reviews']);
        return data['reviews']
    };

    async sendReview(text, token, vacancyId) {
        await fetch(`${this.url}/api/vacancies/${vacancyId}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            
            body: JSON.stringify({'text': text, 'token': token, 'vacancyId': vacancyId})
        }).then(response => {
            if (response.ok) {
                console.log('ok')
            } else if (response.status === 409) {
                console.log('\t this is conflict!!');
            };
        }).then(data => console.log('data:', data));
    }
};

export default ReviewRepository;