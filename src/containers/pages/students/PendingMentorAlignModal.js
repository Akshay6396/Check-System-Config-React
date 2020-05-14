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
import {
  pendingAlignMentor, getMentors,
} from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";

import { Colxx } from "../../../components/common/CustomBootstrap";

import { connect } from "react-redux";
import { NotificationManager } from "../../../components/common/react-notifications";
class PendingMentorAlignModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMentorModal: false,
      // user_id: this.props.casesApp.studentDetails.user_id,
      mentor: "",
      reason_of_change: "",
      embeddedDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);

    this.MentorChange = this.MentorChange.bind(this);
  }
  MentorChange(event) {
    this.setState({
      mentor: event
    });
  }

  componentDidMount() {
    this.props.getMentors();

  }

  // End Validation
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
    if (this.props.casesApp.pendingAlignMentorSuccess) {
      NotificationManager.success(
        this.props.casesApp.pendingAlignMentorSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.casesApp.error = "";
    this.props.casesApp.pendingAlignMentorSuccess = "";
  }

  resetform() {
    this.setState({
      mentor: "",
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
      case_id: this.props.selectedStudentCase,
      case_school_id: this.props.studentCaseSchoolId,
      mentor: this.state.mentor.user_id,
      user_id: this.props.selectedStudent,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      selectedPageSize: this.props.selectedPageSize,
      currentPage: this.props.currentPage,
      search: this.props.search
    };
    this.props.pendingAlignMentor(newItem, this.props);
  };
  toggleAddMentorModal = () => {
    this.setState({ addMentorModal: !this.state.addMentorModal });
  };
  render() {
    const { mentor, reason_of_change, addMentorModal } = this.state;

    const { modalOpen, toggleModal, statusSchoolMentor } = this.props;
    const { mentorsData } = this.props.casesApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Mentor Alignment</ModalHeader>
        <ModalBody className="row">
          <Colxx sm={12} md={6}>
            <Select
              components={{
                Input: CustomSelectInput
              }}
              className="react-select"
              classNamePrefix="react-select"
              placeholder="Select Mentor"
              name="mentor"
              // isMulti="true"
              value={mentor}
              onChange={this.MentorChange}
              getOptionLabel={option =>
                `${option.user_fname + " " + option.user_lname}`
              }
              getOptionValue={option => `${option.user_id}`}
              options={mentorsData}
            />
          </Colxx>
        </ModalBody>
        <ModalFooter>

          <Button
            disabled={mentor === ""}
            className={`btn-shadow btn-multiple-state ${this.props.casesApp.loading ? "show-spinner" : ""}`}
            color="primary" onClick={this.onSubmit}>
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Submit</span>
          </Button>

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
    getMentors,
    pendingAlignMentor
  }
)(PendingMentorAlignModal);
