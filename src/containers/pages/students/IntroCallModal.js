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
import { addIntroLogs } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";
import CustomSelectInput from "../../../components/common/CustomSelectInput";

import DatePicker from "react-datepicker";
import Select from "react-select";
import { NotificationManager } from "../../../components/common/react-notifications";



// For drop image end
class IntroCallModal extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.state = {
      comment: "",
      kam: "",
      user_id: this.props.props.location.search.replace("?p=", ""),
      date_of_call: moment(),
      embeddedDate: moment()
    };
    this.KamChange = this.KamChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }
  KamChange(event) {
    this.setState({
      kam: event
    });
  }

  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() { }
  componentDidUpdate() {
    if (this.props.casesApp.error) {
      NotificationManager.error(
        this.props.casesApp.error,
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    if (this.props.casesApp.addIntroLogsSuccess) {
      NotificationManager.success(
        this.props.casesApp.addIntroLogsSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.casesApp.error = "";
    this.props.casesApp.addIntroLogsSuccess = "";
  }

  // End Validation


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
      date_of_call: date
    });
  };
  resetform() {
    this.setState({
      comment: "",
      embeddedDate: moment()
    });
  }

  onSubmitAddlog = () => {
    var confirmation = window.confirm("Are you sure?");
    if (confirmation == true) {
      const newItem = {
        user_id: this.props.selectedStudent,
        comment: this.state.comment,
        date_of_call: this.state.date_of_call,
        kam: this.state.kam,
        logged_in_user: loggedInUser.getProfile().user.user_id,
        case_id: this.props.selectedStudentCase,
      };

      this.props.addIntroLogs(newItem, this.props);
    }

  };
  render() {

    const {
      comment,
      date_of_call,
      kam
      // productsList,
    } = this.state;

    // const { labels, categories } = this.props.addStudent;
    const { modalOpen, toggleModal } = this.props;
    const { KAMList } = this.props.casesApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add Log</ModalHeader>
        <ModalBody>
          <Fragment>
            <Row>
              <Colxx sm={12} md={6}>
                <Label className="mb-2 mt-2">Call Done By</Label>

                <Select
                  components={{
                    Input: CustomSelectInput
                  }}
                  className="react-select"
                  classNamePrefix="react-select"
                  placeholder="Select Kam"
                  name="kam"
                  // isMulti="true"
                  value={kam}
                  onChange={this.KamChange}
                  getOptionLabel={option =>
                    `${(option.user_lname) ? option.user_fname + " " + option.user_lname : option.user_fname}`
                  }
                  getOptionValue={option => `${option.user_id}`}
                  options={KAMList}
                />
              </Colxx>
              <Colxx sm={12} md={6}>
                <Label className="mb-2 mt-2">Date of Call</Label>
                <div>
                  <DatePicker
                    selected={date_of_call}
                    onChange={this.handleChangeDate}
                    placeholderText={"MM/DD/YYYY"}
                  />
                </div>
              </Colxx>
              <Colxx xxs="12 ">
                <Label className="mb-2 mt-2">Comments</Label>
                <Input
                  type="textarea"
                  value={comment}
                  name="comment"
                  onChange={this.handleChange}
                />
              </Colxx>
            </Row>
          </Fragment>
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn-shadow btn-multiple-state  ${this.props.casesApp.loading ? "show-spinner disabled" : ""}`}
            disabled={kam === "" && comment === ""}
            color="primary" onClick={this.onSubmitAddlog}>
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
    addIntroLogs
  }
)(IntroCallModal);
