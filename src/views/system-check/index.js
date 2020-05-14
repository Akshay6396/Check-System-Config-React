import React, { Component } from "react";
import * as loggedInUser from "../../helpers/auth-service";
import { Table, CardTitle, CardBody, Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import MediaDevices from "./mediaDevices";
import BasicConfig from "./basicConfig";
import { useState } from "react";
import classnames from 'classnames';
import VideoInputDevices from "./videoInputDevices";
import AudioInputDevices from "./audioInputDevices";
import AudioOutputDevices from "./audioOutDevices";
import BrowserConfig from "./browserConfig";
import IpInfo from "./IpInfo";
var DetectRTC = require('detectrtc');

export class SystemCheck extends Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      deviceConfig: {},
      activeTab: '1'
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
    // window.location = "https://www.akshay.com/app?token=" + token;
  }
  toggle = tab => {
    const { activeTab } = this.state;

    if (activeTab !== tab) this.setState({ activeTab: tab });
  }
  render() {
    const { activeTab } = this.state;
    const { deviceConfig } = this.state;
    console.log(deviceConfig);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Basic Config
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              IP Addresses
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Browser Config
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Audio Input Devices
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Audio Input Devices
          </NavLink>
          </NavItem>
          <NavItem>

            <NavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            >
              Video Input Devices
          </NavLink>
          </NavItem>
          <NavItem>

            <NavLink
              className={classnames({ active: activeTab === '7' })}
              onClick={() => { this.toggle('7'); }}
            >
              Media Devices
          </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <BasicConfig />
          </TabPane>
          <TabPane tabId="2">
            <IpInfo />

          </TabPane>
          <TabPane tabId="3">
            <BrowserConfig />

          </TabPane>
          <TabPane tabId="4">

            <AudioInputDevices />
          </TabPane>
          <TabPane tabId="5">

            <AudioOutputDevices />
          </TabPane>
          <TabPane tabId="6">
            <VideoInputDevices />
          </TabPane>
          <TabPane tabId="7">
            <MediaDevices />

          </TabPane>
        </TabContent>

      </div>);
  }
}

export default SystemCheck;
