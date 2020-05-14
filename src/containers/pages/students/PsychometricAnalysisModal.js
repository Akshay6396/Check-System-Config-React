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
import "dropzone/dist/min/dropzone.min.css";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { submitPsychometricAnalysis, getStageHistoryData } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";

import DatePicker from "react-datepicker";

// const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// For drop image end
class PsychometricAnalysisModal extends Component {
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
      // this.getStageHistory();
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
      date_of_completion: date
    });
  };
  resetform() {
    this.setState({
      comment: "",
      embeddedDate: moment()
    });
  }

  onsubmitPsychometricAnalysis = () => {
    const newItem = {
      user_id: this.props.selectedStudent,
      comment: this.state.comment,
      date_of_completion: this.state.date_of_completion,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.selectedStudentCase,
      stage_id: 34
    };

    this.props.submitPsychometricAnalysis(newItem, this.props);
  };
  render() {

    const {
      comment,
      date_of_completion
      , documentPsycometeric
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
        <ModalHeader toggle={toggleModal}>Complete Psycometeric Analysis</ModalHeader>
        <ModalBody>
          <Fragment>
            <Row>
              <Colxx xxs="12 ">
                <Label>Date of Completion</Label>
                <div>
                  <DatePicker
                    selected={date_of_completion}
                    onChange={this.handleChangeDate}
                    placeholderText={"MM/DD/YYYY"}
                  />
                </div>
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
            </Row>
          </Fragment>
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn-shadow btn-multiple-state  ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}
            disabled={documentPsycometeric === "" && comment === ""}
            color="primary" onClick={this.onsubmitPsychometricAnalysis}>
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
const mapStateToProps = ({ casesApp }) => {
  return {
    casesApp
  };
};

export default connect(
  mapStateToProps,
  {
    submitPsychometricAnalysis,
    getStageHistoryData
  }
)(PsychometricAnalysisModal);
