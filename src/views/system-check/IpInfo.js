import React, { Component } from "react";
import * as loggedInUser from "../../helpers/auth-service";
import { Table, CardTitle, CardBody, Card, Container, ListGroup, ListGroupItem, Badge } from "reactstrap";
var DetectRTC = require('detectrtc');

export class IpInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      deviceConfig: {},
      IP: []
    };
  }
  componentWillMount() {
    let self = this
    DetectRTC.load(function () {
      self.setState({
        deviceConfig: DetectRTC
      })
    });
    DetectRTC.DetectLocalIPAddress(this.callBack)
    // let token = loggedInUser.getToken();
    // window.location = "https://www.leverageedu.com/app?token=" + token;
  }

  callBack = (data) => {
    let dataIps = this.state.IP;
    dataIps.push(data);
    this.setState({ IP: dataIps })

  }
  render() {
    const { IP } = this.state;
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>
              Ip Info
        </CardTitle>
            {(IP.length) ?
              <ListGroup>
                {IP.map((data, i) =>
                  <ListGroupItem key={i} className="justify-content-between"> {data}    </ListGroupItem>
                )

                }
              </ListGroup>
              : null}
          </CardBody>
        </Card>
      </Container>);
  }
}

export default IpInfo;