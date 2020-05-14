import React, { Component } from "react";
import * as loggedInUser from "../../helpers/auth-service";
import { Table, CardTitle, CardBody, Card, Container, ListGroup, ListGroupItem, Badge } from "reactstrap";
var DetectRTC = require('detectrtc');

export class BrowserConfig extends Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      deviceConfig: {}
    };
  }
  componentWillMount() {
    let self = this
    DetectRTC.load(function () {
      self.setState({
        deviceConfig: DetectRTC
      })
    });
    let token = loggedInUser.getToken();
    // window.location = "https://www.leverageedu.com/app?token=" + token;
  }
  render() {
    const { browser } = this.state.deviceConfig;
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>
              Browser Config
        </CardTitle>
            {(browser&&Object.keys(browser).length) ?
              <ListGroup>

                <ListGroupItem className="justify-content-between"> fullVersion <Badge pill>{browser ? browser.fullVersion : "N/A"}</Badge></ListGroupItem>
                <ListGroupItem className="justify-content-between"> isChrome <Badge pill>{browser ? "true" : "false"}</Badge></ListGroupItem>
                <ListGroupItem className="justify-content-between"> isPrivateBrowsing <Badge pill>{browser ? "true" : "false"}</Badge></ListGroupItem>
                <ListGroupItem className="justify-content-between"> name <Badge pill>{browser ? browser.name : "N/A"}</Badge></ListGroupItem>
                <ListGroupItem className="justify-content-between"> version <Badge pill>{browser ? browser.version : "N/A"}</Badge></ListGroupItem>
              </ListGroup>
              : null}
          </CardBody>
        </Card>
      </Container>);
  }
}

export default BrowserConfig;