import React from "react";
import VacancyItem from "./vacancyItem";


class VacanciesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: []
        };
    }

    async getVacancies() {
        const response = await fetch('/api/vacancies');  // {headres: {Authentication: `Bearer ${token}`}
        const data = await response.json();
        this.setState({ vacancies: data })
        console.log('data', this.state.vacancies);
    };

    async componentDidMount() {
        const vacs = await this.getVacancies();
        if (!vacs) {
            return (
                <h1 style={{textAlign: 'center'}}>
                    vacancies not found!
                </h1>
            );
        };
    };
        
    render() {
        let items = [];
        for (let i = 0; i < this.state.vacancies.length; i++) {
            items.push(<VacancyItem vacancy={this.state.vacancies[i]} key={i} />)
        }
    
        return (
            <div>
                {items}
            </div>
        );
    }
}
  
export default VacanciesList;






