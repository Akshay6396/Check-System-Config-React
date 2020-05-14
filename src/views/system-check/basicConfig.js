import React, { Component } from "react";
import * as loggedInUser from "../../helpers/auth-service";
import { Table, CardTitle, CardBody, Card, Container, ListGroup, ListGroupItem, Badge } from "reactstrap";
var DetectRTC = require('detectrtc');

export class BasicConfig extends Component {
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
    const {
      displayAspectRatio,
      displayResolution,
      hasMicrophone,
      hasSpeakers,
      hasWebcam,
      isApplyConstraintsSupported,
      isAudioContextSupported,
      isCanvasSupportsStreamCapturing,
      isCreateMediaStreamSourceSupported,
      isGetUserMediaSupported,
      isMobileDevice,
      isMultiMonitorScreenCapturingSupported,
      isORTCSupported,
      isPromisesSupported,
      isRTPSenderReplaceTracksSupported,
      isRemoteStreamProcessingSupported,
      isRtpDataChannelsSupported,
      isScreenCapturingSupported,
      isSctpDataChannelsSupported,
      isSetSinkIdSupported,
      isVideoSupportsStreamCapturing,
      isWebRTCSupported,
      isWebSocketsBlocked,
      isWebSocketsSupported,
      isWebsiteHasMicrophonePermissions,
      isWebsiteHasWebcamPermissions,
      osName,
      osVersion,
      version, } = this.state.deviceConfig;
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>
              Basic Config
        </CardTitle>
            <ListGroup>
              <ListGroupItem className="justify-content-between"> displayAspectRatio <Badge pill>{displayAspectRatio && displayAspectRatio}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> displayResolution <Badge pill>{displayResolution && displayResolution}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> hasMicrophone <Badge pill>{hasMicrophone ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> hasSpeakers <Badge pill>{hasSpeakers ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> hasWebcam <Badge pill>{hasWebcam ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isApplyConstraintsSupported <Badge pill>{isApplyConstraintsSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isAudioContextSupported <Badge pill>{isAudioContextSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isCanvasSupportsStreamCapturing <Badge pill>{isCanvasSupportsStreamCapturing ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isCreateMediaStreamSourceSupported <Badge pill>{isCreateMediaStreamSourceSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isGetUserMediaSupported <Badge pill>{isGetUserMediaSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isMobileDevice <Badge pill>{isMobileDevice ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isMultiMonitorScreenCapturingSupported <Badge pill>{isMultiMonitorScreenCapturingSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isORTCSupported <Badge pill>{isORTCSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isPromisesSupported <Badge pill>{isPromisesSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isRTPSenderReplaceTracksSupported <Badge pill>{isRTPSenderReplaceTracksSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isRemoteStreamProcessingSupported <Badge pill>{isRemoteStreamProcessingSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isRtpDataChannelsSupported <Badge pill>{isRtpDataChannelsSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isScreenCapturingSupported <Badge pill>{isScreenCapturingSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isSctpDataChannelsSupported <Badge pill>{isSctpDataChannelsSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isSetSinkIdSupported <Badge pill>{isSetSinkIdSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isVideoSupportsStreamCapturing <Badge pill>{isVideoSupportsStreamCapturing ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isWebRTCSupported <Badge pill>{isWebRTCSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isWebSocketsBlocked <Badge pill>{isWebSocketsBlocked ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isWebSocketsSupported <Badge pill>{isWebSocketsSupported ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isWebsiteHasMicrophonePermissions <Badge pill>{isWebsiteHasMicrophonePermissions ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> isWebsiteHasWebcamPermissions <Badge pill>{isWebsiteHasWebcamPermissions ? 'true' : 'false'}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> osName <Badge pill>{osName && osName}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> osVersion <Badge pill>{osVersion && osVersion}</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between"> version <Badge pill>{version && version}</Badge></ListGroupItem>
            </ListGroup>

          </CardBody>
        </Card>
      </Container>);
  }
}

export default BasicConfig;