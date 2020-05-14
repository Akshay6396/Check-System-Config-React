import React, { Component, Fragment } from "react";
import TopNav from '../nav/top-nav';
class UserLayout extends Component {
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
        < TopNav />
        <main>
          <div className="container">{this.props.children}</div>
        </main>
      </Fragment>
    );
  }
}

export default UserLayout;
