import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";

import { Colxx } from "../../../components/common/CustomBootstrap";
import PsychometricComments from "./PsychometricComments";

import { connect } from "react-redux";
import { submitPsychometric, getStageHistoryData } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";

import DatePicker from "react-datepicker";

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
class PsychometricModal extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.state = {
      documentPsycometeric: "",
      comment: "",
      user_id: this.props.props.location.search.replace("?p=", ""),

      embeddedDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() { }

  // End Validation
  componentDidUpdate = prevProps => {
    if (this.props.modalOpen === true && this.props.modalOpen !== prevProps.modalOpen) {
      this.getStageHistory();
    }
  }

  getStageHistory = () => {
    let payload = {
      case_id: this.props.StudentCaseId,
      stage_name: "Psychometric Assessment Document"
    }
    this.props.getStageHistoryData(payload)
  }
  validateName(value) {
    let error;
    if (!value) {
      error = "Please enter your name";
    } else if (value.length < 2) {
      error = "Value must be longer than 2 characters";
    }
    return error;
  }

  handleChangeDate = date => {
    this.setState({
      date_of_assesment: date
    });
  };
  resetform() {
    this.setState({
      documentPsycometeric: "",
      comment: "",
      embeddedDate: moment()
    });
  }

  onSubmitPsychometric = () => {
    const newItem = {
      user_id: this.state.user_id,
      documentPsycometeric: this.state.documentPsycometeric,
      comment: this.state.comment,
      date_of_assesment: this.state.date_of_assesment,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.StudentCaseId,
      stage_id: 33
    };
    // console.log(newItem);

    this.props.submitPsychometric(newItem, this.props);
  };
  render() {
    // const { messages } = this.props.intl;
    const eventHandlersPsycometeric = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        let data = JSON.parse(file.xhr.response);
        this.setState({ documentPsycometeric: data.files.file });
      }
    };
    const {
      comment,
      date_of_assesment
      , documentPsycometeric
      // productsList,
    } = this.state;

    // const { labels, categories } = this.props.addStudent;
    const { modalOpen, toggleModal } = this.props;
    // const { allProducts, paymentSources
    //   , backendUsers, scoresMaster } = this.props.studentApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Psycometeric Test</ModalHeader>
        <ModalBody>
          <Fragment>
            {this.props.isComplete ?
              (<PsychometricComments />)

              :
              (<Row>
                <Colxx xxs="12 ">
                  <Label>Date of assesment</Label>
                  <div>
                    <DatePicker
                      selected={date_of_assesment}
                      onChange={this.handleChangeDate}
                      placeholderText={"MM/DD/YYYY"}
                    />
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <Label className="mt-4">Document</Label>
                  <DropzoneComponent
                    eventHandlers={eventHandlersPsycometeric}
                    config={dropzoneComponentConfig}
                    djsConfig={dropzoneConfig}
                  />
                </Colxx>
                <Colxx xxs="12 ">
                  <Label className="mt-4">Additional Notes</Label>
                  <Input
                    type="textarea"
                    // defaultValue={this.state.additional_notes}
                    value={comment}
                    name="comment"
                    onChange={this.handleChange}
                  // onBlur={this.handleBlur}
                  // onChange={event => {
                  //   this.setState({ additional_notes: event.target.value });
                  // }}
                  />
                </Colxx>
              </Row>)}
          </Fragment>
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn-shadow btn-multiple-state  ${this.props.studentApp.loading ? "show-spinner disabled" : ""}`}
            disabled={documentPsycometeric === "" && comment === ""}
            color="primary" onClick={this.onSubmitPsychometric}>
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

export default connect(
  mapStateToProps,
  {
    submitPsychometric,
    getStageHistoryData
  }
)(PsychometricModal);
