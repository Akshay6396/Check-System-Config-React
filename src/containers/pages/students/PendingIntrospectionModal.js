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

import { Colxx } from "../../../components/common/CustomBootstrap";
import IntrospectionComments from "./IntrospectionComments";
import { submitPendingIntrospection, getStageHistoryData, completePendingIntrospection } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
// import { addStudent } from "../../../redux/actions";

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
class PendingIntrospectionModal extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);

    this.state = {
      // user_id: this.props.props.location.search.replace("?p=", ""),
      completion_date: moment(new Date()),
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
  componentDidMount() {
    // this.getStageHistory();
  }
  componentDidUpdate = prevProps => {
    if (this.props.modalOpen === true && this.props.modalOpen !== prevProps.modalOpen) {
      if (this.props.selectedTypeOption.column === "Pending") {
        this.getStageHistory();
      }
    }
    if (this.props.casesApp.submitSuccess) {
      this.setState({
        completion_date: moment(new Date()),
        document: "",
        comment: ""
      })
      this.props.casesApp.submitSuccess = "";
    }
  };
  handleChangeDate = date => {
    this.setState({
      completion_date: date
    });
  };

  getStageHistory = () => {
    let payload = {
      case_id: this.props.selectedStudentCase,
      stage_name: "Introspection Document"
    }
    this.props.getStageHistoryData(payload)
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
      selected_type_option: this.props.selectedTypeOption,
      selectedPageSize: this.props.selectedPageSize,
      currentPage: this.props.currentPage,
      search: this.props.search,
      stage_id: 35
    };
    // console.log(newItem);

    this.props.submitPendingIntrospection(newItem, this.props);
  };
  onComplete = () => {
    const newItem = {
      user_id: this.props.selectedStudent,
      completion_date: this.state.completion_date,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.selectedStudentCase,
      selected_type_option: this.props.selectedTypeOption,
      selectedPageSize: this.props.selectedPageSize,
      currentPage: this.props.currentPage,
      search: this.props.search,
      stage_id: 35
    };
    this.props.completePendingIntrospection(newItem, this.props);

  }
  render() {
    const eventHandlersIntrospection = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        let data = JSON.parse(file.xhr.response);
        this.setState({ document: data.files.file });
      }
    };
    const {
      comment,
      completion_date,
      document
      // productsList,
    } = this.state;
    const { modalOpen, toggleModal, isComplete } = this.props;

    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        {(!isComplete) ? <ModalHeader toggle={toggleModal}>Add Introspection</ModalHeader> : <ModalHeader toggle={toggleModal}>Introspection</ModalHeader>}
        <ModalBody>
          {!isComplete &&
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
                  <Colxx xxs="6 ">
                    <Label>Comments</Label>
                    <Input
                      type="textarea"
                      className="introspection_textarea"
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
                </Row>
                <Button color="primary"
                  size="xs"
                  className={`btn-shadow btn-multiple-state mb-4 ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}
                  disabled={document === "" || comment === ""} onClick={this.onSubmit}>
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Add Document</span>
                </Button>{" "}
              </Colxx>
            </Fragment>
          }
          {this.props.selectedTypeOption.column === "Pending" &&
            <Colxx md="12" lg="12" className="mb-4">
              <IntrospectionComments />
            </Colxx>
          }

        </ModalBody>
        {!isComplete && <ModalFooter>
          <Colxx xxs="6" className="datepicker_footer">
            <DatePicker
              selected={completion_date}
              onChange={this.handleChangeDate}
              placeholderText={"MM/DD/YYYY"}
            />
          </Colxx>
          <Button
            className={`btn-shadow btn-multiple-state  ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}
            disabled={completion_date === "" || this.props.casesApp.loading} color="primary" onClick={this.onComplete}>

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
        </ModalFooter>}
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
    submitPendingIntrospection,
    getStageHistoryData,
    completePendingIntrospection
  }
)(PendingIntrospectionModal);
