// import { useParams } from "react-router-dom";
import React from "react";
import VacancyRepository from "../repositories/vacancy";
import url from '../repositories/url';
let vRep = new VacancyRepository(url);
// const VacancyOpen = (props) => {
class VacancyOpen extends React.Component {
    // let { vacancy_id } = useParams();
    constructor(props) {
        super(props);
        this.state = {
            vacancy: []
        };
    }

    async componentDidMount() {
        console.log('props:', this.props)
        const vac = await vRep.getVacancy(this.props.vacancy_id);
        if (!vac) {
            return (
                <h1 style={{textAlign: 'center'}}>
                    vacancy not found!
                </h1>
            );
        } else {
            this.setState({vacancy: vac});
            console.log('vac : ', this.state)
        };
    };

    // const openVacancy = async () => {
    //     let vacancy_id = props.vacancy['id'];
    //     let vacancy = await v_rep.getVacancy(vacancy_id);

    //     console.log('vacancy:', vacancy)
    //     console.log('vacancy success:', vacancy['success'])
    //     if (vacancy['success']) {
    //         console.log('kek');
            
    //         // <VacancyOpen props={vacancy['data']}/>;
    //     }
    // }


    // console.log('vac id:', vacancy_id)
    // let [searchParams, setSearchParams] = useSearchParams();
    // console.log('search params', searchParams.getAll());

    render (){
        return  (
            <div className='vacancy'>

                <div className='vacancy_content'>
                    <div>kek  </div>
                    <h3> {this.state.vacancy['title']}</h3>
                    {/* <h3> {{props}} </h3>   */}
                    {/* // <div> {props.vacancy['description']} </div> */}
                    
                </div>
            </div>
        )
    }
};

export default VacancyOpen;