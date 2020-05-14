import React, {
  Component
  // Fragment
} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // FormGroup,
  Input,
  // Label, Row
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { alignHeadCoach } from "../../../redux/actions";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as  loggedInUser  from "../../../helpers/auth-service";

import { connect } from "react-redux";
import { NotificationManager } from "../../../components/common/react-notifications";
class HeadCoachAlignModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.props.location.search.replace("?p=", ""),
      head_coach: "",
      reason_of_change: "",
      embeddedDate: moment()
    };
    this.HeadCoachChange = this.HeadCoachChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  HeadCoachChange(event) {
    this.setState({
      head_coach: event
    });
  }

  componentDidMount() { }

  // End Validation
  componentDidUpdate() {
    if (this.props.studentApp.error) {
      NotificationManager.error(
        this.props.studentApp.error.message,
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    if (this.props.studentApp.alignHeadCoachSuccess) {
      NotificationManager.success(
        this.props.studentApp.alignHeadCoachSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.studentApp.error = "";
    this.props.studentApp.alignHeadCoachSuccess = "";
  }

  resetform() {
    this.setState({
      head_coach: "",
      reason_of_change: "",
    });
  }
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  onSubmit = () => {
    const newItem = {
      case_id: this.props.StudentCaseId,
      head_coach: this.state.head_coach.user_id,
      reason_of_change: this.state.reason_of_change,
      user_id: this.state.user_id,
      logged_in_user: loggedInUser.getProfile().user.user_id
    };
    // console.log(newItem);
    this.props.alignHeadCoach(newItem, this.props);
  };
  render() {
    const { head_coach, reason_of_change } = this.state;
    const { modalOpen, toggleModal, HeadCoach } = this.props;
    const { headCoachesList } = this.props.studentApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          {HeadCoach ?
            "Update HeadCoach" :
            "Align HeadCoach "
          }

        </ModalHeader>
        <ModalBody className="row">
          <Colxx sm={12} md={6}>
            <Select
              components={{
                Input: CustomSelectInput
              }}
              className="react-select"
              classNamePrefix="react-select"
              placeholder="Select Head Coach"
              name="head_coach"
              // isMulti="true"
              value={head_coach}
              onChange={this.HeadCoachChange}
              getOptionLabel={option =>
                `${(option.user_lname)?option.user_fname + " " + option.user_lname:option.user_fname}`
              }
              getOptionValue={option => `${option.user_id}`}
              options={headCoachesList}
            />
          </Colxx>
          {HeadCoach && <Colxx sm={12} md={6}>
            <Input
              value={reason_of_change}
              placeholder="Reason of change"
              name="reason_of_change"
              onChange={this.handleChange}
              type="text"
            />
          </Colxx>}
        </ModalBody>
        <ModalFooter>

          {HeadCoach
            ?
            <Button
              disabled={(head_coach === "" || reason_of_change === "")}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onSubmit}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>          </Button> :
            <Button
              disabled={head_coach === ""}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onSubmit}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>          </Button>

          }

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
    alignHeadCoach
  }
)(HeadCoachAlignModal);
