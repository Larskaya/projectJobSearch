class VcancyRepository {
    constructor(url) {
        this.url = url;
    }

    async getVacancies() {
        const response = await fetch('http://127.0.0.1:5000/api/vacancies', 
            {'token': localStorage.getItem['token']}
        );  // {headres: {Authentication: `Bearer ${token}`}
        const data = await response.json();
        // this.setState({ vacancies: data })
        return data
    };
};

export default VcancyRepository;