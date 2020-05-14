import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";

import { Colxx } from "../../../components/common/CustomBootstrap";
import { submitEssayVersion, getEssayVersions } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import EssayVersionHistory from "./EssayVersionHistory";
// import { addStudent } from "../../../redux/actions";

var ReactDOMServer = require("react-dom/server");
// const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

var dropzoneComponentConfig = {
  postUrl: "https://httpbin.org/post"
};

var dropzoneConfig = {
  acceptedFiles: ".pdf,.XLSX ,.XLS ",
  thumbnailHeight: 160,
  maxFilesize: 100,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {" "}
        <i className="glyph-icon simple-icon-trash" />{" "}
      </a>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" }
};
// For drop image end
class EssayVersionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.props.location.search.replace("?p=", ""),
      document: "",
      comment: "",
      embeddedDate: moment()
    };
  }
  componentDidMount() {
    // this.getEssay();
  }
  componentDidUpdate = prevProps => {
    if (
      this.props.modalOpen === true &&
      this.props.modalOpen !== prevProps.modalOpen
    ) {
      this.getEssay();
    }
  };
  getEssay = () => {
    let payload = {
      essay_id: this.props.schoolEssayId
    };
    this.props.getEssayVersions(payload);
  };
  resetform() {
    this.setState({
      embeddedDate: moment()
    });
  }

  onSubmit = () => {
    const newItem = {
      user_id: this.state.user_id,
      document: this.state.document,
      comment: this.state.comment,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.StudentCaseId,
      essay_id: this.props.schoolEssayId
    };
    this.setState({
      document: "",
      comment: ""
    });
    this.props.submitEssayVersion(newItem, this.props);
  };
  handleChange = e => {
    this.setState({ comment: e.target.value });
  };
  render() {
    const eventHandlersIntrospection = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        let data = JSON.parse(file.xhr.response);

        this.setState({ document: data.files.file });
      }
    };

    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Essay Version</ModalHeader>
        <ModalBody>
          {this.props.iscompletedEssay !== "Completed" && (
            <Fragment>
              <Colxx xxs="12">
                <Row>
                  <Colxx xxs="6">
                    <FormGroup className="error-l-125">
                      <Label>Document</Label>
                      <DropzoneComponent
                        eventHandlers={eventHandlersIntrospection}
                        config={dropzoneComponentConfig}
                        djsConfig={dropzoneConfig}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6">
                    <Label>Comments</Label>
                    <Input
                      type="textarea"
                      className='introspection_textarea'
                      placeholder="Additional Comments"
                      value={this.state.comment}
                      name="comment"
                      onChange={e => this.handleChange(e)}
                    />
                  </Colxx>
                </Row>
                <Button
                  className={`btn-shadow btn-multiple-state mb-2 ${
                    this.props.studentApp.loading ? "show-spinner disabled" : ""
                    }`}
                  color="primary"
                  size="xs"
                  onClick={this.onSubmit}
                  disabled={!this.state.document}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Submit</span>
                </Button>{" "}
              </Colxx>
            </Fragment>
          )}
          <Colxx md="12" lg="12" className="mb-4">
            <EssayVersionHistory />
          </Colxx>
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};

export default connect(
  mapStateToProps,
  {
    submitEssayVersion,
    getEssayVersions
  }
)(EssayVersionModal);
