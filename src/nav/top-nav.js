import React, { Component } from 'react';
import {
    NavLink,
    BrowserRouter as Router,
} from 'react-router-dom';


const Topnav = props => {
    return (
        <nav className="navbar navbar-expand-lg  sticky-top">
            <div className="container"><a href="https://akshay.com/" className="navbar-brand">
                <img className="logo" src={require('../assets/img/logo-white.svg')} alt="logo" />
            </a>
                <div className="d-flex ml-auto">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#globalNavbar" aria-controls="globalNavbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                </div>
                <div className="collapse navbar-collapse" id="globalNavbar">
                    <ul className="navbar-nav mr-auto order-1">
                    </ul>
                    <ul className="navbar-nav d-none d-lg-flex ml-2 order-3">
                        <li className="nav-item"><a href="https://akshay.com/" target="_blank" className="nav-link" >Home</a></li>
                        <li className="nav-item"><a href="https://akshay.com/search" target="_blank" className="nav-link" >Discover</a></li>

                        <li className="nav-item dropdown show">
                            <a className="nav-link" data-toggle="dropdown" id="navbardrop" aria-expanded="true">
                                How We Help <img alt="" className="drop" src={require('../assets/img/icons/arrow-white-down.svg')} />
                            </a>
                            <div className="dropdown-menu show">
                                <a className="dropdown-item" href="https://akshay.com/for-school" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-school.svg')} /> For School Students
                                </a>
                                <a className="dropdown-item" href="https://akshay.com/for-college" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-college.svg')} /> For University Students
                                </a>
                                <a className="dropdown-item" href="https://akshay.com/for-professionals" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-professional.svg')} /> For Working Professionals
                                </a>
                            </div>
                        </li>

                        <li className="nav-item"><a href="https://akshay.com/blog/" target="_blank" className="nav-link" >Blog</a></li>
                        <NavLink to="/user/login" activeClassName="active">
                            <li className="nav-item"><span className="nav-link" >Log In</span></li>
                        </NavLink>
                        {/* <NavLink to="/user/register" exact={true} activeClassName="active">
                            <li className="nav-item"><span className="nav-link" >Sign Up</span></li>
                        </NavLink> */}
                    </ul>
                    <ul className="navbar-nav d-lg-none">
                        <li className="nav-item-divider"></li>
                        <li className="nav-item"><a href="https://akshay.com/" target="_blank" className="nav-link" >Home</a></li>
                        <li className="nav-item"><a href="https://akshay.com/search" target="_blank" className="nav-link" >Discover</a></li>

                        <li className="nav-item dropdown show">
                            <a className="nav-link" data-toggle="dropdown" id="navbardrop" aria-expanded="true">
                                How We Help <img alt="" className="drop" src={require('../assets/img/icons/arrow-white-down.svg')} />
                            </a>
                            <div className="dropdown-menu show">
                                <a className="dropdown-item" href="https://akshay.com/for-school" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-school.svg')} /> For School Students
                                </a>
                                <a className="dropdown-item" href="https://akshay.com/for-college" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-college.svg')} /> For University Students
                                </a>
                                <a className="dropdown-item" href="https://akshay.com/for-professionals" target="_blank">
                                    <img alt="" src={require('../assets/img/icons/for-professional.svg')} /> For Working Professionals
                                </a>
                            </div>
                        </li>
                        <NavLink to="/user/login" activeClassName="active">
                            <li className="nav-item"><span className="nav-link" >Log In</span></li>
                        </NavLink>
                        <NavLink to="/user/register" style={{display:'block'}} >
                            <li className="nav-item"><span className="nav-link" >Sign Up</span></li>
                        </NavLink> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Topnav;

