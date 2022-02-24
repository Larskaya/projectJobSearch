class VacancyRepository {
    constructor(url) {
        this.url = url;
    }

    async getVacancies() {
        const response = await fetch(`${this.url}/api/vacancies`, 
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
        ); 
        const data = await response.json();
        return data
    };

    async getVacancy(vacancyId) {
        const response = await fetch(`${this.url}/api/vacancies/${vacancyId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data
    };
};

export default VacancyRepository;