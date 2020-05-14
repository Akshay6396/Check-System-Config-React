import React,{Component} from 'react';

class sliderCard extends Component{
    render(){
        return(
            <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                    <div className="imgBox">
                                        <img src={require('../../assets/img/1.svg')}></img>
                                    </div>
                                    <p className="description">Guidance for student visa, financing,
                                    scholarships, student accommodation & work
                                    opportunities </p>
                            </div>
            </div>
        )
    }
}

export default sliderCard;