import React, { Component, Fragment } from "react";
import TopNav from '../nav/top-nav';
class UniUserLayout extends Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <nav className="navbar navbar-expand-lg  sticky-top">
            <div className="container">
              <a href="https://akshay.com/" className="navbar-brand">
                <img className="logo" src={require('../assets/img/logo-white.svg')} alt="logo" />
              </a>
            </div>
        </nav>    
        <main>
          <div className="container">{this.props.children}</div>
        </main>
      </Fragment>
    );
  }
}

export default UniUserLayout;
