import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import { submitApplication } from "../../../redux/actions";

import DatePicker from "react-datepicker";

var ReactDOMServer = require("react-dom/server");
// const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

var dropzoneComponentConfig = {
  postUrl: "https://httpbin.org/post"
};

var dropzoneConfig = {
  acceptedFiles: ".pdf,.XLSX ,.XLS ",
  thumbnailHeight: 160,
  maxFilesize: 2,
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
class ApplicationSubmitModal extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.state = {
      document: "",
      date_of_completion: moment(new Date()),
      user_id: this.props.props.location.search.replace("?p=", ""),

      embeddedDate: moment()
    };
  }

  componentDidMount() { }
  // End Validation
  componentDidUpdate() {
    if (this.props.studentApp.submitAppSuccess) {
      this.setState({
        document: {}
      });
      this.props.studentApp.submitAppSuccess = "";
    }
  }

  handleChangeDate = date => {
    this.setState({
      date_of_completion: date
    });
  };
  resetform() {
    this.setState({
      document: "",
      comment: "",
      date_of_completion: moment(new Date()),
      embeddedDate: moment()
    });
  }

  onSubmit = () => {
    const newItem = {
      user_id: this.state.user_id,
      document: this.state.document,
      date_of_completion: this.state.date_of_completion,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.StudentCaseId,
      school_case_id: this.props.studentCaseSchoolId
    };
    this.props.submitApplication(newItem, this.props);
  };
  render() {
    // const { messages } = this.props.intl;
    const eventHandlers = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        let data = JSON.parse(file.xhr.response);
        this.setState({ document: data.files.file });
      }
    };
    const { date_of_completion, document } = this.state;
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Application Submit</ModalHeader>
        <ModalBody>
          <Fragment>
            <Row>
              <Colxx xxs="12 ">
                <Label>Date of completion</Label>
                <div>
                  <DatePicker
                    selected={date_of_completion}
                    onChange={this.handleChangeDate}
                    placeholderText={"MM/DD/YYYY"}
                  />
                </div>
              </Colxx>
              <Colxx xxs="12">
                <Label className="mt-4">Document</Label>
                <DropzoneComponent
                  eventHandlers={eventHandlers}
                  config={dropzoneComponentConfig}
                  djsConfig={dropzoneConfig}
                />
              </Colxx>
            </Row>
          </Fragment>
        </ModalBody>
        <ModalFooter>
          <Button
            // disabled={document === ""}
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner disabled" : ""
              }`}
            color="primary"
            onClick={this.onSubmit}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Submit</span>
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};

export default connect(mapStateToProps, {
  submitApplication
})(ApplicationSubmitModal);
