import React,{Component} from 'react';
// import Swiper from 'react-id-swiper';
import Swiper from 'react-id-swiper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/swiper.min.css';
import '../../assets/css/style.css';
import '../../assets/css/font-family.css';
import SliderCard from '../cards/sliderCard';
// import 'react-id-swiper/lib/styles/css/swiper.css';


class loginSlider extends Component{
    render(){
        const params = {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 30,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            }
        };

        return(
        <div className="col-sm-6  mobile-hide">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Swiper {...params}>
                        <div>
                        {/* <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                    <div className="imgBox">
                                        <img src={require('../../assets/img/1.svg')}></img>
                                    </div>
                                    <p className="description">Guidance for student visa, financing,
                                    scholarships, student accommodation & work
                                    opportunities </p>
                            </div>
                        </div> */}
                        <SliderCard />
                        </div>
                        <div>
                        <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                <div className="imgBox">
                                    <img src={require('../../assets/img/2.svg')}
                                        alt=""></img>
                                </div>
                                <p className="description">Personalized career path recommendations basis
                                    your profile information and
                                    interests</p>
                            </div>
                        </div>
                        </div>
                        <div>
                        <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                <div className="imgBox">
                                    <img src={require('../../assets/img/3.svg')}
                                        alt=""></img>
                                </div>
                                <p className="description">AI driven evaluation and assistance on
                                    university, country and program selection
                                </p>
                            </div>
                        </div>
                        </div>
                        <div>
                        <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                <div className="imgBox">
                                    <img src={require('../../assets/img/4.svg')}
                                        alt=""></img>
                                </div>
                                <p className="description">AI driven evaluation and assistance on
                                    university, country and program selection
                                </p>
                            </div>
                        </div>
                        </div>
                        <div>
                        <div className="row" style={{cursor: 'pointer'}}>
                            <div className="col-sm-12 text-center">
                                <div className="imgBox">
                                    <img src={require('../../assets/img/5.svg')}
                                        alt=""></img>
                                </div>
                                <p className="description">Access to career and course related Blogs,
                                    Videos, E-books, and 30000+ minutes of
                                    content</p>
                            </div>
                        </div>
                        </div>
                    </Swiper>
                </div>
            </div>
                {/* <div className="swiper-pagination"></div> */}
        </div>
    )
    }
}


export default loginSlider;