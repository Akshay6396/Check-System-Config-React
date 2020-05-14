import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import {
  getStageHistoryData,
  submitPendingSchoolFitment,
  completePendingSchoolFitment
} from "../../../redux/actions";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as  loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import FitmentComments from "./FitmentComments";
import { NotificationManager } from "../../../components/common/react-notifications";
// import { addStudent } from "../../../redux/actions";

// import DatePicker from "react-datepicker";

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
class PendingFitmentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      document: "",
      comment: "",
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

  componentDidUpdate = prevProps => {
    if (
      this.props.modalOpen === true &&
      this.props.modalOpen !== prevProps.modalOpen
    ) {
      if (this.props.selectedTypeOption.column === "Pending") {
        this.getHistory();
      }
    }
    if (this.props.casesApp.submitSchoolFitmentSuccess) {
      NotificationManager.success(
        this.props.casesApp.submitSchoolFitmentSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.setState({
        document: "",
        comment: ""
      })
      this.props.casesApp.submitSchoolFitmentSuccess = "";
    }
  };
  getHistory = () => {
    let payload = {
      case_id: this.props.selectedStudentCase,
      stage_name: "School Shortlisting Document"
    };
    this.props.getStageHistoryData(payload);
  };
  validateName(value) {
    let error;
    if (!value) {
      error = "Please enter your name";
    } else if (value.length < 2) {
      error = "Value must be longer than 2 characters";
    }
    return error;
  }

  validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true }
      };

      this.setState({
        errors: { ...this.state.errors, ...errors }
      });
      return;
    }

    if (name === "email") {
      this.validateEmail(value);
    }
  }
  hasError(field) {
    return (
      (this.state.errors.required[field] || !this.state.errors.valid[field]) &&
      this.state.touched[field]
    );
  }
  displayError(field, value) {
    const { required, valid } = this.state.errors;
    const errorMessage = `${value} is `;

    if (required[field]) {
      return `${errorMessage} required`;
    }

    if (!valid[field]) {
      return `${errorMessage} not valid`;
    }
  }
  resetform() {
    this.setState({
      documentPsycometeric: "",
      comment: "",
      embeddedDate: moment()
    });
  }

  onSubmit = () => {
    const newItem = {
      user_id: this.props.selectedStudent,
      document: this.state.document,
      comment: this.state.comment,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.selectedStudentCase,
      stage_id: 36,
      selected_type_option: this.props.selectedTypeOption,
      selectedPageSize: this.props.selectedPageSize,
      currentPage: this.props.currentPage,
      search: this.props.search,
    };

    this.props.submitPendingSchoolFitment(newItem, this.props);
  };
  onComplete = () => {
    const newItem = {
      user_id: this.props.selectedStudent,
      completion_date: new Date(),
      logged_in_user: loggedInUser.getProfile().user.user_id,
      stage_id: 36,
      case_id: this.props.selectedStudentCase,
      selected_type_option: this.props.selectedTypeOption,
      selectedPageSize: this.props.selectedPageSize,
      currentPage: this.props.currentPage,
      search: this.props.search,
    };
    this.props.completePendingSchoolFitment(newItem, this.props);
  };
  render() {
    const eventHandlers = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        let data = JSON.parse(file.xhr.response);

        this.setState({ document: data.files.file });
      }
    };
    const {
      comment,
      document
      // productsList,
    } = this.state;

    // const { labels, categories } = this.props.addStudent;
    const { modalOpen, toggleModal } = this.props;
    // const { allProducts, paymentSources
    //   , backendUsers, scoresMaster } = this.props.casesApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>School Fitment</ModalHeader>
        <ModalBody>
          <Fragment>
            <Colxx xxs="12">
              <Row>
                <Colxx xxs="6">
                  <FormGroup className="error-l-125">School Fitment
                    <Label>Document</Label>
                    <DropzoneComponent
                      eventHandlers={eventHandlers}
                      config={dropzoneComponentConfig}
                      djsConfig={dropzoneConfig}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6 ">
                  <Label>Comments</Label>
                  <Input
                    type="textarea"
                    className="introspection_textarea"
                    value={comment}
                    name="comment"
                    onChange={this.handleChange}
                  />
                </Colxx>
              </Row>
              <Button
                size="sm"
                color="primary"
                className={`btn-shadow btn-multiple-state mb-4 ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}
                disabled={document === "" || comment === ""} onClick={this.onSubmit}>
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Submit</span>
              </Button>{" "}
            </Colxx>
          </Fragment>
          {this.props.selectedTypeOption.column === "Pending" &&

            (<Colxx md="12" lg="12" className="mb-4">
              <FitmentComments />
            </Colxx>)
          }
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn-shadow btn-multiple-state  ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}

            color="primary" onClick={this.onComplete}>
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Complete</span>

          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ casesApp }) => {
  return {
    casesApp
  };
};

export default connect(
  mapStateToProps,
  {
    completePendingSchoolFitment,
    submitPendingSchoolFitment,
    getStageHistoryData
  }
)(PendingFitmentModal);
