import React from "react";
import VacancyItem from "./vacancyItem";
import VacancyRepository from "../repositories/vacancy";
import url from '../repositories/url';
let v_rep = new VacancyRepository(url);

class VacanciesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: []
        };
    }
    

    async componentDidMount() {
        const vacs = await v_rep.getVacancies();
        if (!vacs) {
            return (
                <h1 style={{textAlign: 'center'}}>
                    vacancies not found!
                </h1>
            );
        } else {
            this.setState({vacancies: vacs});
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






