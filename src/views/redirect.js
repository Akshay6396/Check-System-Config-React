import React, { Component } from "react";
import * as loggedInUser from "../helpers/auth-service";

export class RedirectRoute extends Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }
  componentWillMount() {
    let token = loggedInUser.getToken();
    window.location = "https://www.akshay.com/app?token=" + token;
  }
  render() {
    return (<section>Redirecting...</section>);
  }
}

export default RedirectRoute;